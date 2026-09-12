const botonTema = document.getElementById('boton-tema');
const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'oscuro') {
  document.body.classList.add('darkmode');
}

function actualizarBotonTema() {
  const modoOscuroActivo = document.body.classList.contains('darkmode');

  botonTema.textContent = modoOscuroActivo
    ? 'Modo claro'
    : 'Modo oscuro';

  botonTema.setAttribute('aria-pressed', modoOscuroActivo);

  botonTema.setAttribute(
    'aria-label',
    modoOscuroActivo
      ? 'Cambiar a modo claro'
      : 'Cambiar a modo oscuro'
  );
}

botonTema.addEventListener('click', function () {
  document.body.classList.toggle('darkmode');

  const modoOscuroActivo = document.body.classList.contains('darkmode');

  localStorage.setItem('tema', modoOscuroActivo ? 'oscuro' : 'claro');

  actualizarBotonTema();
});

actualizarBotonTema();



const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const formulario = document.getElementById('form-reporte');

formulario.addEventListener('submit', async function (evento) {
  evento.preventDefault();
    const nuevoCaso = {
      fecha: document.getElementById('fecha').value,
      lugar: document.getElementById('lugar').value,
      descripcion: document.getElementById('descripcion').value,
      autoridad: document.getElementById('autoridad').value
    };

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCaso)
      });

    } catch (error) {
      console.error('Error al enviar el caso:', error);
    }
  });

async function obtenerCasosDelServidor() {
  try {
    const respuesta = await fetch(`${API_URL}?_limit=6`);
    if (!respuesta.ok) {
      throw new Error('Error al obtener los datos');
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener los casos:', error);
    return [];
  }
}




function crearTarjetaCasoDesdeAPI(item) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta-caso';
  tarjeta.innerHTML = `
    <h3>Caso #${item.id}</h3>
    <p class="meta">Sincronizado desde el servidor</p>
    <p>${item.title}</p>
  `;
  return tarjeta;
}

async function iniciarListaDesdeServidor() {
  const contenedor = document.getElementById('contenedor-casos');
  contenedor.innerHTML = '<p>Cargando casos del servidor...</p>';

  const casosServidor = await obtenerCasosDelServidor();

  contenedor.innerHTML = '';
  casosServidor.forEach(item => {
    contenedor.appendChild(crearTarjetaCasoDesdeAPI(item));
  });
}

iniciarListaDesdeServidor();







































/*
const formulario = document.getElementById('form-reporte');
const contenedorCasos = document.getElementById('contenedor-casos');
const buscador = document.getElementById('buscador');
const filtroAutoridad = document.getElementById('filtro-autoridad');

let casos = JSON.parse(localStorage.getItem('casos')) || [];

function crearTarjetaCaso(caso) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta-caso';

  tarjeta.innerHTML = `
    <h3>${caso.lugar}</h3>
    <p class="meta">${caso.fecha} · ${caso.autoridad}</p>
    <p>${caso.descripcion}</p>
  `;

  return tarjeta;
}

function renderizarCasos(listaCasos = casos) {
  if (!contenedorCasos) return;

  contenedorCasos.innerHTML = '';

  if (listaCasos.length === 0) {
    contenedorCasos.innerHTML = '<p>Aún no hay casos registrados.</p>';
    return;
  }

  listaCasos.forEach(caso => {
    const tarjeta = crearTarjetaCaso(caso);
    contenedorCasos.appendChild(tarjeta);
  });
}

if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nuevoCaso = {
      fecha: document.getElementById('fecha').value,
      lugar: document.getElementById('lugar').value,
      descripcion: document.getElementById('descripcion').value,
      autoridad: document.getElementById('autoridad').value
    };

    casos.push(nuevoCaso);
    localStorage.setItem('casos', JSON.stringify(casos));

    formulario.reset();
    window.location.href = 'casos.html';
  });
}

if (buscador && filtroAutoridad) {
  function filtrarCasos() {
    const texto = buscador.value.toLowerCase();
    const autoridad = filtroAutoridad.value;

    const casosFiltrados = casos.filter(caso => {
      const coincideTexto =
        caso.lugar.toLowerCase().includes(texto) ||
        caso.descripcion.toLowerCase().includes(texto);

      const coincideAutoridad =
        autoridad === '' || caso.autoridad === autoridad;

      return coincideTexto && coincideAutoridad;
    });

    renderizarCasos(casosFiltrados);
  }

  buscador.addEventListener('input', filtrarCasos);
  filtroAutoridad.addEventListener('change', filtrarCasos);
}
renderizarCasos(); */