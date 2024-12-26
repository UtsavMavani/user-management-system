import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import MainLayout from "./pages/MainLayout";
import Users from "./pages/Users";
import { getGlobalItem } from "./utils/utils";

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
      </Router>
    </>
  );
};

export default App;
