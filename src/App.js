import "./App.css";
import Card from "./Components/Card";
import { useEffect, useState } from "react";
import Modal from "./Components/Modal";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBtn, setModalBtn] = useState("");
  // Getting all notes on initial render
  useEffect(() => {
    let notesArr = fetchNotes();
    notesArr = JSON.parse(notesArr);
    setNotes([...notesArr]);
  }, []);
  // Adding New Note
  function addNote() {
    setModalTitle("Add Note");
    setModalBtn("Add");
    setModal(true);
    setTitle("");
    setDesc("");
  }
  // Fetch Notes from local storage
  function fetchNotes() {
    let notesArr = localStorage.getItem("notes");
    if (notesArr === null) {
      localStorage.setItem("notes", JSON.stringify([]));
      notesArr = localStorage.getItem("notes");
    }
    return notesArr;
  }
  return (
    <div className="App">
      {modal && (
        <Modal
          setModal={setModal}
          modalTitle={modalTitle}
          modalBtn={modalBtn}
          notes={notes}
          setNotes={setNotes}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
        />
      )}
      <div className="absolute inset-0">
        <header className="App-header text-4xl md:text-5xl font-semibold m-6">
          <h1>Note Taking App</h1>
        </header>
        <div className="flex justify-end mx-6">
          <button
            className="flex items-center App-link p-2 hover:bg-purple-200 bg-purple-100 rounded-md text-xl px-4"
            onClick={addNote}
          >
            <svg
              fill="#6200ee"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="20px"
              height="20px"
            >
              <path
                d="M13.98,0C6.259,0,0,6.26,0,13.982s6.259,13.981,13.98,13.981c7.725,0,13.983-6.26,13.983-13.981
			C27.963,6.26,21.705,0,13.98,0z M21.102,16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299H21.102z
			"
              />
            </svg>
            <span className="mx-2">Add</span>
          </button>
        </div>
        {notes.length > 0 ? (
          <div className="notes grid md:grid-cols-2 lg:grid-cols-4">
            {notes.map((note) => (
              <Card
                key={note.title}
                title={note.title}
                desc={note.desc}
                notes={notes}
                setNotes={setNotes}
                setTitle={setTitle}
                setDesc={setDesc}
                setModal={setModal}
                setModalTitle={setModalTitle}
                setModalBtn={setModalBtn}
              />
            ))}
          </div>
        ) : (
          <div className="text-2xl mt-4">No Note Available Right Now.</div>
        )}
      </div>
    </div>
  );
}

export default App;
