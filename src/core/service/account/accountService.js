const axios = require('../client');

export const accountService = {
	login,
	logout,
	setAuthInterceptor,
}
function login(credential) {
	return axios.post(`/auth/login`, {
		username: credential.username,
		password: credential.password
	}).then(res => {
		return submitUser(res.data);
	});
}

function logout() {
	// remove user from local storage to log user out
	axios.interceptors.request.use(request => {
		request.headers['Authorization'] = null;
		return request;
	})
	localStorage.removeItem('user');
	localStorage.removeItem('auth');
}

function submitUser(res) {
	const user = res.user
	localStorage.setItem('auth', JSON.stringify({ token: res.token }));
	localStorage.setItem('user', JSON.stringify(user));
	setAuthInterceptor()
	return
}

function setAuthInterceptor() {
	function getToken() {
		const auth = JSON.parse(localStorage.getItem("auth"));
		try { return auth.token }
		catch (e) { return null }
	}
	axios.interceptors.request.use(request => {
		let tkn = getToken();
		request.headers['Authorization'] = tkn ? 'Bearer ' + tkn : '';
		return request;
	})

}

export function _delete() { }