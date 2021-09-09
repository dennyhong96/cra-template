import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "src/store";

export interface INote {
  id: string;
  title: string;
  completed: boolean;
}

class NoteStore {
  root: RootStore;

  notes: INote[] = [];
  newNoteText: string = "";

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);

    // Load remote data
    // this.loadData();
  }

  async loadData() {
    console.log("Loading notes...");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) throw new Error("Network error.");
      const notes = ((await res.json()) as INote[]).slice(0, 15);

      runInAction(() => {
        this.notes = notes;
      });
    } catch (error) {
      // Handle error
    }
  }

  changeNoteText(text: string) {
    this.newNoteText = text;
  }

  clearNoteText() {
    this.newNoteText = "";
  }

  toggleCompleted(id: string, completed: boolean) {
    const note = this.notes.find((n) => n.id === id);
    if (!note) return alert(`Note with id ${id} not found.`);
    note.completed = completed;
  }

  generateTodoId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  async mockNetworkReqeust(duration = 250) {
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  async addNote() {
    const text = this.newNoteText;
    this.clearNoteText();

    await this.mockNetworkReqeust();

    runInAction(() => {
      this.notes.push({
        id: this.generateTodoId(),
        title: text,
        completed: false,
      });
    });
  }

  async removeNote(id: string) {
    await this.mockNetworkReqeust();

    runInAction(() => {
      this.notes = this.notes.filter((note) => note.id !== id);
    });
  }
}

export default NoteStore;
