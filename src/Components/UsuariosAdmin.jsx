import React, { useEffect, useState } from "react";
import axios from "axios";

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    axios.get("http://localhost:8080/api/usuarios", { withCredentials: true })
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Error al obtener usuarios:", err));
  }, []);

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:8080/api/usuarios/${id}`, { withCredentials: true })
      .then(() => setUsuarios(usuarios.filter(u => u.id !== id)))
      .catch(err => console.error("Error al eliminar usuario:", err));
  };

  const editarUsuario = ({ id, username, email }) => {
    setEditandoId(id);
    setFormData({ username, email });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({ username: "", email: "" });
  };

  const guardarUsuario = () => {
    axios.put(`http://localhost:8080/api/usuarios/${editandoId}`, formData, { withCredentials: true })
      .then(res => {
        setUsuarios(usuarios.map(u => u.id === editandoId ? res.data : u));
        cancelarEdicion();
      })
      .catch(err => console.error("Error al actualizar usuario:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Gestión de Usuarios</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                {editandoId === u.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="form-control"
                        disabled
                      />
                    </td>
                    <td className="text-center">
                      <button className="btn btn-success btn-sm me-2" onClick={guardarUsuario}>
                        Guardar
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={cancelarEdicion}>
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="text-center">
                      <button className="btn btn-warning btn-sm me-2" onClick={() => editarUsuario(u)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(u.id)}>
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosAdmin;