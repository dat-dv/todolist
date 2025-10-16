using Microsoft.AspNetCore.Mvc;
using TodoListApi.Core.DTOs;
using TodoListApi.Features.Task.DTOs;

namespace TodoListApi.Features.Task;

public interface ITaskService
{
    Task<PagedResultDto<TaskResponseDto>> GetTasksAsync(int userId, int page = 1, int pageSize = 10);
    Task<TaskResponseDto> GetTaskByIdAsync(int taskId, int userId);
    Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId);
    Task<TaskResponseDto> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto, int userId);
    Task<IActionResult> DeleteTaskAsync(int taskId, int userId);
}