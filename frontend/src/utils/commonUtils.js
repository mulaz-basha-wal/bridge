export const numberFormatter = (number, isCurrency, isGrouping = false) => {
  let options = !isCurrency ? {} : { style: "currency", currency: "USD" };
  options.maximumFractionDigits = 8;
  options.useGrouping = isGrouping;
  const formatter = Intl.NumberFormat("en-US", options);
  return formatter.format(number);
};
