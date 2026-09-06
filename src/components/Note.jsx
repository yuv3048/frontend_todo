import React from "react";

import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import Fab from "@mui/material/Fab";

function Note(props) {
  function handleComplete() {
    if (!props.completed) {
      props.onComplete(props.id);
    }
  }

  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div
      className="note"
      style={{
        textDecoration: props.completed
          ? "line-through"
          : "none"
      }}
    >
      <h1>{props.title}</h1>

      <p>{props.content}</p>

      <div className="note-buttons">
        <Fab
          className="complete-button"
          onClick={handleComplete}
          disabled={props.completed}
        >
          <DoneAllOutlinedIcon />
        </Fab>

        <Fab
          className="delete-button"
          onClick={handleDelete}
        >
          <DeleteOutlinedIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Note;