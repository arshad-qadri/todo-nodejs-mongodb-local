import React, { useEffect, useState } from "react";
import axios from "axios";
const Todo = () => {
  const [todo, setTodo] = useState("");
  const [inpTodo, setInpTodo] = useState("");
  const [id, setId] = useState(null);

  console.log("todo", todo);
  const getData = async () => {
    await axios
      .get("http://localhost:8080/api/", {})
      .then(res => {
        // console.log(res);
        setTodo(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const addTodo = () => {
    axios
      .post("http://localhost:8080/api/", { todo: inpTodo })
      .then(res => {
        console.log("reee", res);
        getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = async _id => {
    await axios
      .delete(`http://localhost:8080/api/${_id}`)
      .then(res => {
        if (res.data._id === _id) {
          console.log("id", _id);
          console.log("delete", res);
          getData();
        } else {
          alert("some error");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleFind = id => {
    axios
      .get(`http://localhost:8080/api/${id}`, {})
      .then(res => {
        console.log("update", res);
        setId(res.data._id);
        setInpTodo(res.data.todo);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const udpdateTodo = () => {
    axios
      .put(`http://localhost:8080/api/${id}`, { todo: inpTodo })
      .then(res => {
        console.log("put", res);
        getData();
        setId(null);
        setInpTodo("");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Todo</h1>
      <input
        type="text"
        value={inpTodo}
        onChange={e => setInpTodo(e.target.value)}
      />
      <button onClick={id ? udpdateTodo : addTodo}>
        {" "}
        {id ? "Update" : "Add"}{" "}
      </button>

      {todo &&
        todo.length > 0 &&
        todo.map(item => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "10px",
            }}
          >
            <h3> {item.todo} </h3>
            <button onClick={() => handleFind(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default Todo;
