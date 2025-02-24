
export const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const calculateCityPrice = (basePrice: number, volatility: number, priceMultiplier: number) => {
  const randomFactor = 1 + (Math.random() - 0.5) * 2 * volatility;
  return Math.round(basePrice * priceMultiplier * randomFactor);
};
