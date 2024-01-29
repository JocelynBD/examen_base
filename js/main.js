// Variables para los elementos del DOM
let ip = document.getElementById("ip");
let pais = document.getElementById("pais");
let continente = document.getElementById("continente");
let zona_horaria = document.getElementById("zona_horaria");
let tablaDatos = document.getElementById("tablaDatos");

// Función para enviar los datos a la base de datos
function enviarDatosABaseDeDatos(datos) {
  axios.post("https://itp-examen26.000webhostapp.com/php-geoip-api/index.php", datos)
    .then(function (response) {
      console.log('Datos guardados en la base de datos:', response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Función para redirigir según el continente
function redirigirSegunContinente() {
  const continenteValor = continente.innerHTML;

  switch (continenteValor) {
    case 'Africa':
      window.location.href = 'https://itp-examen26.000webhostapp.com/php-geoip-api/index.php';
      break;
    case 'Europa':
      window.location.href = 'https://itp-examen.000webhostapp.com/php-geoip-api/index.php';
      break;
    case 'Sudamérica':
      window.location.href = 'https://itp-scr-examen-1.000webhostapp.com/php-geoip-api/index.php';
      break;
    // Puedes agregar más casos según sea necesario para otros continentes

    default:
      // En caso de que no coincida con ninguno de los casos anteriores, puedes hacer algo o dejarlo vacío
      break;
  }
}

// Función para hacer la solicitud a la API de geolocalización y redirigir después de obtener la respuesta
const SolicitudAPIYRedirigir = () => {
  axios.get("https://itp-examen26.000webhostapp.com/php-geoip-api/index.php")
    .then(function (response) {
      console.log(response.data);
      ip.innerHTML = response.data.ip;
      pais.innerHTML = response.data.pais;
      continente.innerHTML = response.data.continente;
      zona_horaria.innerHTML = response.data.zona_horaria;

      // Redirigir según el continente
      redirigirSegunContinente();
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // Si es necesario, puedes realizar alguna acción después de la solicitud de la API
    });
};

// Función para enviar el formulario con Axios y agregar a la tabla
function enviarFormulario() {
  var nombre = document.getElementById('nombre').value;
  var datos = {
    formulario: {
      nombre: nombre
    },
    api: {
      ip: ip.value,
      pais: pais.value,
      continente: continente.value,
      zona_horaria: zona_horaria.value,
      nombre: nombre
    }
  };
  
  // Agregar a la tabla
  var fila = `<tr><td>${nombre}</td></tr>`;
  tablaDatos.innerHTML += fila;

  // Imprimir datos en la consola
  console.log('Datos a enviar:', JSON.stringify(datos));

  // Enviar datos a la base de datos
  enviarDatosABaseDeDatos(datos);
}

// Llama al evento LOAD cada vez que se refresca o se actualiza la página
// Y llama a la función SolicitudAPIYRedirigir que incluye la redirección según el continente
window.addEventListener('load', function () {
  SolicitudAPIYRedirigir();
  // Puedes agregar más acciones después de cargar la página si es necesario
});
