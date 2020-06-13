import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest} render={props => {
			if (rest.loggedIn)
				return <Component {...props} />
			else
				return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
		}} />
	)
}

function mapState(state) {
	const { loggedIn } = state.authentication;
	return { loggedIn }
}

const connectedPrivateRoutePage = connect(mapState, {})(PrivateRoute)
export { connectedPrivateRoutePage as PrivateRoute }