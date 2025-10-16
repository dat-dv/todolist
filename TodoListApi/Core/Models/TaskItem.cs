using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoListApi.Core.Models
{
    public class Task : BaseEntity
    {
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        public DateTime? CompletedAt { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }
    }
}