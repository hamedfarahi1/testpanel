import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../shared/component/private-route/PrivateRoute';
import { AddQuestion } from './crud/AddQuestion'
import { QuestionDetail } from './crud/QuestionDetail';
import { QuestionList } from './QuestionList';

function Question() {
	return (
		<div>
			<Switch>
				<Redirect exact from="/questions" to="/questions/list"> </Redirect>
				<PrivateRoute path="/questions/list" component={QuestionList} />
				<PrivateRoute path="/questions/add" component={AddQuestion} />
				<PrivateRoute path="/questions/:id" component={QuestionDetail} />
			</Switch>
		</div>
	);

}

export { Question }