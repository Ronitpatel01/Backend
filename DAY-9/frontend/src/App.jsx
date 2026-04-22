import React, { useEffect, useState } from "react";
import axios from "axios"; // Fixed import
import Notes from "./components/Notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://backend-ygpu.onrender.com//api/notes",
      );
      setNotes(res.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://backend-ygpu.onrender.com//api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      await axios.patch(`https://backend-ygpu.onrender.com//api/notes/${id}`, {
        title,
        description,
      });
      fetchNotes();
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("https://backend-ygpu.onrender.com//api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
        e.target.reset();
      });
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Notes</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Enter title for your note"
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Enter description for your note"
        />
        <button>Create Note</button>
      </form>
      <Notes notes={notes} onDelete={deleteNote} onEdit={editNote} />
    </div>
  );
};

export default App;
