import React from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { OrdersList, PaginationManyPages, SectionTitle } from "../components";

export const loader =
  (store) =>
  async ({ request }) => {
    // get info about the user from state
    const user = store.getState().userState.user;
    // restrict access and redirect if not logged in
    if (!user) {
      toast.warn("You must be logged in to view orders");
      redirect("/login");
    }
    //grab all params from request (for pagination)
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    //now send the request
    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMsg);
      if (error.response.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const Orders = () => {
  const { orders, meta } = useLoaderData();
  if (orders.length < 1)
    return <SectionTitle text="You don't have any orders" />;

  return (
    <>
      <SectionTitle text="Your orders" />
      <OrdersList />
      <PaginationManyPages />
    </>
  );
};

export default Orders;
