using Microsoft.AspNetCore.Mvc;
using TodoListApi.Features.Task.DTOs;

namespace TodoListApi.Features.Task;

public interface ITaskService
{
    Task<IEnumerable<TaskResponseDto>> GetTasksAsync(int userId, bool? completed = null);
    Task<TaskResponseDto> GetTaskByIdAsync(int taskId, int userId);
    Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId);
    Task<TaskResponseDto> UpdateTaskAsync(int taskId, UpdateTaskDto updateTaskDto, int userId);
    Task<IActionResult> DeleteTaskAsync(int taskId, int userId);
}