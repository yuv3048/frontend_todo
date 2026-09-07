import React, { useEffect, useState } from "react";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import Fab from "@mui/material/Fab";

function Note({ todo, onComplete, onDelete }) {
  const [now, setNow] = useState(Date.now());

  const deadline = new Date(todo.deadlineAt).getTime();
  const created = new Date(todo.createdAt);

  const isCompleted = todo.status === "completed";
  const isExpired = !isCompleted && now >= deadline;

  // Update the clock every second while Todo is pending
  useEffect(() => {
  const timer = setInterval(() => {
    setNow(Date.now());
  }, 1000);

  return () => clearInterval(timer);
  }, []);


  function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  }

  function formatRemaining() {
  const difference = deadline - now;

  if (difference <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(
    difference / 1000
  );

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds =
    totalSeconds % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} min ${seconds} sec`;
  }

  if (minutes > 0) {
    return `${minutes} min ${seconds} sec`;
  }

  return `${seconds} sec`;
  }

  function formatDuration(totalSeconds) {
  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds =
    totalSeconds % 60;

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours} hr ${minutes} min`;
    }

    return `${hours} hr`;
  }

  if (minutes > 0) {
    if (seconds > 0) {
      return `${minutes} min ${seconds} sec`;
    }

    return `${minutes} min`;
  }

  return `${seconds} sec`;
  }

  function getCompletedStatus() {
  if (!todo.completedAt) {
    return <strong>✓ Completed</strong>;
  }

  const completedAt = new Date(todo.completedAt).getTime();

  const difference = deadline - completedAt;

  if (difference > 0) {
    const earlySeconds = Math.floor(difference / 1000);

    return (
      <strong>
        ✓ Completed {formatDuration(earlySeconds)} early
      </strong>
    );
  }

  if (difference === 0) {
    return <strong>✓ Completed on time</strong>;
  }

  const lateSeconds = Math.floor(Math.abs(difference) / 1000);

  return (
    <strong>
      ✓ Completed {formatDuration(lateSeconds)} late
    </strong>
  );
  }

  function getFailedStatus() {
  const failedSeconds = Math.floor(
    (now - deadline) / 1000
  );

  return (
    <>
      <strong>
        ✕ Failed Todo
      </strong>

      <small>
        Failed{" "}
        {formatDuration(failedSeconds)} ago
      </small>
    </>
  );
  }

  return (
  <div
    className={`note ${
      isExpired ? "failed-note" : ""
    } ${isCompleted ? "completed-note" : ""}`}
  >
    {/* Creation time */}
    <div className="note-created-time">
      {formatTime(created)}
    </div>

    
    <div className="note-header">
      <h1>{todo.title}</h1>
    </div>

    {/* Content */}
    <p>{todo.content}</p>

    <div className="todo-status">
        {!isCompleted && !isExpired && (
          <span className="countdown">
            🕐 {formatRemaining()}
          </span>
        )}

        {isCompleted && (
          <div className="completed-status">
            {getCompletedStatus()}
          </div>
        )}

        {isExpired && !isCompleted && (
          <div className="failed-status">
            {getFailedStatus()}
          </div>
        )}
      </div>

    {/* Buttons */}
    <div className="note-actions">
      {!isCompleted && (
        <Fab
          className="complete-button"
          onClick={() => onComplete(todo._id)}
        >
          <DoneAllOutlinedIcon />
        </Fab>
      )}

      <Fab
        className="delete-button"
        onClick={() => onDelete(todo._id)}
      >
        <DeleteOutlinedIcon />
      </Fab>
    </div>
  </div>
  );
}

export default Note;