import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
	Link
} from "react-router-dom";
import { connect } from 'react-redux';

import { userActions } from '../../core/store/_actions';
import { userFieldConstants, accountPropConstants } from '../../core/store/_constants'
import { useStyles } from './styles';
import MyTextField from '../../shared/component/my-text-field/MyTextField';
import { LinearProgress } from '@material-ui/core';

function AccountForm(props) {

	useEffect(() => {
		props.logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const classes = useStyles();
	const [values, setValues] = useState({ username: '', password: '' })
	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const submitForm = (event) => {
		props.login({ ...values, username: values.username.toLowerCase() })
		event.preventDefault();

	}

	const CheckBoxHandleChange = e => {
		//TODO
	}

	const isNotValidForm = () => {
		const { username, password } = values;
		return (!username || !password);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{
						accountPropConstants.LOGIN_IN_SITE
					}
				</Typography>
				<form className={classes.form} onSubmit={submitForm}>
					<MyTextField
						value={values.username}
						style={{ textAlign: 'left' }}
						required={true}
						field='username'
						label={userFieldConstants.USERNAME}
						onChange={handleInputChange}
						margin='normal'

					/>
					<MyTextField
						value={values.password}
						style={{ textAlign: 'left' }}
						required={true}
						field='password'
						type='password'
						label={userFieldConstants.PASSWORD}
						onChange={handleInputChange}
						margin='normal'

					/>
					<FormControlLabel
						control={<Checkbox disabled onChange={CheckBoxHandleChange} color="primary" />}
						label={<Typography className={classes.checkBox}>{
							accountPropConstants.REMEMBER_ME
						}</Typography>}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
						disabled={isNotValidForm() || props.loggingIn}
					>
						{
							accountPropConstants.LOGIN
						}
					</Button>
					{(props.loggingIn) && <LinearProgress />}
					<Grid className={classes.link} container justify="flex-end">
						<Grid item xs>
							<Link disabled to="#" variant="body2">
								{accountPropConstants.FORGOT_PASSWORD}
							</Link>
						</Grid>
						<Grid item>
							<Link
								disabled
								to={'#'} variant="body2">
								{accountPropConstants.REGISTER_IN_SITE}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);

}

function mapState(state) {
	const { loggingIn } = state.authentication;

	return { loggingIn }
}

const actionCreators = {
	login: userActions.login,
	logout: userActions.logout
}

const connectedAccountFormPage = connect(mapState, actionCreators)(AccountForm);
export { connectedAccountFormPage as AccountForm }