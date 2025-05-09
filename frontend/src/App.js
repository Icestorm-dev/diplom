import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Residents from "./pages/Residents";
import Rooms from "./pages/Rooms";
import Passports from "./pages/Passports";
import Addresses from "./pages/Addresses";
import Parents from "./pages/Parents";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Обернём защищённые страницы в layout с Header */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PageWithHeader>
                <HomePage />
              </PageWithHeader>
            </PrivateRoute>
          }
        />
        <Route
          path="/residents"
          element={
            <PrivateRoute>
              <PageWithHeader>
                <Residents />
              </PageWithHeader>
            </PrivateRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <PrivateRoute>
              <PageWithHeader>
                <Rooms />
              </PageWithHeader>
            </PrivateRoute>
          }
        />
        <Route
          path="/passports"
          element={
            <PrivateRoute>
              <PageWithHeader>
                <Passports />
              </PageWithHeader>
            </PrivateRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <PrivateRoute>
              <PageWithHeader>
                <Addresses />
              </PageWithHeader>
            </PrivateRoute>
          }
        />
        <Route
          path="/parents"
          element={
            <PrivateRoute>
              <PageWithHeader>
                <Parents />
              </PageWithHeader>
            </PrivateRoute>
          }
        />
        {/* Любой другой путь → редирект */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

// Обёртка с Header
function PageWithHeader({ children }) {
  return (
    <>
      <Header />
      <div className="container mt-4">{children}</div>
    </>
  );
}
