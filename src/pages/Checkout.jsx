import { toast } from "react-toastify";
import { CartTotals, CheckoutForm, SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

//  like with loginUser
//  we want to setup loader as a function that returns function
//  pass 'store' to App/checkout loader in router
//  that gives us access to 'store' from this loader
export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);

  if (cartTotal === 0) {
    return <SectionTitle text={"Your cart is empty"} />;
  }

  return (
    <>
      <SectionTitle text={"Place Your order"} />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
