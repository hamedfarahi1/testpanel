import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useQuestionDetailStyles } from './styles';
import { Grid, Divider } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import './styles.scss'
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';
import { Chips } from './Chips';


function QuestionDetail(props) {
	const classes = useQuestionDetailStyles()
	const shouldDecrese = useMediaQuery({ maxWidth: 500 })
	const { question } = props.location.state;

	function createMarkUp() {
		// fix it later
		return { __html: ('' + question.description).split('&nbsp;').join('') }
	}

	if (!question)
		return <Redirect to={'/questions/list'} />
	return (
		<div>
			<Paper elevation={3} className={'backImgAnimate'}>
				<Typography className={classes.title} variant='h5'>{question.question}</Typography>
			</Paper>
			<div className={clsx(classes.paper, { [classes.decresePadding]: shouldDecrese })}>
				<Grid container spacing={2}>
					<Grid className={classes.side} item xs={12} md={12}>
						<Paper className={classes.item} elevation={3}>
							<img className={classes.attache} alt='' src={require('../../../assest/attache-png-6.png')} />

							<Chips question={question} />

							<Divider />
							<div className={classes.description} dangerouslySetInnerHTML={createMarkUp()}></div>
							<Typography className={classes.optionsInfo}>گزینه ها</Typography>
							<Typography className={classes.InfoItem}>{
								question.option1
							}</Typography>
							<Typography className={classes.InfoItem}>{
								question.option2
							}</Typography>
							<Typography className={classes.InfoItem}>{
								question.option3
							}</Typography>
							<Typography className={classes.InfoItem}>{
								question.option4
							}</Typography>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export { QuestionDetail }
