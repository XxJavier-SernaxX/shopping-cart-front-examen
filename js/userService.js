function users() {
    document.getElementById('cardHeader').innerHTML = '<h5 class="text-white">Lista de Usuarios</h5>';
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/users';

    fetch(FAKESTORE_ENDPOINT, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Usuarios:', data);

            let listUser = `
            <button type="button" class="btn btn-success mb-3" onclick="createUser()">Crear</button>
            <div class="table-responsive">
                <table class="table table-striped table-hover border-success">
                    <thead class="table-success text-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Rol</th>
                            <th scope="col">info</th>
                        </tr>
                    </thead>
                    <tbody>`;

            data.forEach(element => {
                listUser += `
                    <tr>
                        <td>${element.id}</td>
                        <td class="text-primary">${element.email}</td>
                        <td class="fw-bold text-success">${element.name}</td>
                        <td class="text-secondary">${element.role}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="getUser(${element.id})">
                                Ver Detalles
                            </button>
                        </td>
                    </tr>`;
            });

            listUser += `
                    </tbody>
                </table>
            </div>`;

            document.getElementById('info').innerHTML = listUser;
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
            document.getElementById('info').innerHTML = '<p class="text-danger">Error al cargar usuarios</p>';
        });
}

function getUser(idUser) {
    const FAKESTORE_ENDPOINT = `https://api.escuelajs.co/api/v1/users/${idUser}`;

    fetch(FAKESTORE_ENDPOINT, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario:', data);
            
            const modalUser = `
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">Detalles del Usuario</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="card shadow-sm border-success">
                                <img src="${data.avatar}" class="card-img-top rounded-circle mx-auto mt-3" style="width: 150px;" alt="Avatar">
                                <div class="card-body">
                                    <h5 class="card-title text-success">${data.name}</h5>
                                    <p class="card-text"><strong>Correo:</strong> ${data.email}</p>
                                    <p class="card-text"><strong>Rol:</strong> ${data.role}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById('viewModal').innerHTML = modalUser;
            const modal = new bootstrap.Modal(document.getElementById('modalUser'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            document.getElementById('info').innerHTML = '<h3 class="text-danger">No se encontró el usuario en la API</h3>';
        });
}

function createUser() {
    const modalUser = `
<!-- Modal -->
<div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title fs-5" id="exampleModalLabel">Crear Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form id="formCreateUser">
                            <div class="row g-3">
                                <div class="col">
                                    <input type="text" class="form-control" id="name" placeholder="Nombre" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="avatar" placeholder="Avatar" required>
                                </div>
                               
                            </div>
                            <div class="row g-3 mt-3">
                                <div class="col">
                                    <input type="email" class="form-control" id="email" placeholder="Correo electrónico" required>
                                </div>
                                <div class="col">
                                    <input type="password" class="form-control" id="password" placeholder="Contraseña" required>
                                </div>
                            </div>
                            <div class="text-end mt-4">
                                <button type="button" class="btn btn-success" onclick="saveUser()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            `
    document.getElementById('viewModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()
}

function saveUser() {
    const form = document.getElementById('formCreateUser')
    if (form.checkValidity()) {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const avatar = document.getElementById('avatar').value
    
        const user = { name, email, avatar, password }

        const FAKEAPI_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/'
        fetch(FAKEAPI_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            
            .then((data) => {
                console.log("entra", data)
                
                    document.getElementById('info').innerHTML =
                        '<h3>Guardado exitosamente</h3>'
                
                
                
                const modalId = document.getElementById('modalUser')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()

            })
            .catch(error=> {
                console.error("Error:", error)
                document.getElementById('info').innerHTML =
                        '<h3>Error al guardar el usuario</h3>'
            })
    }
    else {
        form.reportValidity()
    }
}

