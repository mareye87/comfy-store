import { Form, Link, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/UserSlice";
import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

//to be able to use 'loginUser()' we access the store. we can't use 'useDispatch' hook
// directly in this function
//to access the store we need to pass it in the 'loginAction' in the App/router
//and to avoid it from invoking instantly we need to pass a function in a function here
//actions/loader must return something !
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      // store.dispatch(loginUser(response.data));
      toast.success("Logged in successfully");
      //in loaders/action use 'redirect' instead of 'navigate'
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    const guestUser = { identifier: "test@test.com", password: "secret" };
    try {
      const response = await customFetch.post("/auth/local", guestUser);
      dispatch(loginUser(response.data));
      toast.success("Logged in as Guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest User login error. Please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold ">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block capitalize"
          onClick={loginAsGuestUser}
        >
          quest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
