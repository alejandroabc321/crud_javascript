
let editingId = null;

document.getElementById("userForm").addEventListener("submit", saveUser);

async function saveUser(e) {
  e.preventDefault();
  const id_rol = document.getElementById("id_rol").value;
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo_electronico = document.getElementById("correo_electronico").value.trim();
  const contraseña = document.getElementById("contraseña").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;

  if (!id_rol || !nombre || !apellido || !correo_electronico || !contraseña || !fecha_nacimiento) return;

  const data = { id_rol, nombre, apellido, correo_electronico, contraseña, fecha_nacimiento };

  let url = "/usuarios";
  let method = "POST";
  if (editingId) {
    url = `/usuarios/${editingId}`;
    method = "PUT";
  }

  try {
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    editingId = null;
    document.getElementById("userForm").reset();
    loadUsers();
  } catch (err) {
    console.error("❌ Error al guardar usuario:", err);
    alert("Error al guardar usuario.");
  }
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
