export default function CurrencySplitter(v) {
  return isNaN(v) ? v : parseInt(v || 0).toLocaleString();
}
