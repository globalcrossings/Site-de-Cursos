import { carregarCursos, abrirCurso } from "./js/curso.js";

document.addEventListener("DOMContentLoaded", () => {

    const idUrl = (new URLSearchParams(window.location.search)).get("id")

    if (document.getElementById("cursosContainer")) {

        carregarCursos();

        document.querySelectorAll("#abrirCursoModal").forEach(botao => {
            botao.addEventListener("click", (event) => {
                event.stopPropagation()
                const id = botao.getAttribute("data-id")
            })
        })
    }
    if ((window.location.href).includes("curso.html")) abrirCurso(idUrl)
});


// Modal Quiz
const abrirQuiz = document.getElementById("abrirQuiz");
if (abrirQuiz) {
    const modalQuiz = document.getElementById("modalQuiz");
    const fecharQuiz = document.getElementById("fecharQuiz");

    abrirQuiz.addEventListener("click", () => {
        modalQuiz.classList.add("ativo");
    });

    fecharQuiz.addEventListener("click", () => {
        modalQuiz.classList.remove("ativo");
    });
}

// Menu responsivo
const menuToggle = document.getElementById('menuToggle');
const navMenuList = document.getElementById('navMenuList');
menuToggle.addEventListener('click', () => {
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x-lg');
    navMenuList.classList.toggle('ativo');
});