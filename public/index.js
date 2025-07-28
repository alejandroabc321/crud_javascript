let editingId = null;

function saveUser(e) {
  e.preventDefault();
  const id_rol = document.getElementById("id_rol").value;
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo_electronico = document.getElementById("correo_electronico").value.trim();
  const contraseña = document.getElementById("contraseña").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;

  if (!id_rol || !nombre || !apellido || !correo_electronico || !contraseña || !fecha_nacimiento) return;

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_rol,
      nombre,
      apellido,
      correo_electronico,
      contraseña,
      fecha_nacimiento
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("✅ Usuario guardado en la base de datos");
      document.getElementById("userForm").reset();
      loadUsers();
    })
    .catch((err) => {
      console.error("❌ Error al guardar usuario:", err);
      alert("Error al guardar usuario.");
    });
}

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
