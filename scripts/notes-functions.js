// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the notes to localStorage
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const status = document.createElement("p");

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  //setup the link
  noteEl.setAttribute("href", `edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  //setup the message
  status.textContent = getLastEdited(note.updatedAt);
  status.classList.add("list-item__subtitle");
  noteEl.appendChild(status);

  return noteEl;
};

const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt < b.updatedAt) return 1;
      return -1;
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      return -1;
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 1;
    });
  }
};
// Render application notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notes");
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "there is no notes to show!";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

const getLastEdited = (updatedAt) =>
  `Last edited ${moment(updatedAt).fromNow()}`;
