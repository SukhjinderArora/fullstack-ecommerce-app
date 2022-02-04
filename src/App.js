import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

import useScrollToTop from './hooks/useScrollToTop';

const App = () => {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":categorySlug" element={<Products />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
