

export default function FormartPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}
