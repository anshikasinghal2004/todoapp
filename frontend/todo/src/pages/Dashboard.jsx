import { useEffect, useState } from "react";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchBoards = async () => {
    const res = await fetch("http://localhost:5000/api/boards", {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await res.json();
    setBoards(data);
  };

  const addBoard = async () => {
    await fetch("http://localhost:5000/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchBoards();
  };

  const deleteBoard = async (id) => {
    await fetch(`http://localhost:5000/api/boards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    fetchBoards();
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="container">
      <h2>Your Boards</h2>

      <input
        placeholder="Board name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addBoard}>Add Board</button>

      <ul>
        {boards.map((b) => (
          <li
            key={b._id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <a href={`/board/${b._id}`}>{b.title}</a>
            <button
              style={{ width: "70px", background: "crimson" }}
              onClick={() => deleteBoard(b._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
