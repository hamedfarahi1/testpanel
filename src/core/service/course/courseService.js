const axios = require('../client');

export const courseService = {
	getCourses,
	getCourseCategories
}

function getCourses(id) {
	return axios.get(`/admin/stages/${id}/courses`)
}

function getCourseCategories(id) {
	return axios.get(`/admin/courses/${id}/categories`)
}
