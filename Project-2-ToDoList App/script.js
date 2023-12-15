const addButton = document.querySelector("#add");
const notesContainer = document.createElement("div");
notesContainer.classList.add("notes-container");
document.body.appendChild(notesContainer);

let notesInCurrentRow = 0;

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = Array.from(textAreaData).map((note) => note.value);

  localStorage.setItem("notes", JSON.stringify(notes));
};

const deleteNote = (deletedNote, container) => {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const updatedNotes = storedNotes.filter((note) => note !== deletedNote);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));

  // Remove the entire container
  container.remove();
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `<div class="operation">
            <button class="edit"><i class="fa-solid  fa-edit fa-pen-to-square fa-xl"></i></button>
            <button class="delete"><i class="fa-solid fa-trash fa-xl"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="textarea ${text ? "hidden" : ""}">${text}</textarea>
    </div> `;
  note.insertAdjacentHTML("afterbegin", htmlData);

  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector(".textarea");

  delButton.addEventListener("click", () => {
    const deletedNote = textArea.value;
    deleteNote(deletedNote, note);
    updateLSData();
  });

  textArea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", () => {
    const value = textArea.value;
    mainDiv.innerHTML = value;
    updateLSData();
  });

  notesContainer.appendChild(note);

  // Check if the maximum number of notes in a row is reached
  if (notesInCurrentRow === 4) {
    // Create a new row and reset the counter
    const noteRow = document.createElement("div");
    noteRow.classList.add("note-row");
    notesContainer.appendChild(noteRow);
    notesInCurrentRow = 0;
  }
  notesInCurrentRow++;
};

document.addEventListener("click", (event) => {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector(".textarea");
    if (!note.contains(event.target)) {
      mainDiv.classList.remove("hidden");
      textArea.classList.add("hidden");
    }
  });
});

// getting data back from local storage
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => {
  addNewNote();
});
