import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Board() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title, boardId: id }),
    });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  };

  const deleteTodo = async (todoId) => {
    await fetch(`http://localhost:5000/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    fetchTodos();
  };

  return (
    <div className="container">
      <h2>Todos</h2>

      <input
        placeholder="Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((t) => (
          <li
            key={t._id}
            className={t.completed ? "todo-done" : ""}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span onClick={() => toggleTodo(t)}>{t.title}</span>

            <button
              style={{ width: "70px", background: "crimson" }}
              onClick={() => deleteTodo(t._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
