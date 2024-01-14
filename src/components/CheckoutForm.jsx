import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/CartSlice";
import { toast } from "react-toastify";

//this action will go to Checkout page
export const action =
  (store) =>
  async ({ request }) => {
    //to create order we need: name and address from inputs, all data from user and some data from the cart

    //grab values from inputs
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    //grab data from user(we will need user token for authorization)
    const user = store.getState().userState.user;

    //grab few values from cart
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    //now create abject that will be sent to create order
    // properties must match properties from server docs
    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    //now setup the request
    // 'data' param matches server param
    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //when order has been sent we can clear the cart
      store.dispatch(clearCart());
      //notify user and redirect to order
      toast.success("Order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMsg);
      //if authorisation code is invalid (401) (came back to app after long time)
      // or the token is missing (403)
      // we want to redirect them to login again
      if (error.response.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
