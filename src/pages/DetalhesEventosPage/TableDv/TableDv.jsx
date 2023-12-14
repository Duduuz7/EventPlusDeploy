import React from "react";
import ToggleSwitch from "../../../components/Toggle/Toggle";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
// import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableDv.css";

const Table = ({ dados, idEvento }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Cometário
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Autor
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Exibe
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          {
            return (
              <tr className="tbal-data__head-row" key={Math.random()}>
                <td className="tbal-data__data tbal-data__data--big">
                  {e.descricao}
                </td>

                <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                  {e.usuario.nome}
                </td>

                <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                  <ToggleSwitch toggleActive={e.exibe}/>
                </td>
              </tr>
            ) ;
          }
        })} 
      </tbody>
    </table>
  );
};

export default Table;