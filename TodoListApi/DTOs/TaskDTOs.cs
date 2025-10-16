using System.ComponentModel.DataAnnotations;

namespace TodoListApi.DTOs;

public class CreateTaskDto
{
    [Required]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be 1-200 characters")]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
    public string? Description { get; set; }
}

public class UpdateTaskDto
{
    [StringLength(200, MinimumLength = 1)]
    public string? Title { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    public bool? IsCompleted { get; set; }
}

public class TaskResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}