import { FormEvent } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "src/store";

// Don't need to wrap in oberver if don't need to react to state changes, e.g. only accessing actions
const AddNote = observer(() => {
  const store = useStore();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    store.noteStore.addNote();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        placeholder="Note"
        value={store.noteStore.newNoteText}
        onChange={(evt) => store.noteStore.changeNoteText(evt.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
});

export default AddNote;
