// src/components/LoadMoreButton.js
function LoadMoreButton({ onClick, loading }) {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className="load-more"
      >
        {loading ? 'Cargando...' : 'Cargar más'}
      </button>
    );
  }
  
  export default LoadMoreButton;