/// Variables para los elementos del DOM
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

// Función para hacer la solicitud a la API de geolocalización
const SolicitudAPI = () => {
  axios.get("https://itp-examen26.000webhostapp.com/php-geoip-api/index.php")
    .then(function (response) {
      console.log(response.data);
      ip.innerHTML = response.data.ip;
      pais.innerHTML = response.data.pais;
      continente.innerHTML = response.data.continente;
      zona_horaria.innerHTML = response.data.zona_horaria;
      // No necesitas asignar valores a nombre y comida aquí, ya que estos se obtienen del formulario
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // siempre será ejecutado
    });
};

// Llama al evento LOAD cada vez que se refresca o se actualiza la página
// Y llama a la función SolicitudAPI que tiene la rutina de llamada a la API desde Axios
window.addEventListener('load', function () {
  SolicitudAPI();
  // Puedes agregar más acciones después de cargar la página si es necesario
});

