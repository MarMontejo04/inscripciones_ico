/* ─────────────────────────────────────────
   admin.js  –  CRUD completo para el panel
   de administración ICO.

   Cada tabla tiene:
     • columnas  → cabeceras de la tabla
     • campos    → campos del modal (nuevo / editar)
     • apiBase   → prefijo de la ruta REST
───────────────────────────────────────── */

// ── Configuración de tablas ────────────────────────────────────────────────

const TABLAS = {

  alumnos: {
    titulo: 'Alumnos',
    apiBase: '/admin/alumnos',
    columnas: ['#', 'Num. Cuenta', 'Nombre', 'Correo', 'Semestre', 'Acciones'],
    renderFila: (r) => [
      r.id_alumno,
      r.num_cuenta,
      `${r.nombre} ${r.ap_paterno} ${r.ap_materno}`,
      r.correo,
      badge(r.semestre, 'blue'),
    ],
    campos: [
      { id: 'num_cuenta',        label: 'Número de cuenta', type: 'number', req: true },
      { id: 'nombre',            label: 'Nombre',           type: 'text',   req: true },
      { id: 'ap_paterno',        label: 'Apellido paterno', type: 'text',   req: true },
      { id: 'ap_materno',        label: 'Apellido materno', type: 'text',   req: false },
      { id: 'correo',            label: 'Correo',           type: 'email',  req: true },
      { id: 'semestre',          label: 'Semestre',         type: 'number', req: false },
      { id: 'fecha_ingreso',     label: 'Fecha de ingreso', type: 'date',   req: false },
      { id: 'pregunta_secreta',  label: 'Pregunta secreta', type: 'text',   req: false },
    ],
  },

  profesores: {
    titulo: 'Profesores',
    apiBase: '/admin/profesores',
    columnas: ['#', 'Nombre', 'Correo', 'Acciones'],
    renderFila: (r) => [
      r.id_profesor,
      `${r.nombre} ${r.ap_paterno} ${r.ap_materno}`,
      r.correo,
    ],
    campos: [
      { id: 'nombre',     label: 'Nombre',           type: 'text',  req: true },
      { id: 'ap_paterno', label: 'Apellido paterno', type: 'text',  req: true },
      { id: 'ap_materno', label: 'Apellido materno', type: 'text',  req: false },
      { id: 'correo',     label: 'Correo',           type: 'email', req: true },
    ],
  },

  asignaturas: {
    titulo: 'Asignaturas',
    apiBase: '/admin/asignaturas',
    columnas: ['Clave', 'Nombre', 'Créditos', 'Semestre', 'Tipo', 'Área', 'Acciones'],
    renderFila: (r) => [
      r.clave,
      r.nombre_asignatura,
      r.creditos,
      r.semestre ? badge(r.semestre, 'blue') : '—',
      r.optativa ? badge('Optativa', 'amber') : badge('Obligatoria', 'green'),
      r.area?.nombre_area ?? r.id_area,
    ],
    campos: [
      { id: 'nombre_asignatura', label: 'Nombre',       type: 'text',     req: true },
      { id: 'creditos',          label: 'Créditos',     type: 'number',   req: true },
      { id: 'semestre',          label: 'Semestre',     type: 'number',   req: false },
      { id: 'id_area',           label: 'Área (ID)',    type: 'number',   req: true },
      { id: 'optativa',          label: 'Optativa',     type: 'checkbox', req: false },
      { id: 'laboratorio',       label: 'Laboratorio',  type: 'checkbox', req: false },
    ],
  },

  clases: {
    titulo: 'Clases',
    apiBase: '/admin/clases',
    columnas: ['#', 'Materia', 'Grupo', 'Día', 'Hora inicio', 'Hora final', 'Salón', 'Profesor', 'Acciones'],
    renderFila: (r) => [
      r.id_clase,
      r.asignatura?.nombre_asignatura ?? r.clave_materia,
      r.grupo,
      r.dia_semana,
      r.hora_inicio,
      r.hora_final,
      r.salon ?? '—',
      r.profesor ? `${r.profesor.nombre} ${r.profesor.ap_paterno}` : r.id_profesor,
    ],
    campos: [
      { id: 'clave_materia', label: 'Clave materia (ID)', type: 'number', req: true },
      { id: 'grupo',         label: 'Grupo (num)',        type: 'number', req: true },
      { id: 'id_profesor',   label: 'Profesor (ID)',      type: 'number', req: true },
      { id: 'salon',         label: 'Salón',              type: 'text',   req: false },
      { id: 'dia_semana',    label: 'Día de semana',      type: 'text',   req: true,  placeholder: 'Lunes, Martes...' },
      { id: 'hora_inicio',   label: 'Hora inicio',        type: 'time',   req: true },
      { id: 'hora_final',    label: 'Hora final',         type: 'time',   req: true },
    ],
  },

  grupos: {
    titulo: 'Grupos',
    apiBase: '/admin/grupos',
    columnas: ['Num. grupo', 'Acciones'],
    renderFila: (r) => [r.num_grupo],
    campos: [
      { id: 'num_grupo', label: 'Número de grupo', type: 'number', req: true },
    ],
  },

  areas: {
    titulo: 'Áreas',
    apiBase: '/admin/areas',
    columnas: ['#', 'Nombre del área', 'Acciones'],
    renderFila: (r) => [r.id_area, r.nombre_area],
    campos: [
      { id: 'nombre_area', label: 'Nombre del área', type: 'text', req: true },
    ],
  },

  inscripciones: {
    titulo: 'Inscripciones',
    apiBase: '/admin/inscripciones',
    columnas: ['#', 'Alumno', 'Clase', 'Semestre', 'Calificación', 'Estado', 'Fecha', 'Acciones'],
    renderFila: (r) => [
      r.id_inscripcion,
      r.alumno ? `${r.alumno.nombre} ${r.alumno.ap_paterno}` : r.id_alumno,
      r.id_clase,
      r.semestre_curso,
      r.calificacion != null ? r.calificacion : '—',
      r.inscrita ? badge('Activa', 'green') : badge('Baja', 'red'),
      r.fecha_inscripcion ?? '—',
    ],
    campos: [
      { id: 'id_alumno',      label: 'Alumno (ID)',      type: 'number', req: true },
      { id: 'id_clase',       label: 'Clase (ID)',       type: 'number', req: true },
      { id: 'semestre_curso', label: 'Semestre curso',   type: 'text',   req: true, placeholder: '2025-1' },
      { id: 'calificacion',   label: 'Calificación',     type: 'number', req: false },
      { id: 'inscrita',       label: 'Inscrita',         type: 'checkbox', req: false },
      { id: 'fecha_inscripcion', label: 'Fecha',         type: 'date',   req: false },
    ],
  },
};

// ── Estado global ──────────────────────────────────────────────────────────

let tablaActual   = 'alumnos';
let datos         = [];        // registros cargados
let datosFiltrados = [];       // después de búsqueda
let paginaActual  = 1;
const POR_PAGINA  = 15;
let modoModal     = 'nuevo';   // 'nuevo' | 'editar'
let idEditar      = null;
let pkCampo       = null;      // campo PK de la tabla actual

// ── Utilidades ────────────────────────────────────────────────────────────

function badge(texto, color) {
  return `<span class="tbl-badge tbl-badge-${color}">${texto}</span>`;
}

function getPK(tabla) {
  const pks = {
    alumnos:       'id_alumno',
    profesores:    'id_profesor',
    asignaturas:   'clave',
    clases:        'id_clase',
    grupos:        'num_grupo',
    areas:         'id_area',
    inscripciones: 'id_inscripcion',
  };
  return pks[tabla];
}


function switchTable(e, tabla) {
  if (e) e.preventDefault();
  tablaActual = tabla;
  paginaActual = 1;

  // Marcar nav item activo
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navEl = document.querySelector(`.nav-item[data-table="${tabla}"]`);
  if (navEl) navEl.classList.add('active');

  // Título topbar
  document.getElementById('topbar-title').textContent = TABLAS[tabla].titulo;

  // Limpiar búsqueda
  document.getElementById('search-input').value = '';

  cargarTabla();
}

// ── Carga de datos (fetch API) ────────────────────────────────────────────

async function cargarTabla() {
  const cfg = TABLAS[tablaActual];

  try {
    const res  = await fetch(cfg.apiBase, {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    datos = await res.json();
    // La API puede devolver un objeto paginado o un array directo
    if (!Array.isArray(datos)) datos = datos.data ?? datos.items ?? [];

  } catch (err) {
    console.error('Error al cargar', tablaActual, err);
    datos = [];
    // Para demo: muestra la tabla vacía sin romper la UI
  }

  datosFiltrados = [...datos];
  paginaActual   = 1;
  renderTabla();
}

// ── Render de la tabla ────────────────────────────────────────────────────

function renderTabla() {
  const cfg   = TABLAS[tablaActual];
  const pk    = getPK(tablaActual);
  const thead = document.getElementById('table-head');
  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('empty-state');

  // Cabeceras
  thead.innerHTML = cfg.columnas
    .map(c => `<th>${c}</th>`)
    .join('');

  // Paginación
  const inicio = (paginaActual - 1) * POR_PAGINA;
  const pagina = datosFiltrados.slice(inicio, inicio + POR_PAGINA);

  // Filas
  if (pagina.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    tbody.innerHTML = pagina.map(r => {
      const celdas = cfg.renderFila(r)
        .map(v => `<td>${v ?? '—'}</td>`)
        .join('');

      const idVal = r[pk];

      const acciones = `
        <td>
          <div class="action-btns">
            <button class="btn-admin btn-icon" title="Editar"
              onclick="abrirModal('editar', ${idVal})">✏️</button>
            <button class="btn-admin btn-icon btn-danger" title="Eliminar"
              onclick="abrirDelete(${idVal})">🗑️</button>
          </div>
        </td>`;

      return `<tr>${celdas}${acciones}</tr>`;
    }).join('');
  }

  // Badge de conteo
  document.getElementById('topbar-count').textContent =
    `${datosFiltrados.length} registros`;

  // Info paginación
  const total  = datosFiltrados.length;
  const desde  = total === 0 ? 0 : inicio + 1;
  const hasta  = Math.min(inicio + POR_PAGINA, total);
  document.getElementById('pagination-info').textContent =
    `Mostrando ${desde}–${hasta} de ${total}`;

  document.getElementById('btn-prev').disabled = paginaActual <= 1;
  document.getElementById('btn-next').disabled = hasta >= total;
}

// ── Búsqueda ──────────────────────────────────────────────────────────────

function filtrarTabla() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();

  if (!q) {
    datosFiltrados = [...datos];
  } else {
    datosFiltrados = datos.filter(r =>
      Object.values(r).some(v =>
        String(v ?? '').toLowerCase().includes(q)
      )
    );
  }

  paginaActual = 1;
  renderTabla();
}

// ── Paginación ────────────────────────────────────────────────────────────

function cambiarPagina(dir) {
  paginaActual += dir;
  renderTabla();
}

// ── Modal CRUD ────────────────────────────────────────────────────────────

function abrirModal(modo, id) {
  modoModal = modo;
  idEditar  = id ?? null;

  const cfg    = TABLAS[tablaActual];
  const titulo = modo === 'nuevo' ? 'Nuevo registro' : 'Editar registro';
  document.getElementById('modal-title').textContent = titulo;

  // Construir campos
  const body = document.getElementById('modal-body');
  body.innerHTML = cfg.campos.map(f => campoHTML(f)).join('');

  // Si es edición, rellenar valores
  if (modo === 'editar' && id != null) {
    const pk  = getPK(tablaActual);
    const rec = datos.find(r => String(r[pk]) === String(id));
    if (rec) {
      cfg.campos.forEach(f => {
        const el = document.getElementById(`field-${f.id}`);
        if (!el) return;
        if (f.type === 'checkbox') {
          el.checked = !!(rec[f.id]);
        } else {
          el.value = rec[f.id] ?? '';
        }
      });
    }
  }

  document.getElementById('modal-backdrop').style.display = '';
  document.getElementById('admin-modal').style.display    = '';
}

function campoHTML(f) {
  if (f.type === 'checkbox') {
    return `
      <div class="form-field" style="display:flex;align-items:center;gap:8px">
        <input type="checkbox" id="field-${f.id}" name="${f.id}"
          style="width:auto;accent-color:var(--color-primary)">
        <label for="field-${f.id}" style="text-transform:none;margin:0;font-size:13px">${f.label}</label>
      </div>`;
  }
  return `
    <div class="form-field">
      <label for="field-${f.id}">${f.label}${f.req ? ' *' : ''}</label>
      <input
        type="${f.type}"
        id="field-${f.id}"
        name="${f.id}"
        ${f.req ? 'required' : ''}
        ${f.placeholder ? `placeholder="${f.placeholder}"` : ''}
        ${f.type === 'number' ? 'min="0"' : ''}
      >
    </div>`;
}

function cerrarModal() {
  document.getElementById('modal-backdrop').style.display = 'none';
  document.getElementById('admin-modal').style.display    = 'none';
  document.getElementById('modal-form').reset();
}

// ── Guardar (POST / PUT) ──────────────────────────────────────────────────

async function guardarRegistro(e) {
  e.preventDefault();

  const cfg    = TABLAS[tablaActual];
  const pk     = getPK(tablaActual);
  const payload = {};

  cfg.campos.forEach(f => {
    const el = document.getElementById(`field-${f.id}`);
    if (!el) return;
    if (f.type === 'checkbox') {
      payload[f.id] = el.checked ? 1 : 0;
    } else if (f.type === 'number') {
      payload[f.id] = el.value !== '' ? Number(el.value) : null;
    } else {
      payload[f.id] = el.value || null;
    }
  });

  const url    = modoModal === 'nuevo'
    ? cfg.apiBase
    : `${cfg.apiBase}/${idEditar}`;
  const method = modoModal === 'nuevo' ? 'POST' : 'PUT';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(`Error: ${err.message ?? res.statusText}`);
      return;
    }

    cerrarModal();
    cargarTabla();

  } catch (err) {
    alert('Error de red: ' + err.message);
  }
}

// ── Eliminar ──────────────────────────────────────────────────────────────

let _deleteId = null;

function abrirDelete(id) {
  _deleteId = id;
  document.getElementById('delete-backdrop').style.display = '';
  document.getElementById('delete-modal').style.display    = '';
}

function cerrarDelete() {
  _deleteId = null;
  document.getElementById('delete-backdrop').style.display = 'none';
  document.getElementById('delete-modal').style.display    = 'none';
}

async function ejecutarDelete() {
  const cfg = TABLAS[tablaActual];

  try {
    const res = await fetch(`${cfg.apiBase}/${_deleteId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.mensaje ?? err.message ?? 'Error al eliminar'); 
      return;
    }

    cerrarDelete();
    cargarTabla();

  } catch (err) {
    alert('Error de red: ' + err.message);
  }
}

// ── Init ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Activar primer item del nav
  const primer = document.querySelector('.nav-item[data-table]');
  if (primer) primer.classList.add('active');

  cargarTabla();
});