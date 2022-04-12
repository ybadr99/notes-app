const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const remove = document.querySelector("#remove-note");
const updatedElement = document.querySelector("#update-at");

id = location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find((note) => note.id === id);

if (!note) {
  location.assign("/index.html");
}
titleElement.value = note.title;
bodyElement.value = note.body;
updatedElement.textContent = getLastEdited(note.updatedAt);
// console.log(updatedElement);

titleElement.addEventListener("input", function (e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  updatedElement.textContent = getLastEdited(note.updatedAt);

  saveNotes(notes);
});

bodyElement.addEventListener("input", function (e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  updatedElement.textContent = getLastEdited(note.updatedAt);
  saveNotes(notes);
});

remove.addEventListener("click", function (e) {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  //   console.log(e);
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => note.id === id);

    if (!note) {
      location.assign("/index.html");
    }
    titleElement.value = note.title;
    bodyElement.value = note.body;
  }
});
