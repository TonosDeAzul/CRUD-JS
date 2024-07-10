import { readUser } from "./UserCRUD.js";


const _d = document;
const _body = _d.body;

// Delete
const deleteUser = (id) => {
  // Hacemos una petición para eliminar un usuario específico
  fetch(`http://127.0.0.1:3000/users/${id}`, {
    // Especificamos que el método de la petición es DELETE
    method: "DELETE",
  })
  // Parseamos la respuesta a JSON
  .then(response => response.json())
  // Procesamos la respuesta
  .then(() => {
    // Llamamos a la función para leer y actualizar la lista de usuarios
    readUser();
  });
};


export const modalEliminar = (id) => {
  const _section = _d.createElement("section");
  _section.classList.add(
    "flex",
    "bg-[#1D1D1D60]",
    "fixed",
    "min-h-screen",
    "w-full",
    "justify-center",
    "items-center"
  );
  _body.appendChild(_section);

  const _modal = _d.createElement("div");
  _modal.classList.add(
    "bg-white",
    "w-96",
    "rounded-lg",
    "p-5",
    "text-center",
    "flex",
    "gap-5",
    "flex-col",
    "items-center"
  );
  _modal.textContent = "¿Seguro que desea eliminar al usuario?";
  _section.appendChild(_modal);

  const _br = _d.createElement("br");
  _modal.appendChild(_br);

  const _buttonContainer = _d.createElement("div");
  _modal.appendChild(_buttonContainer);

  const _buttonDelete = _d.createElement("button");
  _buttonDelete.classList.add(
    "btn",
    "w-14",
    "bg-red-600",
    "text-white",
    "hover:bg-red-600"
  );
  _buttonDelete.textContent = "Sí";
  _buttonContainer.appendChild(_buttonDelete);
  
  _buttonDelete.addEventListener("click", () => {
    deleteUser(id);
    _body.removeChild(_section);
  });

  const _buttonDeclive = _d.createElement("button");
  _buttonDeclive.classList.add(
    "btn",
    "w-14",
    "bg-lime-400",
    "text-white",
    "hover:bg-lime-400",
    "ml-2"
  );
  _buttonDeclive.textContent = "No";
  _buttonContainer.appendChild(_buttonDeclive);

  _buttonDeclive.addEventListener("click", () => {
    _body.removeChild(_section);
  })
}
