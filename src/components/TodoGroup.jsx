import React, { useState } from "react";

function TodoGroup({ label, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="todo-group">
      <button
        type="button"
        className="group-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="group-title">
          {label}
        </span>

        <span className="group-arrow">
          {isOpen ? "▼" : "▶"}
        </span>
      </button>

      {isOpen && (
        <div className="group-content">
          <div className="group-notes">
            {children}
          </div>
        </div>
      )}
    </section>
  );
}

export default TodoGroup;