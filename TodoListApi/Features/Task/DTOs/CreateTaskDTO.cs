using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Features.Task.DTOs;

public class CreateTaskDto
{
    [Required]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be 1-200 characters")]
    public string Title { get; set; } = string.Empty;
}
