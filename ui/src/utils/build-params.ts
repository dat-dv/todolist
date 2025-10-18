export const buildParams = ({
  url,
  queryParams = {},
}: {
  url?: string | null;
  queryParams?: Record<string, unknown>;
}) => {
  if (!url) return null;
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const fullUrl = url ? `${url}${queryString ? "?" + queryString : ""}` : null;

  return fullUrl;
};
