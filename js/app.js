//Inicio Js

let progresso = JSON.parse(localStorage.getItem("apj")) || Array(etapas.length).fill(0);
let atual = progresso.findIndex(p => p < 100);
if (atual === -1) atual = 0;

const sidebar = document.getElementById("sidebar");
const section = document.getElementById("section");
const content = document.getElementById("content");

/* SIDEBAR */
function renderSidebar() {
  const jornadaContent = document.getElementById("jornada-content");
  const linksContent = document.getElementById("links-content");

  if (!jornadaContent || !linksContent) return;

  jornadaContent.className = "sidebar-content";
  linksContent.className = "sidebar-content";

  jornadaContent.innerHTML = "";
  linksContent.innerHTML = "";

  /* ETAPAS DA JORNADA */
  etapas.forEach((etapa, i) => {

    let percentualTexto = "";

    /* só mostra % na etapa checklist */
  if (etapa.tipo === "checklist_acessos") {
      percentualTexto = `
        <span class="check-percent">
          ${getPercentualChecklist()}%
        </span>
      `;
    }

    jornadaContent.innerHTML += `
      <div class="step ${i === atual ? "active" : ""}"
           onclick="goToStep(${i})">

        <div class="step-top">
          <span>${i + 1}. ${etapa.titulo}</span>
          ${percentualTexto}
        </div>

        <!-- barra continua usando scroll -->
        <div class="progress-bar">
          <div class="progress-fill"
               style="width:${progresso[i]}%">
          </div>
        </div>

      </div>
    `;
  });

  /* LINKS ÚTEIS */
  linksUteis.forEach(link => {
    if (!link.nome.trim()) return;

    linksContent.innerHTML += `
      <div class="sidebar-link"
           onclick="openLink('${link.url}')">
        ${link.nome}
      </div>
    `;
  });
}
/* Fim SIDEBAR */

/* INICIO Percentual Checklist */
function getPercentualChecklist() {
  const checkedItems =
    JSON.parse(localStorage.getItem("checklist_acessos")) || [];

  let total = 0;

  etapas.forEach(etapa => {
    if (etapa.tipo === "checklist_acessos") {
      etapa.plataformas.forEach(p => {
        total += p.itens.length;
      });
    }
  });

  if (total === 0) return 0;

  return Math.round((checkedItems.length / total) * 100);
}
/* FIM Percentual Checklist */

function toggleSection(section) {
  const content = document.getElementById(`${section}-content`);
  const arrow = document.getElementById(`arrow-${section}`);

  if (!content || !arrow) return;

  content.classList.toggle("collapsed");

  arrow.textContent = content.classList.contains("collapsed") ? "▶" : "▼";
}

function openLink(url) {
  window.open(url, "_blank", "noopener noreferrer");
}

function goToStep(index) {
  atual = index;
  save();
  loadSection();
}

/* JOURNEY */
function startJourney() {
  // Abre a Jornada APJ
  const jornada = document.getElementById("jornada-content");
  const arrow = document.getElementById("arrow-jornada");

  jornada.classList.remove("collapsed");
  arrow.textContent = "▼";

  // Vai para a primeira etapa pendente
  window.location.href = "etapa.html";
}
/* HELP */
function Help() {
  window.location.href = "help.html";
}

/* ABOUT */
function About() {
  window.location.href = "about.html";
}

/* HOME */
function goHome() {
  window.location.href = "index.html";
}

/* ETAPAS */
function loadSection() {
  if (!section) return;

  renderSidebar();

  section.innerHTML = `<h1>${etapas[atual].titulo}</h1>`;

  if (etapas[atual].tipo === "checklist_acessos" || etapas[atual].tipo === "checklist_geral") {
    renderAcessos(etapas[atual]);
    verificarConclusaoChecklist();
    return;
  }

  etapas[atual].cards.forEach(card => {
    // 🔥 Se o card for checklist
    if (card.tipo === "checklist_geral") {
      renderChecklistCard(card);
      return;
    }

    section.innerHTML += `
    <div class="card card-artigo">

      <h3>${card.titulo}</h3>

      ${card.secoes
        ? card.secoes.map(secao => `
              <div class="card-section">
                ${secao.subtitulo ? `<h4>${secao.subtitulo}</h4>` : ""}
                ${secao.descricao ? `<p>${secao.descricao}</p>` : ""}

                ${secao.topicos
            ? `
                      <ul>
                        ${secao.topicos.map(topico => `<li>${topico}</li>`).join("")}
                      </ul>
                    `
            : ""
          }
              </div>
            `).join("")
        : `
            ${card.descricao ? `<p>${card.descricao}</p>` : ""}
            ${card.topicos
          ? `
                  <ul>
                    ${card.topicos.map(topico => `<li>${topico}</li>`).join("")}
                  </ul>
                `
          : ""
        }
          `
      }

      <div class="card-actions">
        ${card.imagem
        ? `
              <button class="toggle-img" onclick="toggleImagem(this)">
                📷 Ilustração <span class="arrow">▼</span>
              </button>
            `
        : ""
      }

      ${card.dica
        ? `<span class="dica-btn" onclick="toggleDica(this)">💡 Dica</span>`
        : ""
      }
      </div>
      ${card.imagem
        ? `
            <div class="imagem-container">
              <img src="${card.imagem}" alt="Ilustração do conteúdo">
            </div>
          `
        : ""
      }
      ${card.dica
        ? `
            <div class="dica-container">
              ${card.dica}
            </div>
          `
        : ""
      }
    </div>
  `;
  });

  section.innerHTML += `
    <div class="actions">
      <button class="back" onclick="back()">⬅ Voltar</button>
      <button class="finish" onclick="finish()">Concluir Etapa</button>
    </div>`;

  content.scrollTop = 0;
  verificarConclusaoChecklist();
}

if (section) loadSection();

/* SCROLL PROGRESS */
content?.addEventListener("scroll", () => {
  const max = content.scrollHeight - content.clientHeight;
  const percent = Math.min(100, Math.round((content.scrollTop / max) * 100));
  progresso[atual] = percent;
  save();
  renderSidebar();
});

function renderAcessos(etapa) {
  section.innerHTML = `<h1>${etapa.titulo}</h1>`;

  /* CARD INTRODUÇÃO */
  if (etapa.intro) {
    section.innerHTML += `
      <div class="card card-artigo">
        <h3>${etapa.intro.titulo}</h3>
        <p>${etapa.intro.descricao}</p>

        <ul>
          ${etapa.intro.topicos.map(t => `<li>${t}</li>`).join("")}
        </ul>

        <div class="dica-container" style="display:block;">
          ${etapa.intro.dica}
        </div>
      </div>
    `;
  }

  /* CARDS DAS PLATAFORMAS */
  etapa.plataformas.forEach(card => {

    let itensHTML = card.itens.map(item => {

      /* COPYBOX */
      if (card.tipo === "copybox") {
        return `
          <li>
            <label style="cursor:pointer;">
              <input type="checkbox"
                ${isChecked(item.id) ? "checked" : ""}
                onchange="toggleAccess('${item.id}')">

              ${item.nome}
            </label>

            <div class="copybox-item">
              <div class="copybox-content">
                <input
                  type="text"
                  value="${item.texto || ''}"
                  readonly
                  id="copy-${item.id}"
                  class="copybox-input"
                >

                <button
                  class="copybox-button"
                  onclick="copiarTexto('${item.id}', this)">
                  📋 Copiar
                </button>
              </div>
            </div>
          </li>
        `;
      }

      /* LINK NORMAL */
      return `
        <li>
          <label style="cursor:pointer;">
            <input type="checkbox"
              ${isChecked(item.id) ? "checked" : ""}
              onchange="toggleAccess('${item.id}')">

            <a href="${item.link || '#'}"
               target="_blank"
               class="access-link">
              ${item.nome}
            </a>
          </label>

          ${item.imagem ? `
            <div class="checklist-img" style="display:none;">
              <img src="${item.imagem}" style="max-width:100%; border-radius:8px;">
            </div>
          ` : ""}
        </li>
      `;
    }).join("");

    section.innerHTML += `
      <div class="card">
        <h3>${card.nome}</h3>

        <ul>
          ${itensHTML}
        </ul>

        <div class="card-actions">

          ${card.imagem ? `
            <button class="toggle-img" onclick="toggleImagem(this)">
              📷 Ilustração <span class="arrow">▼</span>
            </button>
          ` : ""}

          ${card.dica ? `
            <span class="dica-btn" onclick="toggleDica(this)">
              💡 Dica
            </span>
          ` : ""}

        </div>

        ${card.imagem ? `
          <div class="imagem-container" style="display:none;">
            <img src="${card.imagem}" alt="Ilustração do conteúdo">
          </div>
        ` : ""}

        ${card.dica ? `
          <div class="dica-container" style="display:block;">
            ${card.dica}
          </div>
        ` : ""}

      </div>
    `;
  });

  section.innerHTML += `
    <div class="actions">
      <button class="back" onclick="back()">⬅ Voltar</button>
      <button class="finish" onclick="finish()">Concluir Etapa</button>
    </div>
  `;
}

/*  Inicio Checklist sem Link*/
function abrirImagemChecklist(src) {
  if (!src) return;

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.8)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";

  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  img.style.borderRadius = "8px";

  modal.appendChild(img);
  modal.onclick = () => modal.remove();

  document.body.appendChild(modal);
}

function renderChecklistCard(card) {

  let html = `
    <div class="card card-artigo">
      <h3>${card.titulo}</h3>
      ${card.descricao ? `<p>${card.descricao}</p>` : ""}
  `;

  card.plataformas.forEach(plataforma => {

    html += `
      <div class="card-section">
        <h4>${plataforma.nome}</h4>
        <ul>
          ${plataforma.itens.map(item => `
            <li>
              <label style="display:flex; align-items:center; gap:8px;">
                <input type="checkbox"
                       ${isChecked(item.id) ? "checked" : ""}
                       onchange="toggleAccess('${item.id}')">
                <span 
                  ${item.imagem ? `onclick="abrirImagemChecklist('${item.imagem}')"` : ""}
                  style="cursor:${item.imagem ? 'pointer' : 'default'};">
                  ${item.nome}
                </span>
              </label>
            </li>
          `).join("")}
        </ul>
      </div>
      <div style="margin-top:20px;">
    <button onclick="resetarChecklist()" 
      style="
        padding:10px 15px;
        border:none;
        background:#dc3545;
        color:white;
        border-radius:6px;
        cursor:pointer;
      ">
      🔁 Resetar Checklist
    </button>
  </div>
    `;
  });

  html += `
    </div>
  `;

  section.innerHTML += html;
  verificarConclusaoChecklist();

}

const modal = document.getElementById("modal-img");
const modalImg = document.getElementById("img-expandida");
const fechar = document.querySelector(".fechar");

// pega TODAS imagens dentro dos cards
document.addEventListener("click", function (e) {
  if (e.target.matches(".card img")) {
    modal.style.display = "block";
    modalImg.src = e.target.src;
  }
});

// fechar ao clicar no X
if (fechar) fechar.onclick = function () {
  modal.style.display = "none";
};

// fechar clicando fora da imagem
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

/* Inicio Mensagem Checklist */
function verificarConclusaoChecklist() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  const marcados = Array.from(checkboxes).filter(cb => cb.checked).length;

  let mensagem = document.getElementById("mensagem-conclusao");

  if (marcados === total && total > 0) {
    if (!mensagem) {
      const div = document.createElement("div");
      div.id = "mensagem-conclusao";
      div.style.marginTop = "20px";
      div.style.padding = "15px";
      div.style.background = "#d4edda";
      div.style.color = "#155724";
      div.style.borderRadius = "8px";
      div.style.fontWeight = "bold";
      div.innerHTML = "🎉 Parabéns, você concluiu o seu chamado!";

      const container = document.querySelector(".card-artigo:last-child");
      container.appendChild(div);
    }
  } else {
    if (mensagem) mensagem.remove();
  }
}
/* Fim Mensagem Checklist */

function getStorageChecklist() {
  if (etapas[atual].tipo === "checklist_acessos") {
    return "checklist_acessos";
  }
  return "checklist_geral";
}

/* Inicio Botão Reset*/
function resetarChecklist() {
  localStorage.removeItem("checklist_acessos");
  localStorage.removeItem("checklist_geral");

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);

  const mensagem = document.getElementById("mensagem-conclusao");
  if (mensagem) mensagem.remove();

  renderSidebar();
}
/* Fim Botão Reset */
/*  Fim Checklist sem Link*/

function isChecked(id) {
  const storage = getStorageChecklist();
  const checks = JSON.parse(localStorage.getItem(storage)) || [];
  return checks.includes(id);
}

function toggleAccess(id) {
  const storage = getStorageChecklist();

  let checkedItems = JSON.parse(localStorage.getItem(storage)) || [];

  if (checkedItems.includes(id)) {
    checkedItems = checkedItems.filter(item => item !== id);
  } else {
    checkedItems.push(id);
  }

  localStorage.setItem(storage, JSON.stringify(checkedItems));

  verificarConclusaoChecklist();

  if (storage === "checklist_acessos") {
    renderSidebar();
  }
}

function finish() {
  progresso[atual] = 100;
  save();
  if (atual < etapas.length - 1) {
    atual++;
    loadSection();
  } else {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease forwards;
    `;

    overlay.innerHTML = `
      <div style="
        background: #fff;
        border-radius: 20px;
        padding: 48px 56px;
        text-align: center;
        max-width: 420px;
        width: 90%;
        animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
      ">
        <div style="font-size: 56px; margin-bottom: 16px;">🎉</div>
        <div style="font-size: 22px; font-weight: 700; color: #1f2937; margin-bottom: 8px;">
          Jornada Concluída!
        </div>
        <div style="font-size: 15px; color: #6b7280; line-height: 1.6;">
          Parabéns! Você completou todas as etapas da jornada APJ.
        </div>
        <div style="
          margin-top: 28px;
          background: #f0fdf4;
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 14px;
          color: #16a34a;
          font-weight: 600;
        ">
          ✅ Progresso salvo com sucesso
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
      @keyframes popIn  { from { transform: scale(0.8); opacity:0 } to { transform: scale(1); opacity:1 } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "0";
      setTimeout(() => { overlay.remove(); goHome(); }, 400);
    }, 3000);
  }
}

function back() {
  save();
  if (atual > 0) {
    atual--;
    loadSection();
  }
}

function save() {
  localStorage.setItem("apj", JSON.stringify(progresso));
}

function toggleSidebar() {
  sidebar.classList.toggle("hidden");
}

/* INICIO Botão Reset */
const DEV_MODE = true; // Colocar false em prod

if (DEV_MODE) {
  document.getElementById("dev-reset").addEventListener("click", () => {
    const confirmReset = confirm(
      "⚠️ Resetar TODO o progresso?\n\nIsso irá limpar:\n- Etapas\n- Checklists\n- Porcentagens\n\n(Apenas para Dev)"
    );

    if (confirmReset) {
      localStorage.clear();
      location.reload();
    }
  });
} else {
  document.getElementById("dev-reset").style.display = "none";
}
/* Fim Botão Reset */

/* INICIO IMAGEM */
function toggleImagem(btn) {
  const card = btn.closest('.card'); 
  if (!card) return;

  const imagem = card.querySelector('.imagem-container');
  if (!imagem) return;

  const arrow = btn.querySelector('.arrow');

  const isOpen = imagem.style.display === 'block';

  imagem.style.display = isOpen ? 'none' : 'block';

  if (arrow) {
    arrow.textContent = isOpen ? '▼' : '▲';
  }
}
/* FIM IMAGEM */

/* INICIO DICA */
function toggleDica(el) {
  const card = el.closest('.card'); 
  if (!card) return;

  const dica = card.querySelector('.dica-container');
  if (!dica) return;

  dica.style.display =
    dica.style.display === 'none' ? 'block' : 'none';
}
/* FIM DICA */

function toggleChecklistImage(id) {
  const img = document.getElementById("img-" + id);
  if (!img) return;
  img.style.display = img.style.display === "block" ? "none" : "block";
}

/* INICIO BOTÃO COPIAR TEXTO*/
function copiarTexto(id, btn) {
  const input = document.getElementById("copy-" + id);

  navigator.clipboard.writeText(input.value).then(() => {
    btn.textContent = "✔ Copiado";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = "📋 Copiar";
      btn.classList.remove("copied");
    }, 2000);
  });
}
/* FIM BOTÃO COPIAR TEXTO*/

/* INICIO DARK MODE */
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("darkToggle");

  localStorage.setItem("darkMode", isDark ? "on" : "off");

  if (btn) {
    btn.textContent = isDark ? "☀️" : "🌙";
  }
}
/* FIM DARK MODE */

document.addEventListener("DOMContentLoaded", () => {
  // Colapsa sidebar
  const jornada = document.getElementById("jornada-content");
  const arrow = document.getElementById("arrow-jornada");
  if (jornada) {
    jornada.classList.add("collapsed");
    arrow.textContent = "▶";
  }

  // Dark mode
  const darkMode = localStorage.getItem("darkMode");
  const btn = document.getElementById("darkToggle");
  if (darkMode === "on") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "☀️";
  }
});


renderSidebar();
