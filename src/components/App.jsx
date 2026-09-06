import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Auth from "./Auth";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setNotes([]);
  }

  // Get user's todos after login
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchTodos() {
      try {
        const response = await fetch(
          "http://localhost:3000/todos",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status === 401) {
          logout();
          return;
        }

        const data = await response.json();

        if (response.ok) {
          setNotes(data.todos);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, [token]);

  function handleLogin(newToken) {
    setToken(newToken);
  }

  // CREATE TODO
  async function addNote(newNote) {
    if (
      newNote.title.trim() === "" &&
      newNote.content.trim() === ""
    ) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: newNote.title,
            content: newNote.content
          })
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setNotes((prevNotes) => {
        return [...prevNotes, data.todo];
      });
    } catch (error) {
      console.error(error);
    }
  }

  // COMPLETE TODO
  async function completeNote(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          if (note._id === id) {
            return data.todo;
          }

          return note;
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  // DELETE TODO
  async function deleteNote(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setNotes((prevNotes) => {
        return prevNotes.filter((note) => {
          return note._id !== id;
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  // If user isn't logged in
  if (!token) {
    return (
      <div>
        <Header />

        <Auth onLogin={handleLogin} />

        <Footer />
      </div>
    );
  }

  // While getting todos
  if (loading) {
    return (
      <div>
        <Header />

        <p className="loading">Loading your notes...</p>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="user-bar">
        <span>You are logged in</span>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <CreateArea onAdd={addNote} />

      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            completed={noteItem.completed}
            onComplete={completeNote}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;