import {  BrowserRouter as Router,  Routes, Route, Navigate,} from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import SingIn from "./pages/SingIn";
import Account from "./pages/Account";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/authContext";
import OrderList from "./components/account/order/OrderList";
import AddressList from "./components/account/address/AddressList";
import OrderHistory from "./components/account/order/OrderHistory";
import { useAuth } from "./context/authContext";
import OrderAddress from "./components/account/order/OrderAddress";
import { OrderProvider } from "./context/orderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummery from "./pages/OrderSummery";
import OrderPlaced from "./components/account/order/OrderPlaced";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop/:shopId" element={<ShopPage />} />
                <Route path="/signin" element={<SingIn />} />
                <Route path="/cart/*" element={<CartPage />}>
                  <Route path="address"
                    element={
                      <ProtectedRoute>
                        <OrderAddress />
                      </ProtectedRoute>
                    }/>
                </Route>
                <Route path="/account/*"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>}>
                  <Route path="orders" element={<OrderList />} />
                  <Route path="address" element={<AddressList />} />
                  <Route index element={<Navigate to="orders" replace />} />
                </Route>
                <Route path="/order/:orderId"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }/>
                <Route path="/cart/order-summary"
                  element={
                    <ProtectedRoute>
                      <OrderSummery />
                    </ProtectedRoute>
                  }/>
                  <Route path="/cart/order-placed" element={<ProtectedRoute>
                    <OrderPlaced /> 
                  </ProtectedRoute>} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme="dark"
              />
            </Layout>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
