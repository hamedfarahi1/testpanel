const axios = require('../client');

export const questionService = {
	getQuestions,
	addQuestion
}

function getQuestions() {
	return axios.get('/admin/questions');
}

function addQuestion(obj) {
	return axios.post('/admin/questions', obj);
}
