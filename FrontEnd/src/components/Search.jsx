import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../http";
function Search() {
  const params = useParams();
  const [taske, setTaske] = useState([]);
  const [count, setCount] = useState(0);
  const mainUrl = window.location.origin;

  useEffect(() => {
   
    http.get("/tasks/" + params.key).then((res) => {
      if (res.status == 200) {
        setTaske(res.data.tasks);
      }
    });
  }, [params.key, count]);

  return (
    <div>
      <div className="table">
        <h3>Results for {params.key}</h3>
        {taske.length > 0 ? (
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
              {taske.map((task) => (
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
                    <Link to={mainUrl + "/edit/" + task.id}>
                      <button className="btn">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>

                    <button
                      className="btn2"
                      onClick={() => {
                        http.delete("/delete/" + task.id).then(() => {
                          setCount(count + 1);
                          toast.success("Task deleted successfully");
                        });
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <br />
            <br />
            <h3 className="text-center">No results found for {params.key}</h3>
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
