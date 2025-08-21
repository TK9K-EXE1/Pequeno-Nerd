// Utilidades simples para a landing page
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Ano no rodapé
  $('#year').textContent = new Date().getFullYear();

  // Toggle do menu mobile
  const btn = $('.nav-toggle');
  const nav = $('#siteNav');
  btn?.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
  // Esconde menu ao clicar num link (mobile)
  $$('#siteNav a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth < 860) nav.classList.add('hidden');
  }));

  // Navegação suave
  $$("a[href^='#']").forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const el = $(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Newsletter fake (validação simples)
  const form = $('#newsletter');
  const email = $('#email');
  const msg = document.createElement('div');
  msg.className = 'form-msg muted';
  form?.appendChild(msg);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = String(email.value || '').trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (!ok){
      msg.textContent = 'Ops! Digite um e-mail válido.';
      msg.style.color = '#fca5a5';
      email.focus();
      return;
    }
    msg.textContent = 'Tudo certo! Você entrou na lista. 👾';
    msg.style.color = '#bef264';
    form.reset();
  });
})();

// ===== Painel de Posts (APENAS alterações pedidas) =====
const form = document.getElementById("postForm");
const preview = document.getElementById("preview");
const posts = document.getElementById("posts");

const temaInput = document.getElementById("tema");
const textoInput = document.getElementById("texto");
const arquivoInput = document.getElementById("arquivo");

const previewTema = document.getElementById("previewTema");
const previewTexto = document.getElementById("previewTexto");
const previewImagens = document.getElementById("previewImagens");

let previewFiles = [];

// Pré-visualização AUTOMÁTICA (substitui o botão removido)
function atualizarPreview() {
  previewTema.textContent = temaInput.value;
  previewTexto.textContent = textoInput.value;
  previewImagens.innerHTML = "";

  previewFiles = Array.from(arquivoInput.files);
  previewFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      previewImagens.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  if (temaInput.value || textoInput.value || previewFiles.length > 0) {
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
}

// Eventos que acionam a prévia automática
temaInput.addEventListener("input", atualizarPreview);
textoInput.addEventListener("input", atualizarPreview);
arquivoInput.addEventListener("change", atualizarPreview);

// Publicar (com botão Excluir)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const post = document.createElement("div");
  post.className = "post";

  // Cabeçalho com título + botão excluir (texto "Excluir" como no seu CSS)
  const header = document.createElement("div");
  header.className = "post-header";

  const h3 = document.createElement("h3");
  h3.textContent = temaInput.value;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Excluir";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", () => post.remove());

  header.appendChild(h3);
  header.appendChild(delBtn);

  const text = document.createElement("p");
  text.textContent = textoInput.value;

  const imgsContainer = document.createElement("div");
  imgsContainer.className = "preview-imgs";

  // Reutiliza os arquivos da prévia
  previewFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      imgsContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  post.appendChild(header);
  post.appendChild(text);
  post.appendChild(imgsContainer);

  posts.prepend(post); // adiciona no topo
  form.reset();
  previewFiles = [];
  atualizarPreview(); // limpa a prévia
});

