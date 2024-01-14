import React from "react";
import { customFetch } from "../utils";
import { useLoaderData } from "react-router-dom";
import {
  PaginationContainer,
  ProductsContainer,
  SearchFilters,
} from "../components";

export const loader = async ({ request }) => {
  //request comes from destructured 'data'

  // you can access search params 1by1 using 'get()' method
  // const params = new URL(request.url).searchParams;
  // const search = params.get("search");
  // console.log(search);

  //or create an object with array of  all params
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch("/products", { params });
  return { products: response.data.data, meta: response.data.meta, params };
};

const Products = () => {
  return (
    <>
      <SearchFilters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
