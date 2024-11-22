const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default PageNotFound;
