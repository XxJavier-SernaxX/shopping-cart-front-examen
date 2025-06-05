document.getElementById('loginForm').addEventListener('submit', function (e) {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	login(username, password);
});

function login(username, password) {
	localStorage.removeItem('token');

	fetch('https://fakestoreapi.com/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password })
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Usuario o contraseña incorrectos');
			}
			return response.json();
		})
		.then(data => {
			if (data.token) {
				localStorage.setItem('token', data.token);
				alertBuilder('success', 'Inicio de sesión exitoso');
				setTimeout(() => {
					location.href = 'admin/dashboard.html';
				}, 2000);
			} else {
				alertBuilder('danger', 'Inicio de sesión inválido');
			}
		})
		.catch(error => {
			console.log('Error:', error);
			alertBuilder('danger', error.message || 'Ocurrió un error inesperado');
		});
}

function alertBuilder(alertType, message) {
	const alert =
		`<div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
		${message}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>`;
	document.getElementById('mensaje').innerHTML = alert;
}
