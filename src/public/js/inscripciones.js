let selIzq = null;
let selDer = null;
let inscritas = []; // { id, asignatura, nombre, creditos, semestre, optativa }

// ── Set de claves de asignatura ya inscritas ──
function asignaturasInscritas() {
  return new Set(inscritas.map(m => m.asignatura));
}

// ── Aplica/quita .bloqueada según asignaturas inscritas ──
function actualizarBloqueos() {
  const inscritas_set = asignaturasInscritas();

  document.querySelectorAll('#lista-disponibles .materia-item').forEach(el => {
    if (el.style.display === 'none') return;

    if (inscritas_set.has(el.dataset.asignatura)) {
      el.classList.add('bloqueada');
      el.classList.remove('active');
    } else {
      el.classList.remove('bloqueada');
    }
  });

  // Si la selección activa quedó bloqueada, limpiarla
  if (selIzq) {
    const elSel = document.querySelector(
      '#lista-disponibles .materia-item[data-id="' + selIzq + '"]'
    );
    if (elSel && elSel.classList.contains('bloqueada')) {
      selIzq = null;
    }
  }
}

// ── Selección en columna izquierda ──
function seleccionarDisponible(el) {
  if (el.classList.contains('bloqueada')) return;

  document.querySelectorAll('#lista-disponibles .materia-item')
    .forEach(i => i.classList.remove('active'));

  selIzq = selIzq === el.dataset.id ? null : el.dataset.id;
  if (selIzq) el.classList.add('active');

  selDer = null;
  document.querySelectorAll('#lista-inscritas .inscrita-item')
    .forEach(i => i.classList.remove('active-right'));

  actualizarBotones();
}

// ── Selección en columna derecha ──
function seleccionarInscrita(el) {
  document.querySelectorAll('#lista-inscritas .inscrita-item')
    .forEach(i => i.classList.remove('active-right'));

  selDer = selDer === el.dataset.id ? null : el.dataset.id;
  if (selDer) el.classList.add('active-right');

  selIzq = null;
  document.querySelectorAll('#lista-disponibles .materia-item')
    .forEach(i => i.classList.remove('active'));

  actualizarBotones();
}

// ── Mover materia de izquierda a derecha ──
function inscribirMateria() {
  if (!selIzq) return;
  const el = document.querySelector(
    '#lista-disponibles .materia-item[data-id="' + selIzq + '"]'
  );
  if (!el || el.classList.contains('bloqueada')) return;

  inscritas.push({
    id:         el.dataset.id,
    asignatura: el.dataset.asignatura,
    nombre:     el.dataset.nombre,
    creditos:   parseInt(el.dataset.creditos) || 0,
    semestre:   el.dataset.semestre,
    optativa:   el.dataset.optativa === 'true'
  });

  el.style.display = 'none';
  selIzq = null;

  actualizarBloqueos();
  actualizarBotones();
  renderInscritas();
}

// ── Devolver materia de derecha a izquierda ──
function darBaja() {
  if (!selDer) return;

  inscritas = inscritas.filter(x => x.id !== selDer);

  const elOrig = document.querySelector(
    '#lista-disponibles .materia-item[data-id="' + selDer + '"]'
  );
  if (elOrig) elOrig.style.display = '';

  selDer = null;

  actualizarBloqueos();
  actualizarBotones();
  renderInscritas();
}

// ── Renderizar lista derecha ──
function renderInscritas() {
  const lista = document.getElementById('lista-inscritas');
  const hint  = document.getElementById('hint-vacio');

  lista.querySelectorAll('.inscrita-item').forEach(i => i.remove());

  if (inscritas.length === 0) {
    hint.style.display = '';
  } else {
    hint.style.display = 'none';

    inscritas.forEach(m => {
      const div = document.createElement('div');
      div.className  = 'inscrita-item';
      div.dataset.id = m.id;
      div.setAttribute('onclick', 'seleccionarInscrita(this)');
      div.innerHTML =
        '<div>' +
          '<div class="materia-nombre">' + m.nombre + '</div>' +
          '<div class="materia-meta">' +
            (m.optativa
              ? '<span class="badge-optativa">Optativa</span>'
              : '<span class="badge-obligatoria">Obligatoria</span>') +
          '</div>' +
        '</div>' +
        '<span class="badge-cr">' + m.creditos + ' cr.</span>';
      lista.appendChild(div);
    });
  }

  // Actualizar contadores y totales
  const total = inscritas.reduce((s, m) => s + m.creditos, 0);

  document.getElementById('total-creditos').textContent  = total;
  document.getElementById('count-inscritas').textContent =
    inscritas.length + ' materia' + (inscritas.length !== 1 ? 's' : '') +
    ' · ' + total + ' créditos';

  const disponibles = document.querySelectorAll(
    '#lista-disponibles .materia-item:not([style*="display: none"]):not(.bloqueada)'
  ).length;
  document.getElementById('count-disponibles').textContent =
    disponibles + ' materia' + (disponibles !== 1 ? 's' : '');

  document.getElementById('btn-submit').disabled = inscritas.length === 0;
}

// ── Habilitar/deshabilitar botones de acción ──
function actualizarBotones() {
  document.getElementById('btn-inscribir').disabled = !selIzq;
  document.getElementById('btn-baja').disabled      = !selDer;
}

function prepararEnvio() {

  // Obtener materias inscritas CORRECTAMENTE
  const materias =
    document.querySelectorAll("#lista-inscritas .inscrita-item");

  // Sacar IDs
  const ids =
    Array.from(materias).map(m => m.dataset.id);

  // Guardar IDs en hidden input
  document.getElementById("clases_inscritas").value =
    ids.join(",");

  console.log("IDs enviados:", ids);
}

// ── Inicializar contador al cargar la página ──
(function init() {
  const total = document.querySelectorAll('#lista-disponibles .materia-item').length;
  document.getElementById('count-disponibles').textContent =
    total + ' materia' + (total !== 1 ? 's' : '');
})();