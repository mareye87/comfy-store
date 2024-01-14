import { Hero, FeaturedProducts } from "../components";

import { customFetch } from "../utils";

const url = "products/?featured=true";

export const loader = async () => {
  //custom fetch has a base url saved so we only have to provide fetch query
  const response = await customFetch(url);
  const products = response.data.data;

  //we can access this in any landing component by 'useLoaderData()'
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
