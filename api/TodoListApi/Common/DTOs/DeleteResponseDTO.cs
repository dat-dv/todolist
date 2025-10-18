namespace TodoListApi.Common.DTOs;

public class DeleteResponseDto
{
    public string Status { get; set; } = "success";
    public int Id { get; set; }
    public DateTime DeletedAt { get; set; }
}