export const getProductData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response;
};
