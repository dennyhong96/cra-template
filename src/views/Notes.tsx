import { useEffect } from "react";
import { Link } from "react-router-dom";

import AddNote from "src/components/notes/AddNote";
import Notes from "src/components/notes/Notes";
import { useStore } from "src/store";

const NotesView = () => {
  const store = useStore();

  useEffect(() => {
    store.noteStore.loadData();
  }, [store]);

  return (
    <main>
      <Link to="/">Go to Blockchain</Link>
      <AddNote />
      <Notes />
    </main>
  );
};

export default NotesView;
