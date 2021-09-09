import { FC } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import { useStore } from "src/store";
import Note from "src/components/notes/Note";

// observer makes state reactive, only re-render when the pieces of state
const Notes: FC = observer(() => {
  const store = useStore();

  return (
    <div>
      <h2>Notes:</h2>
      <ul>
        {[...store.noteStore.notes].reverse().map((note) => (
          <Note key={note.id} note={toJS(note)} />
        ))}
      </ul>
    </div>
  );
});

export default Notes;
