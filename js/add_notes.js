const select_categorias = document.getElementById("select_categoria");

select_categorias.addEventListener("change", function() {
    const selectOption = this.options[this.selectedIndex];

    if (selectOption.value !== null || selectOption.value !== "") {
        document.getElementById("input_nueva_categoria").style.display = "block";
        document.getElementById("select_categoria").style.display = "none";
        // nuevaOption = 'caca';
        // const option = document.createElement("option");
        // option.text = nuevaOption;
        // option.value = nuevaOption;

        // this.appendChild(option);
        // this.value = nuevaOption;
    } else {
        this.selectedIndex = 0;
    }
    
})