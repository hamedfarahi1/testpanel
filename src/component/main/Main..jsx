import React, { useEffect } from 'react';
import {
	Router,
	Switch
} from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../core/store/_actions';
import { history } from '../../core/store_helpers';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { mainConstants } from '../../core/_constants';
import { Side } from './side/Side';
import { useMainStyles } from './styles';
import { Footer } from './footer/Footer';
import { ScrollToTop } from '../../shared/component/scroll-to-top/scroll-to-top';

function Main(props) {

	const classes = useMainStyles();

	useEffect(() => {
		history.listen(() => props.clearAlerts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [openSide, setOpenSide] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpenSide(true);
	};

	const handleDrawerClose = () => {
		setOpenSide(false);
	};

	return (
		<Router history={history}>
			<AppBar position="sticky" className={clsx(classes.appBar, {
				[classes.appBarShift]: openSide && props.loggedIn,
			})}>
				<Toolbar className={classes.toolBar}>
					{props.loggedIn &&
						<IconButton
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, openSide && props.loggedIn && classes.hide)}
							color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>}
					<Typography variant="h6" className={classes.title}>
						{mainConstants.JOBSHAAR}
					</Typography>
					<div>
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
					</div>
					<Button
						color='secondary'
						className={classes.linkButton}>
						<Icon>account_box</Icon>
					</Button>
				</Toolbar>
			</AppBar>
			<Side openSide={openSide} handleDrawerClose={handleDrawerClose}>
				<Switch>

				</Switch>
				<Footer />
			</Side>
			<ScrollToTop />
		</Router>
	);
}

function mapState(state) {
	const { alert } = state;
	const { loggedIn } = state.authentication
	return { alert, loggedIn };
}

const actionCreators = {
	clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(Main);
export { connectedApp as Main };