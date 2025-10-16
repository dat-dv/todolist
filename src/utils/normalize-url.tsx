export const normalizeUrl = (url: string, extendUrl: string) => {
  const normalizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  const urlObject = new URL(normalizedUrl, window.location.origin);
  if (extendUrl.startsWith("?")) {
    const additionalParams = new URLSearchParams(extendUrl);

    additionalParams.forEach((value, key) => {
      urlObject.searchParams.append(key, value);
    });
  } else {
    const normalizedExtendUrl =
      extendUrl.startsWith("/") || extendUrl === ""
        ? extendUrl
        : `/${extendUrl}`;

    urlObject.pathname += normalizedExtendUrl;
  }

  return `${urlObject.pathname}${urlObject.search}`;
};
