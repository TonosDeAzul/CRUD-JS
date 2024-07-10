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

// Validación
const validacion = (input) => {
  if (input.value === "" || input.value.length < 3 || input.value.length > 20) {
    input.classList.add("border-red-600", "border-2");
    return false;
  } else {
    input.classList.remove("border-red-600", "border-2");
    return true;
  }
};


// Validar inputs
const validarNombre = () => {
  return validacion(_nombre);
};
const validarApellidos = () => {
  return validacion(_apellidos);
}
const validarDocumento = () => {
  return validacion(_documento);
}
const validarTipoDocumento = () => {
  if (_tipoDocumento.value === "Ingrese su tipo de documento") {
    _tipoDocumento.classList.add("border-red-600", "border-2");
    return false;
  } else {
    _tipoDocumento.classList.remove("border-red-600", "border-2");
    return true;
  }
}
const validarCorreo = () => {
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexCorreo.test(_correo.value) || _correo.value === "") {
    _correo.classList.add("border-red-600", "border-2");
    return false;
  } else {
    _correo.classList.remove("border-red-600", "border-2");
    return true;
  }
};
const validarDireccion = () => {
  const regexDireccion = /^[a-zA-Z0-9\s#'.,-]+$/;
  if (!regexDireccion.test(_direccion.value) || _direccion.value === "") {
    _direccion.classList.add("border-red-600", "border-2");
    return false;
  } else {
    _direccion.classList.remove("border-red-600", "border-2");
    return true;
  }
}

// Validar formulario
export const validarFormulario = () => {
  // Realiza todas las validaciones
  const nombreValido = validarNombre();
  const apellidosValido = validarApellidos();
  const documentoValido = validarDocumento();
  const tipoDocumentoValido = validarTipoDocumento();
  const correoValido = validarCorreo();
  const direccionValida = validarDireccion();

  // Si alguna validación falla, detiene el envío del formulario
  if (!nombreValido || !apellidosValido || !documentoValido || !tipoDocumentoValido || !correoValido || !direccionValida) {
    return false;
  }
  return true;
};