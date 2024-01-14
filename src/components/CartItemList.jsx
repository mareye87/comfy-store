import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemList = () => {
  const { cartItems } = useSelector((state) => state.cartState);

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} {...item} />;
      })}
    </>
  );
};

export default CartItemList;
