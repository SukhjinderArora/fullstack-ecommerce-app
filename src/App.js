import { useEffect, Suspense, lazy } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useMatch,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './components/Layout';
import Spinner from './components/shared/SpinnerRect';

import useScrollToTop from './hooks/useScrollToTop';

import { verifyToken } from './store/authSlice';
import { getCart } from './store/cartSlice';

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Products = lazy(() => import('./pages/Products'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Cart = lazy(() => import('./pages/Cart'));
const Address = lazy(() => import('./pages/Address'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Payment = lazy(() => import('./pages/Payment'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));

const App = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { isAuthenticated, expiresAt } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(verifyToken()).unwrap();
        if (response) {
          dispatch(getCart());
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    let verifyTokenTimer;
    if (isAuthenticated) {
      verifyTokenTimer = setTimeout(() => {
        dispatch(verifyToken());
      }, new Date(expiresAt).getTime() - Date.now() - 10 * 1000);
    }
    return () => {
      if (isAuthenticated && verifyTokenTimer) {
        clearTimeout(verifyTokenTimer);
      }
    };
  }, [isAuthenticated, expiresAt, dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route
            path="checkout/cart"
            element={
              <RequireAuth redirectTo="/login">
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="checkout/address"
            element={
              <RequireAuth redirectTo="/login">
                <Address />
              </RequireAuth>
            }
          />
          <Route
            path="checkout/payment"
            element={
              <RequireAuth redirectTo="/login">
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="checkout/payment-success"
            element={
              <RequireAuth redirectTo="/login">
                <PaymentSuccess />
              </RequireAuth>
            }
          />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":categorySlug" element={<Products />} />
          </Route>
          <Route
            path="register"
            element={
              <RedirectIfLoggedIn redirectTo="/">
                <Register />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="login"
            element={
              <RedirectIfLoggedIn redirectTo="/">
                <Login />
              </RedirectIfLoggedIn>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const RequireAuth = ({ children, redirectTo }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

const RedirectIfLoggedIn = ({ children, redirectTo }) => {
  const { isAuthenticated, verifyingToken } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (verifyingToken) return <Spinner />;
  return isAuthenticated ? (
    <Navigate
      to={
        location.state?.from?.pathname
          ? location.state.from.pathname
          : redirectTo
      }
    />
  ) : (
    children
  );
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

RedirectIfLoggedIn.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default App;
