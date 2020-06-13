import { makeStyles } from '@material-ui/core';

export const useAddQuestionStyles = makeStyles((theme) => ({
	container: {
		// display: 'flex',
		// justifyContent: 'space-between'
	},
	paper: {
		minHeight: '35rem',
		padding: '7rem'
	},
	paperChange: {
		padding: '1rem'
	},
	editor: {
		boxShadow: '0px 1px 2px 0px grey',
		margin: '12px',
		minHeight: '30rem'
	},
	editorTitle: {
		padding: '20px',
		fontSize: 'calc(1vw + 3px)',
		color: theme.palette.primary.main
	}
}))


export const useQuestionDetailStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: theme.spacing(10),
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		}
	},
	side: {
		width: '100%',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(8),
		marginTop: '-20rem'
	},
	decresePadding: {
		padding: theme.spacing(2),
		marginTop: '-17rem'
	},
	item: {
		width: '100%',
		minHeight: '600px',
		padding: theme.spacing(2)
	},
	sameJobs: {
		width: '100%',
		marginTop: theme.spacing(4),
		padding: theme.spacing(2)
	},
	attache: {
		width: '45px',
		marginTop: '-72px'
	},
	title: {
		fontSize: 'calc(1vw + 12px)',
		padding: '30px',
		marginLeft: '105px'
	},
	description: {
		padding: '3%',
	},
	InfoItem: {
		paddingLeft: '50px',
		fontSize: 'small',
		fontWeight: '500',
	},
	optionsInfo: {
		padding: '12px',
		fontSize: 'medium',
		fontWeight: '500'
	}
}));


export const useChipsStyles = makeStyles(theme => ({
	chipContainer: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
		'& p': {
			fontSize: 'smaller'
		}
	},
	chipRow1: {
		display: 'flex',
		marginTop: theme.spacing(2),
	},
	chipRow2: {
		display: 'flex',
		marginTop: theme.spacing(4),
	},
	item: {
		width: '50%',
		marginLeft: '15%'
	}
}));
