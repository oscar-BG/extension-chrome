const saveNoteBtn = document.getElementById('save-note-btn');
const clearNoteBtn = document.getElementById('clear-note-btn');
const noteList = document.getElementById('note-list');

// Guarda la nota ingresada por el usuario
saveNoteBtn.addEventListener('click', () => {
  const noteInput     = document.getElementById('note-input');
  const categoryInput = document.getElementById('category-input');

  const note = noteInput.value.trim();
  const category = categoryInput.value.trim();
  
  if (note !== '') {
    chrome.storage.local.set({category: category, note: note}, function() {
      const li = document.createElement('li');
      li.innerText = `${category}: ${note}`;
      noteList.appendChild(li);
      noteInput.value = '';
      categoryInput.value = '';
    });
  }
});

// Carga las notas guardadas al cargar la página popup
// chrome.storage.local.get('category', 'note', (result) => {
//   const notes = result.notes || [];
//   notes.forEach((note) => {
//     // console.log(note);
//     const li = document.createElement('li');
//     li.innerText = `${note.category} : ${note.note}`;
//     noteList.appendChild(li);
//   });
// });

chrome.storage.local.get(['category', 'note'], function (result){
  const notes = result  || [];
  
  Object.keys(notes).forEach(key => {
    const li = document.createElement('li');
    li.innerText = `${notes.category}: ${notes.note}`;
    noteList.appendChild(li);
  });
});

// Vaciar datos del chrome storage
clearNoteBtn.addEventListener('click', () => {
  chrome.storage.local.clear(function() {
    alert("Todas las notas han sido borradas")
  })
});



// function guardarNota(categoria, nota) {
//   chrome.storage.sync.set({categoria: categoria, nota: nota}, function() {
//     console.log('Datos guardados');
//   });
// }