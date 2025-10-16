namespace TodoListApi.Common.Helpers;

public static class PagingHelper
{
    public static (string? NextLink, string? PrevLink) GetPagingLinks(
        int page,
        int totalPages,
        int pageSize,
        string baseUrl)
    {
        string? nextLink = page < totalPages
            ? $"{baseUrl}{(baseUrl.Contains('?') ? "&" : "?")}page={page + 1}&pageSize={pageSize}"
            : null;

        string? prevLink = page > 1
            ? $"{baseUrl}{(baseUrl.Contains('?') ? "&" : "?")}page={page - 1}&pageSize={pageSize}"
            : null;

        return (nextLink, prevLink);
    }
}