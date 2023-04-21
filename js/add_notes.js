let  txt_note = document.getElementById('input-note');
let inp_category= document.getElementById('input-category');
const lbl_caracteres_restantes = document.getElementById('caracteres-restantes');
const btn_save_note = document.getElementById('btn-save-note');
const max_length  = txt_note.maxLength;

document.addEventListener('DOMContentLoaded', function(){
    chrome.storage.local.get(null, function(result) {
        const categories = Object.values(result).map(note => note.category);

        const datalist_category = document.getElementById('datalist-category');
        const fragment = document.createDocumentFragment();

        categories.forEach(category => {
            let option = document.createElement("option");
            option.textContent = category;
            fragment.appendChild(option);
        });

        datalist_category.appendChild(fragment);
    });
});

txt_note.addEventListener('input', function() {
    const longitud_actual = txt_note.value.length;
    const caracteres_restantes_valor = max_length - longitud_actual;
    lbl_caracteres_restantes.textContent = caracteres_restantes_valor;
});

btn_save_note.addEventListener('click', () => {
    let date        = new Date();
    let year        = date.getFullYear();
    let month       = date.getMonth();
    let day         = date.getDate();
    let hours       = date.getHours();
    let minutes     = date.getMinutes();
    let seconds     = date.getSeconds();
    let id          = year.toString+month.toString+day.toString+hours.toString+minutes.toString+seconds.toString;

    let note = {
        'category'  : inp_category.value.trim(),
        'note'      : txt_note.value.trim(),
    }

    chrome.storage.local.set({[id]: note}, function() {
        inp_category.value = '';
        txt_note.value     = '';
    });
});

// const select_categorias = document.getElementById("select_categoria");

// select_categorias.addEventListener("change", function() {
//     const selectOption = this.options[this.selectedIndex];

//     if (selectOption.value !== null || selectOption.value !== "") {
//         document.getElementById("input_nueva_categoria").style.display = "block";
//         document.getElementById("select_categoria").style.display = "none";
//         // nuevaOption = 'caca';
//         // const option = document.createElement("option");
//         // option.text = nuevaOption;
//         // option.value = nuevaOption;

//         // this.appendChild(option);
//         // this.value = nuevaOption;
//     } else {
//         this.selectedIndex = 0;
//     }
    
// })