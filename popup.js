const saveNoteBtn = document.getElementById('save-note-btn');
const clearNoteBtn = document.getElementById('clear-note-btn');
const noteList = document.getElementById('note-list');

// Guarda la nota ingresada por el usuario
saveNoteBtn.addEventListener('click', () => {
    const noteInput = document.getElementById('note-input');
    const note = noteInput.value.trim();
    if (note !== '') {
      chrome.storage.local.get('notes', (result) => {
        const notes = result.notes || [];
        notes.push(note);
        chrome.storage.local.set({notes: notes}, () => {
          const li = document.createElement('li');
          li.innerText = note;
          noteList.appendChild(li);
          noteInput.value = '';
        });
      });
    }
});

// Carga las notas guardadas al cargar la página popup
chrome.storage.local.get('notes', (result) => {
  const notes = result.notes || [];
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.innerText = note;
    noteList.appendChild(li);
  });
});

clearNoteBtn.addEventListener('click', () => {
    chrome.storage.local.clear(function() {
        alert("Todas las notas han sido borradas")
    })
});


