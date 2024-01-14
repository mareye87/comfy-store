import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/UserSlice";
import { clearCart } from "../features/cart/CartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
  };

  return (
    <header className=" bg-neutral text-neutral-content ">
      <div className="element-align py-2 flex justify-center gap-4 sm:justify-end text-sm tracking-wider">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello: {user.username}</p>
            <button
              onClick={handleLogout}
              className="btn btn-xs btn-outline btn-primary uppercase"
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover">
              Sign in/Guest
            </Link>
            <Link to="/register" className="link link-hover">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
