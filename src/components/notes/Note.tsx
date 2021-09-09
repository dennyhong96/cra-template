import { FC } from "react";

import { useStore } from "src/store";
import { INote } from "src/store/modules/NoteStore";

const Note: FC<{ note: INote }> = ({ note }) => {
  const store = useStore();

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "2px solid white",
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          style={{ width: "max-content", marginBottom: 0, marginRight: 8 }}
          type="checkbox"
          checked={note.completed}
          onChange={(evt) =>
            store.noteStore.toggleCompleted(note.id, evt.target.checked)
          }
        />
        <span
          style={{
            textDecoration: note.completed ? "line-through" : undefined,
          }}
        >
          {note.title}
        </span>
      </span>
      <button
        aria-label="Remove note"
        onClick={() => store.noteStore.removeNote(note.id)}
      >
        x
      </button>
    </li>
  );
};

export default Note;
