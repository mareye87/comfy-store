import { useSelector } from "react-redux";
import { CartTotals, CartItemList, SectionTitle } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  //temp user
  const user = useSelector((state) => state.userState.user);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0 || numItemsInCart === null) {
    return <SectionTitle text={"Your cart is empty"} />;
  }

  return (
    <>
      <SectionTitle text={"Shopping Cart"} />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* CART ITEMS */}
        <div className="lg:col-span-8">
          <CartItemList />
        </div>
        {/* CART TOTALS */}
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
