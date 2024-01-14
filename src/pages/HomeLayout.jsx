import { Outlet, useNavigation } from "react-router-dom";
import { GlobalLoading, Header, Navbar } from "../components";

const HomeLayout = () => {
  const isLoading = useNavigation().state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <section className="element-align py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
