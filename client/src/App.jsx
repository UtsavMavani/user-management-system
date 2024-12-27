import "./App.css";
import React, { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loader from "./components/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import { getGlobalItem } from "./utils/utils";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const MainLayout = lazy(() => import("./pages/MainLayout"));
const Users = lazy(() => import("./pages/Users"));

const App = () => {
  const token = getGlobalItem("token");

  const RoleBasedRoute = ({ allowedRoles, element }) => {
    const user = getGlobalItem("user");
    return allowedRoles.includes(user?.role) ? (
      element
    ) : (
      <Navigate to="/dashboard" />
    );
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />

            {/* Protected Routes with Common Layout */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/users"
                  element={
                    <RoleBasedRoute
                      allowedRoles={["admin", "subadmin"]}
                      element={<Users />}
                    />
                  }
                />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
