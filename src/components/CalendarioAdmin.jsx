import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalCita from "./ModalCita";

// Configuración para usar moment.js con react-big-calendar
const localizer = momentLocalizer(moment);

const CalendarioAdmin = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [slotInfo, setSlotInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_URL = "http://localhost:3003/citas"; // URL de tu API

  // Cargar los eventos desde la API (sin forzar id, se respeta el tipo asignado por la BBDD)
  const cargarEventosDesdeApi = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        // Convertir start y end a objetos Date
        const eventosFormateados = data.map((evento) => ({
          ...evento,
          start: new Date(evento.start),
          end: new Date(evento.end),
        }));
        setEventos(eventosFormateados);
      } else {
        console.error("La respuesta no es un arreglo de eventos.");
      }
    } catch (error) {
      console.error("Error al cargar los eventos:", error);
    }
  };

  useEffect(() => {
    cargarEventosDesdeApi(); // Cargar los eventos al montar el componente
  }, []);

  // Al seleccionar un slot en el calendario para crear una nueva cita:
  // Se inicializa la hora de inicio, pero el campo de hora de fin se deja vacío.
  const handleSelectSlot = (slot) => {
    setSlotInfo(slot);
    setModoEdicion(false);
    setNuevoEvento({
      title: "",
      start: moment(slot.start).format("HH:mm"),
      end: "", // Dejar la hora de fin en blanco al crear una nueva cita
    });
    setShowModal(true);
  };

  // Al hacer clic en un evento (para editarlo): se muestran ambas horas
  const handleEventClick = (evento) => {
    setModoEdicion(true);
    setEventoSeleccionado(evento);
    setNuevoEvento({
      title: evento.title,
      start: moment(evento.start).format("HH:mm"),
      end: moment(evento.end).format("HH:mm"),
    });
    setShowModal(true);
  };

  // Manejar el cambio en los inputs del modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento({ ...nuevoEvento, [name]: value });
  };

  const handleGuardarEvento = async () => {
    if (nuevoEvento.title && nuevoEvento.start && nuevoEvento.end) {
      // Tomamos una fecha base (usamos slotInfo para creación; si se edita, el eventoSeleccionado ya tendrá la fecha)
      const baseDate = slotInfo ? slotInfo.start : eventoSeleccionado.start;
      const startDate = new Date(baseDate);
      const endDate = new Date(baseDate);

      const [startHour, startMinutes] = nuevoEvento.start.split(":");
      const [endHour, endMinutes] = nuevoEvento.end.split(":");

      startDate.setHours(startHour, startMinutes, 0, 0);
      endDate.setHours(endHour, endMinutes, 0, 0);

      // Creación del objeto evento sin forzar el id en POST
      const eventoObj = {
        title: nuevoEvento.title,
        start: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"), // Formato local
        end: moment(endDate).format("YYYY-MM-DDTHH:mm:ss")
      };

      try {
        if (modoEdicion) {
          // Actualización: se usa el id del evento seleccionado
          const response = await fetch(`${API_URL}/${eventoSeleccionado.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...eventoObj, id: eventoSeleccionado.id }),
          });
          if (response.ok) {
            setEventos((prevEventos) =>
              prevEventos.map((ev) =>
                ev.id === eventoSeleccionado.id ? { ...eventoObj, id: eventoSeleccionado.id, start: new Date(eventoObj.start), end: new Date(eventoObj.end) } : ev
              )
            );
          }
        } else {
          // Creación: no enviar id, que será asignado automáticamente por la BBDD
          const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventoObj),
          });
          const data = await response.json();
          // Convertir las fechas a objetos Date para el frontend
          data.start = new Date(data.start);
          data.end = new Date(data.end);
          setEventos([...eventos, data]);
        }
        setShowModal(false);
        setNuevoEvento({ title: "", start: "", end: "" });
      } catch (error) {
        console.error("Error al guardar el evento:", error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleEliminarEvento = async () => {
    try {
      const response = await fetch(`${API_URL}/${eventoSeleccionado.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEventos(eventos.filter((ev) => ev.id !== eventoSeleccionado.id));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <h1>Calendario Administrativo</h1>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        selectable
        defaultView="day"
        views={["month", "week", "day", "agenda"]}
        min={new Date(2025, 2, 27, 8, 0)}
        max={new Date(2025, 2, 27, 22, 0)}
        formats={{
          timeGutterFormat: "HH:mm",
          eventTimeRangeFormat: ({ start, end }) =>
            `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
        }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        style={{ height: "80%" }}
      />

      <ModalCita
        modoEdicion={modoEdicion}
        nuevoEvento={nuevoEvento}
        handleInputChange={handleInputChange}
        handleGuardarEvento={handleGuardarEvento}
        handleEliminarEvento={handleEliminarEvento}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CalendarioAdmin;
