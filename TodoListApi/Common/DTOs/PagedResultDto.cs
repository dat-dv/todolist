namespace TodoListApi.Common.DTOs;

public class PagedResultDto<T>
{
    public IEnumerable<T> Value { get; set; } = new List<T>();
    public int Count { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling(Count / (double)PageSize);
    public bool HasPreviousPage => Page > 1;
    public bool HasNextPage => Page < TotalPages;
}
