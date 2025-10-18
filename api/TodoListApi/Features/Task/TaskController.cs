using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoListApi.Common.DTOs;
using TodoListApi.Features.Task.DTOs;
using TodoListApi.Common.Binders;

namespace TodoListApi.Features.Task;

[Authorize]
[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst("UserId")?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            throw new UnauthorizedAccessException("Invalid user token");
        }
        return userId;
    }

    [HttpGet]
    public async Task<ActionResult<TaskResponseDto>> GetTasks(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery][ModelBinder(BinderType = typeof(NullableBoolModelBinder))] bool? isCompleted = null)
    {
        var userId = GetUserId();
        var result = await _taskService.GetTasksAsync(userId, page, pageSize, isCompleted);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int id)
    {
        var userId = GetUserId();
        var task = await _taskService.GetTaskByIdAsync(id, userId);
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> CreateTask([FromBody] CreateTaskDto createTaskDto)
    {
        var userId = GetUserId();
        var task = await _taskService.CreateTaskAsync(createTaskDto, userId);
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskResponseDto>> UpdateTask(int id, [FromBody] UpdateTaskDto updateTaskDto)
    {
        var userId = GetUserId();
        var task = await _taskService.UpdateTaskAsync(id, updateTaskDto, userId);
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<DeleteResponseDto>> DeleteTodoItem(int id)
    {
        var userId = GetUserId();
        var result = await _taskService.DeleteTaskAsync(id, userId);
        return Ok(result);
    }
}