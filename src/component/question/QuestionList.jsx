import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { questionActions } from '../../core/store/_actions';
import { connect } from 'react-redux';
import { Container, LinearProgress, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		'& a': {
			textDecoration: 'none'
		}
	},
	container: {
		width: '80%',
		margin: 'auto',
		marginTop: '80px'
	},
	addButton: {
		float: 'right',
		marginBottom: '16px'
	}
});
function QuestionList(props) {
	const classes = useStyles();

	const [questions, setQuestions] = useState([]);
	useEffect(() => {
		setTimeout(() => getQuestionList(), 500);
		// eslint-disable-next-line
	}, []);

	const getQuestionList = () => {
		props.getQuestions().then(res => setQuestions(res.data));
	}
	return <div className={classes.container}>
		<Button component={Link} to='/questions/add' className={classes.addButton} variant="contained" color="primary" size="large">
			افزودن
		</Button>
		{
			props.gettingQuestions && <Container>
				<LinearProgress />
			</Container>
		}
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>ردیف</TableCell>
						<TableCell align="left">سوال </TableCell>
						<TableCell align="left">سطح </TableCell>
						<TableCell align="left">وضعیت</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						questions.map((item, index) =>
							<TableRow component={Link} to={`questions/${item.id}`} key={index}>
								<TableCell>
									{index + 1}
								</TableCell>
								<TableCell component="th" scope="row">
									{item.question}
								</TableCell>
								<TableCell align="left">{item.level}</TableCell>
								<TableCell align="left">{item.status}</TableCell>
							</TableRow>)
					}
				</TableBody>
			</Table>
		</TableContainer>
	</div>
}

function mapState(state) {
	const { gettingQuestions } = state.question;
	return { gettingQuestions };
}

const actionCreators = {
	getQuestions: questionActions.getQuestions
}
const connectedQuestionListPage = connect(mapState, actionCreators)(QuestionList);
export { connectedQuestionListPage as QuestionList };