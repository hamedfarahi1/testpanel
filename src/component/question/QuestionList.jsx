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
import { Container, LinearProgress, Button, Icon, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { Bar } from 'react-chartjs-2';
import { questionService } from '../../core/service/question/questionService';

const barData = {
	labels: [],
	datasets: [
		{
			label: 'تعداد سوالات موجود در هر درس',
			backgroundColor: 'rgba(21,115,167,0.3)',
			borderColor: 'rgba(21,110,154,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(21,115,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: []
		}
	]
};

const useStyles = makeStyles((theme) => ({
	bar: {
		marginTop: '16px'
	},
	table: {
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
	},
	paginator: {
		direction: 'ltr',
		margin: 'auto'
	},
	paginatorContainer: {
		display: 'flex',
		marginTop: theme.spacing(5)
	}
}));


// pagination is disable
function QuestionList(props) {
	const classes = useStyles();

	// eslint-disable-next-line
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	const [questions, setQuestions] = useState([]);
	useEffect(() => {
		setTimeout(() => getQuestionList(), 500);
		getQuestionStats()
		// eslint-disable-next-line
	}, []);

	const handleChange = (event, value) => {
		setPage(value)
	}

	const getQuestionList = () => {
		props.getQuestions().then(res => {
			setQuestions(res.data);
			setPageCount(res.totalCount)
		});
	}

	const getQuestionStats = () => {
		questionService.getQuestionStats().then(res => {
			let data = res.data.items;
			barData.labels = [];
			barData.datasets[0].data = []
			data.forEach(item => {
				barData.labels.push(item.course_name);
				barData.datasets[0].data.push(item.count);
			})
		})
	}
	return <div className={classes.container}>
		<Button component={Link} to='/questions/add' className={classes.addButton} variant="contained" color="primary" size="large">
			<span>افزودن</span>
			<Icon>add</Icon>
		</Button>
		{
			props.gettingQuestions && <Container>
				<LinearProgress />
			</Container>
		}
		<Grid container spacing={3}>
			<Grid item xs={12} md={4} sm={12}>
				<Bar
					data={barData}
					width={80}
					height={80}
				/>
			</Grid>
			<Grid item xs={12} md={8} sm={12}>
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
									<TableRow component={Link} to={
										{
											pathname: `/questions/${item.id}`,
											state: { question: item }
										}
									} key={index}>
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
				<div className={classes.paginatorContainer}>
					<Pagination disabled onChange={handleChange} size="large" className={classes.paginator} count={pageCount} color="secondary" />
				</div>
			</Grid>

		</Grid>

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