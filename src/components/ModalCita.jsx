import React from "react";

function ModalCita({
  modoEdicion,
  nuevoEvento,
  handleInputChange,
  handleGuardarEvento,
  handleEliminarEvento,
  showModal,
  setShowModal,
}) {
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{
        display: showModal ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {modoEdicion ? "Editar cita" : "Agregar nueva cita"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={nuevoEvento.title}
                onChange={handleInputChange}
                placeholder="Título de la cita"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hora de inicio</label>
              <input
                type="time"
                className="form-control"
                name="start"
                value={nuevoEvento.start}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hora de fin</label>
              <input
                type="time"
                className="form-control"
                name="end"
                value={nuevoEvento.end}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGuardarEvento}
            >
              Guardar
            </button>
            {modoEdicion && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleEliminarEvento}
              >
                Eliminar
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCita;
