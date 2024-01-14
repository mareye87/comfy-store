import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsList = () => {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-y-8 ">
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const formattedPrice = formatPrice(price);
        return (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-lg hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className=" capitalize font-medium text-lg">{title}</h3>
              <h3 className=" capitalize text-neural-context text-medium">
                {company}
              </h3>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {formattedPrice}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
