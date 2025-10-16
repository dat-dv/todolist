using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Features.Task.DTOs;

public class UpdateTaskDto
{
    [StringLength(200, MinimumLength = 1)]
    public string? Title { get; set; }

    public bool? IsCompleted { get; set; }
}