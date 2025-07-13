import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import backgroundImage from "./img/games.jpg";
import AgregarVideojuego from "./Components/AgregarVideojuego";
import VideojuegoList from "./Components/VideojuegosList";
import Home from "./Components/Home";
import UsuariosAdmin from "./Components/UsuariosAdmin";
import GuessBossGame from "./Components/GuessBossGame";

const App = () => {
  const [user, setUser] = useState(null);
  const [refreshUserTrigger, setRefreshUserTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user-info", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, [refreshUserTrigger]);

  useEffect(() => {
    setIsAdmin(user?.roles?.includes("ROLE_ADMIN") || false);
  }, [user]);

  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:8080/logout";
      setRefreshUserTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-4 rounded shadow">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header user={user} onLogout={handleLogout} isAdmin={isAdmin} />

      <main className="flex-grow-1 d-flex justify-content-center">
        <div
          className="container rounded p-4 my-4 shadow"
          style={{
            maxWidth: "960px",
            backgroundColor: "rgba(220, 230, 245, 0.9)",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guess-boss" element={<GuessBossGame />} />
            <Route path="/agregar-videojuego" element={<AgregarVideojuego user={user} />} />
            <Route path="/videojuegos" element={<VideojuegoList user={user} />} />
            <Route path="/admin" element={<UsuariosAdmin />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;