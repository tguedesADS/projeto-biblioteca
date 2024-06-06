document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#formulario");
    const nomeLivro = document.querySelector("#input-livro");
    const nomeAutor = document.querySelector("#input-autor");
    const dataLivro = document.querySelector("#input-data");
    const pesquisaLivro = document.querySelector("#search")
    const notaLivro = document.querySelector("#input-nota");
    const generoLivro = document.querySelector("#input-genero");
    const cartaoLivro = document.querySelector("#cards");
  
  
    function criarCartao(e) {
      e.preventDefault();
  
      const livroCriado = {
        nomeLivro: nomeLivro.value,
        nomeAutor: nomeAutor.value,
        dataLivro: dataLivro.value,
        notaLivro: notaLivro.value,
        generoLivro: generoLivro.value,
      };
  
      const lista = JSON.parse(localStorage.getItem("listaLivros")) || [];
  
      lista.push(livroCriado);
  
      localStorage.setItem("listaLivros", JSON.stringify(lista));
      document.location.pathname = '/page-livros.html';
  
    }
  
    function carregarPagina(lista) {
      const cartaoLivro = document.querySelector("#cards");
      cartaoLivro.innerHTML = "";
      lista.forEach((livro) => {
        const novo_livro = `
            <div class="card-livro">
              <h4 class="nome-livro" id="nome-livro">${livro.nomeLivro}</h4>
              <span class="nome-autor" id="nome-autor">${livro.nomeAutor}</span>
              <p class="ano-livro">Publicado em: <span id="ano-livro">${livro.dataLivro}</span></p>
              <p class="nota-livro">Avaliação: <span id="nota">${livro.notaLivro}</span>/10</p>
              <div class="genero-livro">
                <span id="genero">${livro.generoLivro}</span>  
                <span class="remover" id="remover"><i class='bx bx-x-circle'></i> Excluir</span>
              </div>
            </div>
          `;
  
        cartaoLivro?.insertAdjacentHTML("beforeend", novo_livro);
      });
    }
  
    function searchLivros(event) {
      const searchLivro = pesquisaLivro.value.trim().toLowerCase();
      const lista = JSON.parse(localStorage.getItem("listaLivros")) || [];
      const filtroLivros = lista.filter(livro => {
        return livro.nomeLivro.toLowerCase().includes(searchLivro) ||
          livro.nomeAutor.toLowerCase().includes(searchLivro) ||
          livro.generoLivro.toLowerCase().includes(searchLivro);
      });
      carregarPagina(filtroLivros);
    }
  
    function removerLivro(event) {
      const cardLivro = event.target.closest('.card-livro')
      const lista = JSON.parse(localStorage.getItem("listaLivros")) || [];
      const index = lista.findIndex(livro => livro.nomeLivro === cardLivro.querySelector('.nome-livro').textContent);
      if (index !== -1) {
        lista.splice(index, 1);
        carregarPagina(lista);
        localStorage.setItem("listaLivros", JSON.stringify(lista));
      }
    }
  
    formulario?.addEventListener("submit", criarCartao);
  
    pesquisaLivro?.addEventListener("input", searchLivros)
  
    cartaoLivro.addEventListener("click", event => {
      if (event.target.classList.contains('remover')) {
        removerLivro(event);
      }
    });
  
    const lista = JSON.parse(localStorage.getItem("listaLivros")) || [];
    carregarPagina(lista);
  })
