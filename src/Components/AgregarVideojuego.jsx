import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgregarVideojuego = ({ user }) => {
  const navigate = useNavigate();

  const [videojuego, setVideojuego] = useState({
    titulo: "",
    descripcion: "",
    reseña: "",
    horasJugadas: 0,
    imagen: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    setVideojuego((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setVideojuego((prev) => ({ ...prev, imagen: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(videojuego).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post("http://localhost:8080/api/videojuegos", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/videojuegos");
    } catch (error) {
      console.error("Error al añadir videojuego:", error.response || error);
      if ([401, 403].includes(error.response?.status)) {
        alert("Tu sesión ha expirado. Inicia sesión de nuevo.");
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
      }
    }
  };

  if (!user) {
    return <p className="text-danger mt-4">Debes iniciar sesión para añadir videojuegos.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Añadir Nuevo Videojuego</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Título</label>
              <input
                type="text"
                name="titulo"
                value={videojuego.titulo}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: Dark Souls"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Imagen (archivo)</label>
              <input
                type="file"
                name="imagen"
                onChange={handleFileChange}
                accept="image/*"
                className="form-control"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                value={videojuego.descripcion}
                onChange={handleChange}
                className="form-control"
                placeholder="Describe brevemente el juego"
                rows={3}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Reseña personal</label>
              <textarea
                name="reseña"
                value={videojuego.reseña}
                onChange={handleChange}
                className="form-control"
                placeholder="Tu opinión personal"
                rows={3}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Horas jugadas</label>
              <input
                type="number"
                name="horasJugadas"
                value={videojuego.horasJugadas}
                onChange={handleChange}
                className="form-control"
                min={0}
              />
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-success w-100">
                Guardar Videojuego
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarVideojuego;