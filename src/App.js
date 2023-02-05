import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [note, setNotes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div>
      {note.map((item) => (
        <p key={item.id}>
          {item.name} {item.number}
        </p>
      ))}
    </div>
  );
}

export default App;
