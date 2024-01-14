import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import Toggle from "./Toggle";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/UserSlice";

const Navbar = () => {
  //-------------------------------------------------------------------------
  // this is being moved to userSlice
  // const themes = {
  //   acid: "acid",
  //   synthwave: "synthwave",
  // };
  // const getThemeFromLocalStorage = () => {
  //   return localStorage.getItem("theme") || themes.acid;
  // };
  // const [theme, setTheme] = useState(getThemeFromLocalStorage());

  // const handleTheme = () => {
  //   const { acid, synthwave } = themes;
  //   setTheme(theme === acid ? synthwave : acid);
  // };

  // useEffect(() => {
  //   /document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);
  //----------------------------------------------------------------------------

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.userState.theme);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  //access data from store/cartState
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="bg-base-200">
      <div className="navbar element-align">
        {/* ---LEFT SIDE--- */}
        <div className="navbar-start">
          {/* LOGO */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>
          {/* DROPDOWN MENU */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        {/* ---CENTER--- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        {/* ---RIGHT SIDE--- */}
        <div className="navbar-end">
          {/* THEME ICON */}
          <Toggle handleTheme={handleTheme} theme={theme} />
          {/* CART LINK */}
          <NavLink
            to="/cart"
            className="btn btn-ghost btn-circle btn-medium ml-4"
          >
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-small badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
