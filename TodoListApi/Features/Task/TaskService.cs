using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListApi.Core.Data;
using TodoListApi.Core.Models;
using TodoListApi.Features.Task;
using TodoListApi.Features.Task.DTOs;

namespace TodoListApi.Features.Task;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskResponseDto>> GetTasksAsync(int userId, bool? completed = null)
    {
        var query = _context.Tasks.Where(t => t.UserId == userId);

        if (completed.HasValue)
        {
            query = query.Where(t => t.IsCompleted == completed.Value);
        }

        return await query
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                CompletedAt = t.CompletedAt
            })
            .ToListAsync();
    }

    public async Task<TaskResponseDto> GetTaskByIdAsync(int taskId, int userId)
    {
        var task = await _context.Tasks
            .Where(t => t.Id == taskId && t.UserId == userId)
            .Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
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
        var task = new TaskItem
        {
            Title = createTaskDto.Title,
            Description = createTaskDto.Description,
            UserId = userId,
            IsCompleted = false
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
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
        task.Description = updateTaskDto.Description;

        await _context.SaveChangesAsync();

        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            CompletedAt = task.CompletedAt
        };
    }

    public async Task<IActionResult> DeleteTaskAsync(int taskId, int userId)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);

        if (task == null)
        {
            return new NotFoundObjectResult("Task not found");
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return new OkResult();
    }

    Task<IActionResult> ITaskService.DeleteTaskAsync(int taskId, int userId)
    {
        throw new NotImplementedException();
    }
}