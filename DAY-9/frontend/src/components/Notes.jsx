import React, { useState } from "react";

const Notes = ({ notes, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEditClick = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditDescription(note.description);
  };

  const handleContinue = () => {
    if (editingId) {
      onEdit(editingId, editTitle, editDescription);
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <>
      <section className="all-notes">
        {notes.map((note) => (
          <article className="note" key={note._id}>
            <div className="note-header">
              <button
                className="edit-btn"
                onClick={() => handleEditClick(note)}
                title="Edit note"
              >
                ✎
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button className="delete-btn" onClick={() => onDelete(note._id)}>
              Delete
            </button>
          </article>
        ))}
      </section>

      {editingId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Note</h3>
            <input
              type="text"
              placeholder="Enter title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Enter description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button className="btn-continue" onClick={handleContinue}>
                Continue
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
