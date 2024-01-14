import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const SearchFilters = () => {
  // get meta and params returned form loader/Products
  const { meta, params } = useLoaderData();
  const { categories, companies } = meta;

  // use params to set the as the default values of inputs
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center ">
      {/* SEARCH */}
      <FormInput
        type={"search"}
        label={"search product"}
        name={"search"}
        size={"input-sm"}
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label={"select category"}
        name={"category"}
        list={categories}
        size={"select-sm"}
        defaultValue={category}
      />
      {/* COMPANIES */}
      <FormSelect
        label={"select company"}
        name={"company"}
        list={companies}
        size={"select-sm"}
        defaultValue={company}
      />
      {/* ORDER */}
      <FormSelect
        label={"sort by"}
        name={"order"}
        list={["a-z", "z-a", "high", "low"]}
        size={"select-sm"}
        defaultValue={order}
      />
      {/* PRICE RANGE */}
      <FormRange
        label="Price range"
        name="price"
        size="range-sm"
        price={price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm ">
        reset
      </Link>
    </Form>
  );
};

export default SearchFilters;
