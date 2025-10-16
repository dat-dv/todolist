import { getAccessToken } from "./local-storage";

export const checkShouldFetch = (): boolean => {
  return !!getAccessToken();
};
