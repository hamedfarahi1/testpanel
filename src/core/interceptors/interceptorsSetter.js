import { errorHandlerInterceptor } from './errorHandlerInterceptor';
import { accountService } from '../service/account/accountService'

const axios = require('../service/client');

export function interceptorsSetter() {
	axios.interceptors.response.use(response => response, error => errorHandlerInterceptor(error));
	accountService.setAuthInterceptor();
}

