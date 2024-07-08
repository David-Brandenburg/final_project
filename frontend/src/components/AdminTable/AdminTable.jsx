import React, { useContext, useEffect, useState } from "react";
import "./admintable.scss";
import { toast } from "react-toastify";
import { ModalContext } from "../../contexts/ModalContext";

const AdminTable = () => {
  const [data, setData] = useState(null);
  const [columnsToDisplay, setColumnsToDisplay] = useState([]);

  const { setOpenModalBlocker, setAdminEditModal, setAdminDeleteModal, adminTab } =
    useContext(ModalContext);
  const URL = process.env.REACT_APP_URL_BACKEND;
  const fetchData = async (e) => {
    try {
      const url = `${URL}/${adminTab}`;
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
        throw new Error(data.message);
      } else {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (adminTab === "accounts") {
      setColumnsToDisplay([
        "_id",
        "email",
        "benutzername",
        "vorname",
        "nachname",
        "isAdmin",
        "isEmailVerified",
      ]);
    } else if (adminTab === "games") {
      setColumnsToDisplay(["_id", "title", "publisher", "dlc"]);
    }
  }, [adminTab]);

  const handleEditEntry = (e, id) => {
    e.preventDefault();
    setOpenModalBlocker(true);
    setAdminEditModal(id);
  };

  const handleDeleteEntry = (e, id) => {
    e.preventDefault();
    setOpenModalBlocker(true);
    setAdminDeleteModal(id);
  };

  return (
    <div className="adminTable-wrapper">
      <table className="adminTable">
        <thead>
          <tr>
            {columnsToDisplay.map((key) => {
              let displayName = key;
              if (key === "isEmailVerified") {
                displayName = (
                  <i
                    title={"Email verifiziert?"}
                    className="bi bi-envelope-check"></i>
                );
              }
              if (key === "isAdmin") {
                displayName = (
                  <i
                    title={"User ist Admin?"}
                    className="bi bi-person-wheelchair"></i>
                );
              }
              return <th key={key}>{displayName}</th>;
            })}
            <th>Edit | Delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                {columnsToDisplay.map((key) => {
                  let displayValue = item[key];
                  if (key === "_id") {
                    displayValue = item[key].slice(0, 5) + "...";
                  } else if (typeof item[key] === "boolean") {
                    displayValue = item[key] ? (
                      <i
                        className="bi bi-check-circle"
                        style={{ color: "limegreen" }}></i>
                    ) : (
                      <i
                        className="bi bi-x-circle"
                        style={{ color: "red" }}></i>
                    );
                  }
                  return (
                    <td
                      key={key}
                      style={{
                        color:
                          typeof item[key] === "boolean"
                            ? item[key]
                              ? "limegreen"
                              : "red"
                            : "unset",
                        textAlign:
                          typeof item[key] === "boolean" ||
                          key === "_id" ||
                          key === "rating"
                            ? "center"
                            : "start",
                        width:
                          key === "title"
                            ? "450px"
                            : key === "_id"
                            ? "60px"
                            : key === "publisher"
                            ? "250px"
                            : key === "isAdmin" || key === "isEmailVerified"
                            ? "40px"
                            : key === "vorname"
                            ? "100px"
                            : key === "nachname"
                            ? "100px"
                            : key === "dlc"
                            ? "40px"
                            : "100px",
                      }}>
                      {displayValue}
                    </td>
                  );
                })}
                <td className="edit-delete-td">
                  <i
                    className="bi bi-pencil-square"
                    onClick={(e) => handleEditEntry(e, item._id)}></i>
                  &nbsp; | &nbsp;
                  <i
										className="bi bi-trash3"
										onClick={(e) => handleDeleteEntry(e, item._id)}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
