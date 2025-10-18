using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Features.Task.DTOs;

public class CreateTaskDto
{
    [Required]
    [StringLength(255, MinimumLength = 1, ErrorMessage = "Title must be 1-255 characters")]
    public string Title { get; set; } = string.Empty;
}
