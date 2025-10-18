export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

export const PAGINATION_SIZE_OPTIONS = [
  PAGINATION.DEFAULT_PAGE_SIZE,
  20,
  30,
  PAGINATION.MAX_PAGE_SIZE,
].map((size) => ({
  label: String(size),
  value: size,
}));
