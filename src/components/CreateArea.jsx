import React, { useState } from "react";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea({ onAdd }) {

  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [deadlineMinutes, setDeadlineMinutes] = useState(60);

  function handleChange(event) {

    const { name, value } = event.target;

    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function formatDeadline(minutes) {

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
  }

  function submitNote(event) {

    event.preventDefault();

    if (
      note.title.trim() === "" &&
      note.content.trim() === ""
    ) {
      return;
    }

    onAdd({
      ...note,
      deadlineMinutes
    });

    setNote({
      title: "",
      content: ""
    });

    setDeadlineMinutes(60);
    setExpanded(false);
  }

  return (
    <div>

      <form
        className="create-note"
        onSubmit={submitNote}
      >

        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          onClick={() => setExpanded(true)}
          rows={isExpanded ? 3 : 1}
        />

        {isExpanded && (
          <div className="deadline-container">

            <div className="deadline-label">
              <span>Deadline</span>

              <strong>
                {formatDeadline(deadlineMinutes)}
              </strong>
            </div>

            <input
                className="deadline-slider"
                type="range"
                min="5"
                max="1440"
                step="5"
                value={deadlineMinutes}
                onChange={(event) =>
                    setDeadlineMinutes(Number(event.target.value))
                }
                style={{
                  background: `linear-gradient(
                    to right,
                    #f5ba13 0%,
                    #f5ba13 ${
                      ((deadlineMinutes - 5) / (1440 - 5)) * 100
                    }%,
                    #444 ${
                      ((deadlineMinutes - 5) / (1440 - 5)) * 100
                    }%,
                    #444 100%
                  )`
                }}
            />

            <div className="slider-labels">
              <span>5 min</span>
              <span>24 hr</span>
            </div>

          </div>
        )}

        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddCircleOutlineOutlinedIcon />
          </Fab>
        </Zoom>

      </form>

    </div>
  );
}

export default CreateArea;