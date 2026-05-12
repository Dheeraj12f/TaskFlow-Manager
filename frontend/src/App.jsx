import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/" />;
}

export default function App() {

  return (

    <BrowserRouter>

     <Routes>

  <Route
    path="/"
    element={<Login />}
  />

  <Route
    path="/signup"
    element={<Signup />}
  />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

</Routes>

    </BrowserRouter>
  );
}