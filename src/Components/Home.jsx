import React from "react";

const Home = () => (
  <div className="d-flex align-items-center justify-content-center py-5 px-3">
    <div
      className="text-center p-4 shadow rounded"
      style={{ backgroundColor: "rgba(220, 230, 245, 0.9)" }}
    >
      <h1 className="fw-bold mb-3 display-5 text-primary">🎮 Games Library</h1>
      <p className="fs-5 mb-4">
        Gestiona tu biblioteca de videojuegos.
      </p>
      <a href="/videojuegos" className="btn btn-outline-primary btn-lg">
        Ver mis videojuegos
      </a>
    </div>
  </div>
);

export default Home;
