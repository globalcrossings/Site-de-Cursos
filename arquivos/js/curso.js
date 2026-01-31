import { carregarHTML, carregarJSON } from "./util.js";

export async function carregarCursos() {

    const cursos = await carregarJSON("arquivos/cursos/cursos.json")
    const cursosContainer = document.getElementById("cursosContainer")

    cursos.forEach(curso => {
        cursosContainer.innerHTML += `
            <div class="curso-card" data-id="${curso.id}">
                <img src="arquivos/cursos/${curso.url}/imagens/${curso.imagem}" alt="Curso 1">
                <div class="curso-card-meta">
                    <h2>${curso.nome}</h2>
                    <p>${curso.descricao}</p>
                    <button id="abrirCursoModal" class="abrir-curso-modal" data-id="${curso.id}">Leia Mais / Read More</button>
                </div>
            </div>
        `
    });

    document.querySelectorAll(".curso-card").forEach(curso => {
        curso.addEventListener("click", () => {
            irParaCurso(curso.dataset.id)
        })
    })

    /* Listener específico no botão */
    document.querySelectorAll(".abrir-curso-modal").forEach(botao => {
        botao.addEventListener("click", (event) => {
            event.stopPropagation();
            abrirModal(botao.dataset.id);
        });
    });
}

function irParaCurso(id) {
    window.location.href = "curso.html?id=" + id
}

export async function abrirCurso(id) {

    let cursos = await carregarJSON("arquivos/cursos/cursos.json")
    const curso = cursos.find(curso => id == curso.id)
    const conteudo = document.getElementById("conteudoCurso")
    const producaoEsquerda = document.getElementById("producaoCursoEsquerda")
    const producaoDireita = document.getElementById("producaoCursoDireita")

    document.getElementById("titulo").innerHTML = curso.nome
    document.getElementById("dataCurso").innerHTML = curso.dataAlteracao
    document.getElementById("capaCurso").src = `arquivos/cursos/${curso.url}/imagens/${curso.imagem}`
    document.getElementById("producaoCurso").src = `arquivos/cursos/${curso.url}/imagens/${curso.imagem}`
    document.getElementById("formQuiz").src = curso.forms

    for (let i = 0; i < (curso.capitulos).length; i += 1) {
        let sessao = await carregarHTML(`${curso.url}/capitulos/${curso.capitulos[i].id} - ${curso.capitulos[i].nome}`)
        conteudo.innerHTML += sessao.activeElement.innerHTML
    }
    getTitulos(curso.nome)

    for (let i = 0; i < curso.ficha.length; i += 1) {

        let produtorAtual = (curso.ficha[i].link == "") ?
            `<p>${curso.ficha[i].nome} - ${curso.ficha[i].titulo}</p>` :
            `<p>${curso.ficha[i].nome} - ${curso.ficha[i].titulo}&nbsp;<a href="${curso.ficha[i].link}" target="_blank" rel="noopener">[site]</a></p>`;

        (i % 2 == 0) ? producaoEsquerda.innerHTML += produtorAtual : producaoDireita.innerHTML += produtorAtual
    }
}

function getTitulos(titulo) {

    // Variáveis
    const main = document.querySelector(".curso-main");
    const toc = document.getElementById("toc");
    const toggle = document.getElementById("toc-toggle");

    // Coloca o nome do curso no menu
    document.getElementById("navegadorNome").innerHTML = titulo

    // Abrir o menu ao clicar
    toggle.addEventListener("click", () => {
        const navegador = document.querySelector(".navegador-curso");
        navegador.classList.toggle("open");
        document.querySelector(".curso-nav-menu").classList.toggle("mobile");
    });

    // Listar H1 e H2
    const headings = main.querySelectorAll("h2, h3");
    const tocList = document.createElement("ul");

    headings.forEach((h, i) => {

        const id = h.id || `sec-${i}`;
        h.id = id;

        const li = document.createElement("li");
        li.classList.add(h.tagName.toLowerCase());

        const a = document.createElement("a");
        a.href = `#${id}`;
        a.textContent = h.textContent;

        li.appendChild(a);
        tocList.appendChild(li);
    });

    toc.appendChild(tocList);

    // Scroll suave
    toc.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            document
                .querySelector(a.getAttribute("href"))
                .scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });

    // Scroll-spy: ativar item quando entra na viewport
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const link = toc.querySelector(`a[href="#${id}"]`);

                    toc.querySelectorAll("li").forEach(li => li.classList.remove("active"));
                    if (link) link.parentElement.classList.add("active");
                }
            });
        },
        { threshold: 0.4 }
    );

    headings.forEach(h => observer.observe(h));
}

export async function abrirModal(id) {

    const cursos = await carregarJSON("arquivos/cursos/cursos.json")
    const close = document.querySelector(".curso-modal-fechar")
    const curso = cursos.find(curso => id == curso.id)
    const texto = (await carregarHTML(`${curso.url}/descricao`)).body.innerHTML;

    document.body.style.overflow = "hidden";
    document.getElementById("cursoModalTitulo").innerHTML = curso.nome;
    document.getElementById("cursoModalTexto").innerHTML = texto;

    cursoModal.classList.add("ativo");

    // Fechar com o botão
    close.addEventListener("click", () => {
        cursoModal.classList.remove("ativo");
        document.body.style.overflow = "auto";
    });

    // Fechar clicando fora do modal
    document.addEventListener("click", (event) => {
        if (event.target === cursoModal)
            cursoModal.classList.remove("ativo");
        document.body.style.overflow = "auto";
    });

    // Fechar com ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape")
            cursoModal.classList.remove("ativo");
        document.body.style.overflow = "auto";
    });
}