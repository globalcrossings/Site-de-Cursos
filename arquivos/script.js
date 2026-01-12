import { carregarCursos, abrirCurso } from "./js/curso.js";

document.addEventListener("DOMContentLoaded", () => {

    const idUrl = (new URLSearchParams(window.location.search)).get("id")

    if (document.getElementById("cursosContainer")) {

        carregarCursos()

        document.querySelectorAll("#abrirCursoModal").forEach(botao => {
            botao.addEventListener("click", (event) => {
                event.stopPropagation()
                const id = botao.getAttribute("data-id")
                //abrirCurso(id)
                console.log("Clicou no botão do curso " + id)
            })
        })
    }
    if ((window.location.href).includes("curso.html")) abrirCurso(idUrl)
});