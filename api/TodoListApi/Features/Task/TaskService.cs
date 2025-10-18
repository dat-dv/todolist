using Microsoft.EntityFrameworkCore;
using TodoListApi.Common.DTOs;
using TodoListApi.Core.Data;
using TodoListApi.Features.Task.DTOs;
using TaskModel = TodoListApi.Core.Models.Task;
using TodoListApi.Common.Enums;

namespace TodoListApi.Features.Task;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(
        int userId,
        int page = 1,
        int pageSize = 10,
        bool? isCompleted = null,
        string? search = null,
        SortOrder? sortOrder = SortOrder.OldestFirst)
    {
        var query = _context.Tasks
            .Where(t => t.UserId == userId && t.DeletedAt == null);

        if (isCompleted.HasValue)
        {
            query = query.Where(t => t.IsCompleted == isCompleted.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(t => t.Title.Contains(search));
        }

        // Sort by CreatedAt
        query = sortOrder switch
        {
            SortOrder.OldestFirst => query.OrderBy(t => t.CreatedAt),
            _ => query.OrderByDescending(t => t.CreatedAt) // NewestFirst (default)
        };

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                CompletedAt = t.CompletedAt,
            })
            .ToListAsync();

        return new PagedResultDto<TaskResponseDto>
        {
            Value = items,
            Count = totalCount,
            Page = page,
            PageSize = pageSize,
        };
    }

    public async Task<TaskResponseDto> GetTaskByIdAsync(int taskId, int userId)
    {
        var task = await _context.Tasks
            .Where(t => t.Id == taskId && t.UserId == userId && t.DeletedAt == null)
            .Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                CompletedAt = t.CompletedAt
            })
            .FirstOrDefaultAsync();

        if (task == null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        return task;
    }

    public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId)
    {
        var task = new TaskModel
        {
            Title = createTaskDto.Title,
            UserId = userId,
            IsCompleted = false
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            CompletedAt = task.CompletedAt
        };
    }

    public async Task<TaskResponseDto> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto, int userId)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

        if (task == null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        task.Title = updateTaskDto.Title ?? task.Title;
        task.IsCompleted = updateTaskDto.IsCompleted ?? task.IsCompleted;
        if (updateTaskDto.IsCompleted != null)
        {
            task.CompletedAt = updateTaskDto.IsCompleted.Value ? DateTime.UtcNow : null;
        }

        await _context.SaveChangesAsync();

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            CompletedAt = task.CompletedAt
        };
    }

    public async Task<DeleteResponseDto> DeleteTaskAsync(int taskId, int userId)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId && t.DeletedAt == null);

        if (task == null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        task.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return new DeleteResponseDto
        {
            Id = task.Id,
            DeletedAt = task.DeletedAt.Value
        };
    }
}