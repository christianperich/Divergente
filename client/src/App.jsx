import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import PatientInfo from "./pages/PatientInfo";
import Admin from "./pages/Admin";
import Evaluaciones from "./pages/Evaluaciones";
import NuevoUsuario from "./pages/NuevoUsuario";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-info/:id"
            element={
              <ProtectedRoute>
                <PatientInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evaluaciones"
            element={
              <ProtectedRoute>
                <Evaluaciones />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuevo-usuario"
            element={
              <ProtectedRoute>
                <NuevoUsuario />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
