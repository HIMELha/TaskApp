import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http";
import { toast } from "react-toastify";

function Table() {
  const [taske, setTaske] = useState([]);

  useEffect(() => {
    fetchAllTask();
  }, []);

  const fetchAllTask = () => {
    http.get("tasks").then((res) => {
      if (res.status == 200) {
        setTaske(res.data.tasks);
      } else {
        toast.error("Something went wrong while fatching task data's");
      }
    });
  };

  return (
    <div className="table">
      <h3>Showing {taske.length} results</h3>

      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Task Name</th>
            <th>Task Motivation</th>
            <th>Task Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {taske.length != 0 ? (
            taske.map((task) => (
              <tr key={task.id}>
                {/* <td>{task.id}</td> */}
                <td>{task.name}</td>
                <td>{task.motivation}</td>
                <td>{task.deadline}</td>
                <td className="text-start flex-center">
                  <span
                    className={
                      task.status == "pending"
                        ? "pending"
                        : task.status == "completed"
                        ? "completed"
                        : "proccessing"
                    }
                  >
                    <i
                      className={
                        task.status == "pending"
                          ? "fa-solid fa-circle-dot"
                          : task.status == "completed"
                          ? "fa-regular fa-circle-check"
                          : "fa-solid fa-circle-notch"
                      }
                    ></i>
                    {task.status === "pending"
                      ? "Pending"
                      : task.status === "completed"
                      ? "Completed"
                      : "Proccessing"}
                  </span>
                </td>
                <td className="flex-gap text-center ">
                  <Link to={{ pathname: "/task/" + task.id }}>
                    <button className="btn">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </Link>
                  <Link to={{ pathname: "edit/" + task.id }}>
                    <button className="btn">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>

                  <button
                    className="btn2"
                    onClick={() => {
                      http.delete("/delete/" + task.id).then(() => {
                        console.log("deleted");
                        fetchAllTask();
                        toast.success("Task deleted successfully");
                      });
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <br />
                <br />
                <div className="loading">
                  <span className="proccessing">
                    <i className="fa-solid fa-circle-notch"></i> Loading
                  </span>
                </div>
                <br />
                <br />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
