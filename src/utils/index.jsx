//---custom fetch with base url so we can reuse it anywhere in the project when fetching data
import axios from "axios";
const productionUrl = "https://strapi-store-server.onrender.com/api";
export const customFetch = axios.create({
  baseURL: productionUrl,
});

//---converting prices from smallest units (cents) to be displayed as dollars
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));

  return dollarsAmount;
};

//function that generates array of specific number of objects( option with number)
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
