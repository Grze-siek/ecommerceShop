import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/home';
import Product from './pages/product';
import Cart from './pages/cart';
import Login from './pages/login';
import Register from './pages/register';
import UserProfile from './pages/userProfile';
import Shipping from './pages/shipping';
import Payment from './pages/payment';
import PlaceOrder from './pages/placeOrder';
import Order from './pages/order';
import UserList from './pages/userList';
import EditUser from './pages/editUser';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/productList';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart/:id?" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />

            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/admin/user/:id/edit" element={<EditUser />} />

            <Route path="/admin/productlist" element={<ProductList />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
