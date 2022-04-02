import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import EtsyNavbar from "./components/EtsyNavbar";
import ProfilePage from "./pages/ProfilePage";
import CreateShopPage from "./pages/CreateShopPage";
import ShopPage from "./pages/ShopPage";
import MyPurchasesPage from "./pages/MyPurchasesPage";
import LoginModal from "./components/LoginModal";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { currencychange } from "./actions/currencyAction";

function App() {
  const currencyupdate = (e) => {
    console.log(e);
    dispatch(currencychange(e));
  };
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <EtsyNavbar />
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/createshop" element={<CreateShopPage />} />
              <Route path="/shop/:shopname" element={<ShopPage />} />
              <Route path="/search/:name" element={<SearchPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/myorders" element={<MyPurchasesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
