import { validarFormulario } from "./validationInputs.js";
import { modalEliminar } from "./popups.js";


const _d = document;

// Formulario
const _form = _d.getElementById("form");

// Tabla listar
const _listar = _d.getElementById("listar");
// Table Body
const _tbody = _d.getElementById("tbody");

// Inputs formulario
const _nombre = _d.getElementById("nombre");
const _apellidos = _d.getElementById("apellidos");
const _documento = _d.getElementById("documento");
const _tipoDocumento = _d.getElementById("tipoDocumento");
const _correo = _d.getElementById("correo");
const _direccion = _d.getElementById("direccion");


// Evitar escribir números en el input
const evitarNumeros = (input) => {
  input.setAttribute(
    "onkeypress",
    `return (
      (event.charCode >= 65 && event.charCode <= 90) || 
      (event.charCode >= 97 && event.charCode <= 122) || 
      (event.charCode === 13 || event.charCode === 32) || 
      (event.charCode >= 192 && event.charCode <= 255)
      )`
  );
};

// Evitar escribir letras en el input
const evitarLetras = (input) => {
  input.setAttribute(
    "onkeypress",
    "return (event.charCode >= 48 && event.charCode <= 57 || event.charCode === 13)"
  );
};

evitarLetras(_documento);
evitarNumeros(_nombre);
evitarNumeros(_apellidos);

// Cargar tipos de documentos
fetch("http://127.0.0.1:3000/docs")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const _option = _d.createElement("option");
      _option.textContent = element.nombre;
      _tipoDocumento.appendChild(_option);
    });
  });


// Crear tabla para almacenar usuarios
const crearTablaUsuario = (element) => {
  const _tr = _d.createElement("tr");
  _tr.classList.add("hover", "text-center")
  _tbody.appendChild(_tr);

  const _thId = _d.createElement("th");
  _thId.textContent = element.id;
  _thId.setAttribute("value", element.id);
  _tr.appendChild(_thId);

  const _thNombre = _d.createElement("th");
  _thNombre.textContent = element.nombre;
  _tr.appendChild(_thNombre);

  const _thApellidos = _d.createElement("th");
  _thApellidos.textContent = element.apellidos;
  _tr.appendChild(_thApellidos);

  const _thDocumento = _d.createElement("th");
  _thDocumento.textContent = element.documento;
  _tr.appendChild(_thDocumento);

  const _thTipoDocumento = _d.createElement("th");
  _thTipoDocumento.textContent = element.tipo_documento;
  _tr.appendChild(_thTipoDocumento);

  const _thCorreo = _d.createElement("th");
  _thCorreo.textContent = element.correo;
  _tr.appendChild(_thCorreo);

  const _thDireccion = _d.createElement("th");
  _thDireccion.textContent = element.direccion;
  _tr.appendChild(_thDireccion);

  const _thAcciones = _d.createElement("th");
  _tr.appendChild(_thAcciones);

  const _buttonEliminar = _d.createElement("button");
  _buttonEliminar.classList.add("fa-solid", "fa-trash", "mr-2");
  _buttonEliminar.setAttribute('data-id', element.id);
  _thAcciones.appendChild(_buttonEliminar);

  const _buttonEditar = _d.createElement("button");
  _buttonEditar.classList.add("fa-solid", "fa-pen");
  _buttonEditar.setAttribute('data-id', element.id);
  _thAcciones.appendChild(_buttonEditar);
};
// Variable para almacenar el ID del usuario que se está editando
let editingUserId = null;

// CRUD

// Read
export const readUser = () => {
  // Limpiar la tabla antes de cargar los datos
  _tbody.innerHTML = '';
  // Hacemos la petición a la tabla usuarios
  fetch("http://127.0.0.1:3000/users")
    // Parseamos la respuesta a JSON
    .then((response) => response.json())
    // Procesamos los datos recibidos
    .then((data) => {
      // Iteramos sobre cada elemento de los datos
      data.forEach((element) => {
        // Creamos una fila en la tabla para cada usuario
        crearTablaUsuario(element);
      });
      // Añadimos los event listeners a los botones de la tabla
      _addEventListeners();
    });
};

// Create
const createUser = (data) => {
  // Hacemos una petición para crear un nuevo usuario
  fetch("http://127.0.0.1:3000/users", {
    // Especificamos que el método de la petición es POST
    method: "POST",
    // Convertimos el objeto data a formato JSON y lo enviamos en el cuerpo de la petición
    body: JSON.stringify(data),
    // Especificamos que el contenido de la petición es de tipo JSON
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Parseamos la respuesta a JSON
    .then((response) => response.json())
    // Procesamos la respuesta
    .then(() => {
      // Llamamos a la función para leer y actualizar la lista de usuarios
      readUser();
      // Resetear el formulario después de crear el usuario
      _form.reset();
    });
};

// Update  
const updateUser = (id, data) => {
  // Hacemos una petición para actualizar un usuario específico
  fetch(`http://127.0.0.1:3000/users/${id}`, {
    // Especificamos que el método de la petición es PUT
    method: "PUT",
    // Convertimos el objeto data a formato JSON y lo enviamos en el cuerpo de la petición
    body: JSON.stringify(data),
    // Especificamos que el contenido de la petición es de tipo JSON
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
    // Parseamos la respuesta a JSON
    .then((response) => response.json())
    // Procesamos la respuesta
    .then(() => {
      // Llamamos a la función para leer y actualizar la lista de usuarios
      readUser();
      // Resetear el formulario después de actualizar el usuario
      _form.reset();
      // Resetear la variable de edición
      editingUserId = null;
    });
};


// Evento submit del formulario
_form.addEventListener("submit", (event) => {
  // Prevenimos el comportamiento por defecto del formulario (recargar la página)
  event.preventDefault();

  // Validar el formulario
  const formularioValido = validarFormulario();
  if (!formularioValido) {
    // Detener la ejecución si el formulario no es válido
    return;
  }

  // Creamos un objeto con los datos del formulario
  const data = {
    nombre: _nombre.value,
    apellidos: _apellidos.value,
    documento: _documento.value,
    tipo_documento: _tipoDocumento.value,
    correo: _correo.value,
    direccion: _direccion.value,
  };

  // Si estamos editando un usuario existente
  if (editingUserId) {
    // Actualizamos el usuario
    updateUser(editingUserId, data);
  } else {
    // Creamos un nuevo usuario
    createUser(data);
  }

});

// Agregar eventos a los botones
const _addEventListeners = () => {
  // Seleccionamos todos los botones de eliminar
  const deleteButtons = _d.querySelectorAll('.fa-trash');
  // Seleccionamos todos los botones de editar
  const editButtons = _d.querySelectorAll('.fa-pen');

  // Asignamos el evento click a cada botón de eliminar
  deleteButtons.forEach(button => {
    const id = button.getAttribute('data-id'); // Obtenemos el ID del usuario
    button.addEventListener("click", () => modalEliminar(id));
    // button.addEventListener('click', () => deleteUser(id)); // Asignamos el evento click para eliminar el usuario
  });

  // Asignamos el evento click a cada botón de editar
  editButtons.forEach(button => {
    const id = button.getAttribute('data-id'); // Obtenemos el ID del usuario
    button.addEventListener('click', () => {
      // Hacemos una petición para obtener los datos del usuario específico
      fetch(`http://127.0.0.1:3000/users/${id}`)
        .then(response => response.json()) // Parseamos la respuesta a JSON
        .then(data => {
          // Llenamos el formulario con los datos del usuario
          _nombre.value = data.nombre;
          _apellidos.value = data.apellidos;
          _documento.value = data.documento;
          _tipoDocumento.value = data.tipo_documento;
          _correo.value = data.correo;
          _direccion.value = data.direccion;
          editingUserId = data.id; // Almacenamos el ID del usuario que se está editando
          console.log(editingUserId);
        });
    });
  });
};

// Cuando el contenido del documento ha sido cargado, leemos los usuarios y llenamos la tabla
_d.addEventListener("DOMContentLoaded", readUser);