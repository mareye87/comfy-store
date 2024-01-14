import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useState } from "react";

const ProductsContainer = () => {
  const { meta } = useLoaderData();

  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `p-1 btn btn-circle  btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    } `;
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5 ">
        <h4 className="font-medium text-md">
          {totalProducts}
          {totalProducts < 2 ? " product" : " products"}{" "}
        </h4>
        <div className="flex gap-x-2">
          <button type="button">
            <BsFillGridFill
              onClick={() => {
                setLayout("grid");
              }}
              className={setActiveStyles("grid")}
            />
          </button>
          <button type="button">
            <BsList
              onClick={() => {
                setLayout("list");
              }}
              className={setActiveStyles("list")}
            />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h4 className="text-2xl mt-16">
            Sorry, no products matching your search
          </h4>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
