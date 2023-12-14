import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NextEvent.css";


import { UserContext } from "../../context/AuthContext";
import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const NextEvent = ({ title, description, eventDate, idEvent }) => {

  function conectar(idEvent) {
    // dá pra usar a prop idEvent? testar
    alert(`Chamar o recurso para conectar: ${idEvent}`);
  }
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"

        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      {/* <a
        onClick={() => {
          conectar(idEvent);
        }}
        className="event-card__connect-link"
      >
        Conectar
      </a> */}

      <Link className="event-card__connect-link" to="/eventos-aluno">
        Conectar
      </Link>

    </article>
  );
};

export default NextEvent;

export const DetalhesEvents = ({ title, description, eventDate, idEvent, text, additionalClass }) => {
  return (
    <article className={`event-card ${additionalClass}`}>
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"

        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0,35)}
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      <Link to={`/detalhes-eventos/${idEvent}`} className="event-card__connect-link">
        {text}
      </Link>

    </article>
  );
};
