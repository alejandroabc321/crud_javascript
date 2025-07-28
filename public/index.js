let editingId = null;

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    id_rol: document.getElementById("id_rol").value,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    correo_electronico: document.getElementById("correo_electronico").value,
    contraseña: document.getElementById("contraseña").value,
    fecha_nacimiento: document.getElementById("fecha_nacimiento").value
  };

  if (editingId) {
    await fetch(`/usuarios/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    editingId = null;
  } else {
    await fetch("/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  e.target.reset();
  loadUsers();
});

async function loadUsers() {
  const res = await fetch("/usuarios");
  const users = await res.json();
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.nombre}</td>
      <td>${user.apellido}</td>
      <td>${user.correo_electronico}</td>
      <td>
        <button onclick="editUser(${user.id_usuario})">Editar</button>
        <button onclick="deleteUser(${user.id_usuario})">Eliminar</button>
      </td>
    `;
    table.appendChild(row);
  });
}

async function deleteUser(id) {
  await fetch(`/usuarios/${id}`, { method: "DELETE" });
  loadUsers();
}

async function editUser(id) {
  const res = await fetch(`/usuarios`);
  const users = await res.json();
  const user = users.find(u => u.id_usuario === id);
  editingId = id;

  document.getElementById("id_rol").value = user.id_rol;
  document.getElementById("nombre").value = user.nombre;
  document.getElementById("apellido").value = user.apellido;
  document.getElementById("correo_electronico").value = user.correo_electronico;
  document.getElementById("contraseña").value = user.contraseña;
  document.getElementById("fecha_nacimiento").value = user.fecha_nacimiento.split('T')[0];
}

loadUsers();
