using TodoListApi.Common.DTOs;
using TodoListApi.Features.Task.DTOs;
using TodoListApi.Common.Enums;

namespace TodoListApi.Features.Task;

public interface ITaskService
{
    Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(
        int userId,
        int page = 1,
        int pageSize = 10,
        bool? isCompleted = null,
        string? search = null,
        SortOrder? sortOrder = SortOrder.OldestFirst);
    Task<TaskResponseDto> GetTaskByIdAsync(int taskId, int userId);
    Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId);
    Task<TaskResponseDto> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto, int userId);
    Task<DeleteResponseDto> DeleteTaskAsync(int taskId, int userId);
}