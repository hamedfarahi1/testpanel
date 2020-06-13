import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../../shared/component/private-route/PrivateRoute';
import { AddQuestion } from './crud/AddQuestion'
import { QuestionDetail } from './crud/QuestionDetail';

function Question() {
	return (
		<div>
			<Switch>
				<PrivateRoute path="/questions/add" component={AddQuestion} />
				<PrivateRoute path="/questions/:id" component={QuestionDetail} />
			</Switch>
		</div>
	);

}

export { Question }