import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import TodoGroup from "./TodoGroup";
import Auth from "./Auth";

function App() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
      Boolean(localStorage.getItem("token"))
  );
  
  function handleLogin() {
      setIsLoggedIn(true);
  }

  function handleLogout() {
  localStorage.removeItem("token");

  setNotes([]);

  setIsLoggedIn(false);
  }
  
  const token = localStorage.getItem("token");

  useEffect(() => {
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

        const data = await response.json();

        if (response.ok) {
          setNotes(data.todos);
        } else if (response.status === 401) {
          handleLogout();
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (isLoggedIn && token) {
      fetchTodos();
    }
  }, [isLoggedIn]);

  // Add Todo
  async function addNote(newNote) {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          deadlineMinutes: newNote.deadlineMinutes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setNotes((prevNotes) => [
        ...prevNotes,
        data.todo
      ]);

    } catch (error) {
      console.error(error);
    }
  }

  // Complete Todo
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

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? data.todo : note
        )
      );

    } catch (error) {
      console.error(error);
    }
  }

  // Delete Todo
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

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );

    } catch (error) {
      console.error(error);
    }
  }

  // Group todos by date 
  function groupNotesByDate(notes) {
  const groups = {};

  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

  sortedNotes.forEach((note) => {
    const date = new Date(note.createdAt);

    const key =
      `${date.getFullYear()}-` +
      `${date.getMonth()}-` +
      `${date.getDate()}`;

    if (!groups[key]) {
      groups[key] = {
        date,
        notes: []
      };
    }

    groups[key].notes.push(note);
  });

  return Object.values(groups);
}

  function formatGroupLabel(date) {
  const now = new Date();

  if (
    date.toDateString() ===
    now.toDateString()
  ) {
    return "Today";
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

  const groupedNotes = groupNotesByDate(notes);

  function toggleDarkMode() {
  setDarkMode((prev) => !prev);
  }

  if (!isLoggedIn) {
  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <Auth onLogin={handleLogin} />

      <Footer />
    </div>
  );
  }

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>

    <Header
      onLogout={handleLogout}
      showLogout={true}
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
    />

    <CreateArea onAdd={addNote} />

    <div className="todo-groups">
      {groupedNotes.map((group) => (
        <TodoGroup
          key={group.date.getTime()}
          label={formatGroupLabel(group.date)}
        >
          {group.notes.map((todo) => (
            <Note
              key={todo._id}
              todo={todo}
              onComplete={completeNote}
              onDelete={deleteNote}
            />
          ))}
        </TodoGroup>
      ))}
    </div>

    <Footer />
  </div>
  );
}

export default App;