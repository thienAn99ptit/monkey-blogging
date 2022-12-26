import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <Banner></Banner>
      <div>{children}</div>
    </div>
  );
}

export default DefaultLayout;
