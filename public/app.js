document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const tabla = document.getElementById('tabla-usuarios');

  async function cargarUsuarios() {
    const res = await fetch('/usuarios');
    const usuarios = await res.json();

    tabla.innerHTML = '';
    usuarios.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.correo_electronico}</td>
        <td>
          <button class="edit" data-id="${usuario.id_usuario}">Editar</button>
          <button class="delete" data-id="${usuario.id_usuario}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(tr);
    });
  }

  formulario.addEventListener('submit', async e => {
    e.preventDefault();
    const nuevoUsuario = {
      id_rol: 2, // usuario por defecto
      nombre: formulario.nombre.value,
      apellido: formulario.apellido.value,
      correo_electronico: formulario.correo.value,
      contraseña: formulario.contraseña.value,
      fecha_nacimiento: formulario.fecha_nacimiento.value
    };

    await fetch('/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    formulario.reset();
    cargarUsuarios();
  });

  tabla.addEventListener('click', async e => {
    if (e.target.classList.contains('delete')) {
      const id = e.target.dataset.id;
      await fetch(`/usuarios/${id}`, { method: 'DELETE' });
      cargarUsuarios();
    }
    // Puedes agregar funcionalidad de edición aquí si deseas
  });

  cargarUsuarios();
});
