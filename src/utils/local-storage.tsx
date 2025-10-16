export const STORAGE_ACCESS_TOKEN_KEY = "jwt_access_token";
export const STORAGE_REMEMBER_ME_KEY = "jwt_remember_me";
export const STORAGE_REFRESH_TOKEN_KEY = "jwt_refresh_token";

export const getAccessToken = () =>
  localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY);
export const getRefreshToken = () =>
  localStorage.getItem(STORAGE_REFRESH_TOKEN_KEY);
export const removeAccessToken = () =>
  localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
export const removeRefreshToken = () =>
  localStorage.removeItem(STORAGE_REFRESH_TOKEN_KEY);

export function jwtDecode(token: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(decodedPayload);
  } catch (error) {
    throw error;
  }
}

export async function setSession(accessToken?: string) {
  if (accessToken) {
    localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, accessToken as string);
    const decodedToken = jwtDecode(accessToken as string);
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decodedToken?.exp < currentTime;
    if (isExpired) {
      window.location.href = "/";
    }
  } else {
    removeSession();
    window.location.href = "/";
  }
}

export async function removeSession() {
  localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(STORAGE_REFRESH_TOKEN_KEY);
}
