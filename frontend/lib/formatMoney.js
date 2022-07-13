export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  };

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
}
