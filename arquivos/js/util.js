export async function carregarHTML(url) {
    const response = await fetch(`arquivos/cursos/${url}.html`);
    const html = await response.text();
    return new DOMParser().parseFromString(html, "text/html");
}

export async function carregarJSON(url) {
    const response = await fetch(url);
    return await response.json();
}