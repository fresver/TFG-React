import React, { useEffect, useState } from "react";
import axios from "axios";

const VideojuegoList = ({ user }) => {
  const [videojuegos, setVideojuegos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) fetchVideojuegos();
  }, [user]);

  const fetchVideojuegos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/videojuegos", {
        withCredentials: true,
      });
      setVideojuegos(response.data);
    } catch (error) {
      console.error("Error al obtener los videojuegos:", error);
    }
  };

  const eliminarVideojuego = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/videojuegos/${id}`, {
        withCredentials: true,
      });
      fetchVideojuegos();
    } catch (error) {
      console.error("Error al eliminar videojuego:", error);
    }
  };

  const guardarCambios = async (id) => {
    try {
      const juegoOriginal = videojuegos.find(j => j.id === id);

      const data = new FormData();
      data.append("titulo", formData.titulo ?? juegoOriginal.titulo);
      data.append("descripcion", formData.descripcion ?? juegoOriginal.descripcion);
      data.append("reseña", formData.reseña ?? juegoOriginal.reseña);
      data.append("horasJugadas", formData.horasJugadas ?? juegoOriginal.horasJugadas);
      if (formData.imagen) {
        data.append("imagen", formData.imagen);
      }

      await axios.put(`http://localhost:8080/api/videojuegos/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditando(null);
      fetchVideojuegos();
    } catch (error) {
      console.error("Error al actualizar videojuego:", error);
    }
  };


  const manejarCambio = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  if (!user) return <div className="text-danger mt-4">Debes iniciar sesión para ver tu biblioteca.</div>;
  if (videojuegos.length === 0) return <div className="text-center mt-5">No tienes videojuegos añadidos todavía.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🎮 Mi Biblioteca de Videojuegos</h2>
      <div className="row g-4">
        {videojuegos.map((juego) => (
          <div key={juego.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              {editando === juego.id ? (
                <div className="card-body">
                  <label className="form-label">Título</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="titulo"
                    defaultValue={juego.titulo}
                    onChange={manejarCambio}
                  />
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control mb-2"
                    name="descripcion"
                    defaultValue={juego.descripcion}
                    onChange={manejarCambio}
                  />
                  <label className="form-label">Reseña</label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="reseña"
                    defaultValue={juego.reseña}
                    onChange={manejarCambio}
                  />
                  <label className="form-label">Horas jugadas</label>
                  <input
                    className="form-control mb-2"
                    type="number"
                    name="horasJugadas"
                    defaultValue={juego.horasJugadas}
                    onChange={manejarCambio}
                  />
                  <label className="form-label">Nueva imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="imagen"
                    className="form-control mb-3"
                    onChange={manejarCambio}
                  />
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success btn-sm" onClick={() => guardarCambios(juego.id)}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={`http://localhost:8080/api/videojuegos/${juego.id}/imagen`}
                    alt={juego.titulo}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{juego.titulo}</h5>
                    <p className="card-text"><strong>Descripción:</strong> {juego.descripcion}</p>
                    <p className="card-text"><strong>Reseña:</strong> {juego.reseña}</p>
                    <p className="card-text"><strong>Horas jugadas:</strong> {juego.horasJugadas} h</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setEditando(juego.id);
                        setFormData({
                          titulo: juego.titulo,
                          descripcion: juego.descripcion,
                          reseña: juego.reseña,
                          horasJugadas: juego.horasJugadas,
                          imagen: null
                        });
                      }}

                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminarVideojuego(juego.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideojuegoList;