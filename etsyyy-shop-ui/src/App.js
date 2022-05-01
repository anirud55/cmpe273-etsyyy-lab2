import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './App.css';
import NavBarLayout from './components/EtsyNavbar';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/ProfilePage';
import NameYourShop from './pages/NameYourShop';
import Shop from './pages/Shop';
import setAuthToken from './Utilities/setAuthToken';
import MyShops from './pages/ShopPage';
import Dashboard from './pages/Homepage';
import ItemOverview from './pages/ItemOverview';
import Cart from './pages/CartPage';
import PrivateRoute from './components/PrivateRoute';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import MyOrders from './pages/MyPurchasesPage';

if (localStorage.userdetails) {
  setAuthToken(localStorage.userdetails)
}

function App() {
  return (
    <Fragment>

      <Card style={{ margin: 0, padding: 0 }}>
        <Card.Body style={{ margin: 0, padding: 0, marginBottom: 10, height: "100%" }}>
          <ToastContainer position='top-center' />
          <Router>
            <NavBarLayout />
            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/products" element={<ProductList />} />

              <Route path="/products/:search" element={<ProductList />} />

              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="/profile" element={<UserProfile />} />
              </Route>

              <Route path="/profile/edit" element={<PrivateRoute />}>
                <Route path="/profile/edit" element={<EditProfile />} />
              </Route>

              <Route path="/shop" element={<PrivateRoute />}>
                <Route path="/shop" element={<NameYourShop />} />
              </Route>

              <Route path="/shop/:name/home" element={<PrivateRoute />}>
                <Route path="/shop/:name/home" element={<Shop />} />
              </Route>

              <Route path="/shop/myShops" element={<PrivateRoute />}>
                <Route path="/shop/myShops" element={<MyShops />} />
              </Route>

              <Route path="/myOrders" element={<PrivateRoute />}>
                <Route path="/myOrders" element={<MyOrders />} />
              </Route>

              <Route path="/item/:id/overview" element={<PrivateRoute />}>
                <Route path="/item/:id/overview" element={<ItemOverview />} />
              </Route>

              <Route path="/cart" element={<PrivateRoute />}>
                <Route path="/cart" element={<Cart />} />
              </Route>

            </Routes>
          </Router>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#1a125c", color: 'white' }}>
          <Footer />
        </Card.Footer>
        <footer style={{ textAlign: 'center', padding: 3, position: "fixed", left: 0, bottom: 0, width: "100%" }}>

        </footer>
      </Card>

    </Fragment>
  );
}

export default App;
