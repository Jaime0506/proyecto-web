import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Nombre",
  "Identificación",
  "Fecha",
  "Usuario",
  "Estado",
  "Puntos",
  "Acción",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "Caín",
    order_id: 11232,
    date: "Junio 29,2045",
    customer: "Caín123",
    status: "Activo",
    amount: 400,
  },
  {
    id: 100,
    name: "Caín",
    order_id: 11232,
    date: "Junio 29,2045",
    customer: "Caín123",
    status: "Activo",
    amount: 400,
  },
  {
    id: 120,
    name: "Caín",
    order_id: 11232,
    date: "Junio 29,2045",
    customer: "Caín123",
    status: "Activo",
    amount: 400,
  },
  {
    id: 130,
    name: "Caín",
    order_id: 11232,
    date: "Junio 29,2045",
    customer: "Caín123",
    status: "Activo",
    amount: 400,
  },
  {
    id: 140,
    name: "Caín",
    order_id: 11232,
    date: "Junio 29,2045",
    customer: "Caín123",
    status: "Activo",
    amount: 400,
  },
  {
    id: 150,
    name: "Caín",
    order_id: 11232,
    date: "Junio 29,2045",
    customer: "Caín123",
    status: "Activo",
    amount: 400,
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Tabla de Clasificación</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.customer}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td>{dataItem.amount.toFixed(0)}ptos.</td>
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
