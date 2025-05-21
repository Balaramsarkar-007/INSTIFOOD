import React from "react";
import DashboardPage from "./pages/DashboardPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Orders from "./pages/Orders";
import SettingPage from "./pages/SettingPage";
import MenuPage from "./pages/MenuPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider, useAuth } from "./contextApi/authContext";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedLayout = ({ children }) => {
  const { owner, loading } = useAuth();
  console.log(owner);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (!owner) {
      return <Navigate to="/signin" replace />;
  }
  // return <Layout>{children}</Layout> ;
  return children;
};


function App() {
  const { loading, owner } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col my-[10%] items-center space-y-4">
      <SparklesIcon className="w-20 h-20 text-yellow-500 animate-spin" />
      <p className="text-2xl font-semibold text-gray-700">Loading...</p>
    </div>);
  }
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signin" element=
            {!owner ? <SignInPage /> : <Navigate to="/" replace />} />
          <Route path="/*"
            element={
              <ProtectedLayout>
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/settings" element={<SettingPage />} />
                </Routes>
              </ProtectedLayout>
            }
          />
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
    </Router>
  );
}

export default App;
