import { useLoaderData, Link } from "react-router-dom";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/CartSlice";

export const loader = async ({ params }) => {
  const response = await customFetch(`products/${params.id}`);

  return { product: response.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, price, title, description, colors, company } =
    product.attributes;
  const formattedPrice = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [productAmount, setProductAmount] = useState(1);

  // parse e to number!
  const handleAmount = (e) => {
    setProductAmount(parseInt(e.target.value));
  };

  const dispatch = useDispatch();

  const cartProduct = {
    //create unique id so same products wit different colors are treated as separate products
    // this is just for front end so user can see them separately
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    productAmount,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      {/* BREADCRUMBS */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        ></img>
        {/* info */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-context font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formattedPrice}</p>
          <p className="mt-6 leading-8">{description}</p>
        </div>
        {/* COLORS */}
        <div className="mt-6">
          <h4 className="text-md font-medium tracking-wider capitalize">
            Colors
          </h4>
          <div className="mt-2">
            {colors.map((color) => {
              return (
                <button
                  key={color}
                  type="button"
                  className={`badge h-6 w-6 mr-2 ${
                    color === productColor && "border-2 border-secondary"
                  } `}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setProductColor(color);
                  }}
                ></button>
              );
            })}
          </div>
        </div>
        {/* AMOUNT */}
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="amount">
            <h4 className="text-md font-medium tracking-wider capitalize">
              amount
            </h4>
          </label>
          <select
            id="amount"
            value={productAmount}
            onChange={handleAmount}
            className="select select-secondary select-bordered select-md"
          >
            {generateAmountOptions(20)}
          </select>
        </div>
        {/* CART BUTTON */}
        <div className="mt-10">
          <button className="btn btn-secondary btn-md " onClick={addToCart}>
            Add to bag
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
