export const formatPrice = (value: number) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
