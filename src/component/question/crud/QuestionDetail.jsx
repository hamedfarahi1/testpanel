import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useQuestionDetailStyles } from './styles';
import { Grid, Divider } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import './styles.scss'
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { connect } from 'react-redux';


function QuestionDetail(props) {
	const { id } = useParams()
	const [question, setQuestion] = useState({})
	const classes = useQuestionDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })

	useEffect(() => {

		return () => {
			setQuestion({})
		}
		// eslint-disable-next-line
	}, [id])

	function createMarkUp() {
		// this is bug
		// fix it later
		return { __html: ('' + question.description).split('&nbsp;').join('') }
	}
	return (
		<div className={props.gettingJob && 'getting-question'}>
			<Paper elevation={3} className={'backImgAnimate'}>
				<Typography className={classes.title} variant='h5'>{question.title}</Typography>
			</Paper>
			<div className={clsx(classes.paper, { [classes.decresePadding]: shouldDecrese })}>
				<Grid container spacing={2}>
					<Grid className={classes.side} item xs={12} md={8}>
						<Paper className={classes.item} elevation={3}>
							<img className={classes.attache} alt='' src={require('../../../assest/attache-png-6.png')} />
							{
								// <Chips question={question} />
							}
							<Divider />
							<Typography className={classes.companyInfo}>
								{'اطلاعات شرکت'}
							</Typography>
							<Typography className={classes.companyInfoItem}>
								{'بیو: '}
								{question.id ? question.company.bio : ''}
							</Typography>
							<Typography className={clsx(classes.companyInfoItem, classes.companyAddress)}>
								{'آدرس: '}
								{question.id ? question.company.address : ''}
							</Typography>
							<Divider />
							<div className={classes.description} dangerouslySetInnerHTML={createMarkUp()}></div>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

function mapState(state) {
	const { gettingQuestion } = state.question;
	return { gettingQuestion }
}

const actionCreators = {
}

const connectedQuestionDetailsPage = connect(mapState, actionCreators)(QuestionDetail)
export { connectedQuestionDetailsPage as QuestionDetail }
