function products() {
    document.getElementById('cardHeader').innerHTML = '<h5 class="text-white">Nuestros Productos</h5>';
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/products';

    fetch(FAKESTORE_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            console.log('Productos:', data);

            let listProduct = `
            <button type="button" class="btn btn-success mb-3 text-align-center" onclick="createProduct()">Crear</button>
            <div class="table-responsive">
                <table class="table table-striped table-hover border-success">
                    <thead class="table-success text-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Info</th>
                        </tr>
                    </thead>
                    <tbody>`;

            data.forEach(element => {
                listProduct += `
                    <tr>
                        <td>${element.id}</td>
                        <td class="fw-bold text-success">${element.title}</td> 
                        <td class="text-primary">$${element.price.toFixed(2)}</td>
                        <td class="text-primary">${element.description}</td>
                        <td>
                            <img src="${element.images[0]}" class="img-thumbnail rounded shadow-sm" style="width: 60px;" alt="Imagen del producto">
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="getProduct(${element.id})">
                                Ver Detalles
                            </button>
                        </td>
                    </tr>`;
            });

            listProduct += `
                    </tbody>
                </table>
            </div>`;

            document.getElementById('info').innerHTML = listProduct;
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
            document.getElementById('info').innerHTML = '<p class="text-danger">Error al cargar productos</p>';
        });
}

function getProduct(idProduct) {
    const FAKESTORE_ENDPOINT = `https://api.escuelajs.co/api/v1/products/${idProduct}`;

    fetch(FAKESTORE_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            console.log('Producto:', data);
            
            const modalProduct = `
            <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">Detalles del Producto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="card shadow-sm border-success">
                                <img src="${data.images[0]}" class="card-img-top rounded mx-auto mt-3" style="width: 200px;" alt="Imagen del producto">
                                <div class="card-body">
                                    <h5 class="card-title text-success">${data.title}</h5>
                                    <p class="card-text"><strong>Precio:</strong> $${data.price.toFixed(2)}</p>
                                    <p class="card-text text-primary">${data.description}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
            document.getElementById('info').innerHTML = '<h3 class="text-danger">No se encontró el producto en la API</h3>';
        });
}
