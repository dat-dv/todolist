using System.ComponentModel.DataAnnotations;
using TaskModel = TodoListApi.Core.Models.Task;

namespace TodoListApi.Core.Models;

public class User : BaseEntity
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    // Navigation property
    public ICollection<TaskModel> Tasks { get; set; } = new List<TaskModel>();
}