import React, { useState, useEffect } from 'react'
import { useChipsStyles } from './styles'
import { Typography, Chip } from '@material-ui/core'
import { courseService } from '../../../core/service/course/courseService'
import { questionKeyValue } from './questionKeyValues'

function Chips({ question }) {
	const classes = useChipsStyles()
	const [courses, setCourses] = useState([]);
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		courseService.getCourses(801).then(res => {
			setCourses(res.data);
		})
	}, [])

	useEffect(() => {
		courseService.getCourseCategories(question.course_id)
			.then(res => {
				setCategories(res.data);
			});
		// eslint-disable-next-line
	}, [question.course_id]);

	const GetValueByNameAndKey = ({ type }) => {
		if (!question.id || courses.length === 0 || categories.length === 0)
			return ''
		switch (type) {
			case 1:
				return <Typography>
					{
						courses.find(item => item.id === question.course_id).title
					}
				</Typography>
			case 2:
				return <Typography>
					{
						categories.find(item => item.id === question.category_id).title
					}
				</Typography>
			case 3:
				return <Typography>
					{
						questionKeyValue.levels.find(item => item.id === question.level).title
					}
				</Typography>
			case 4:
				return <Typography>
					{
						questionKeyValue.options.find(item => item.id === question.correct_option).title
					}
				</Typography>
			default:
				return ''
		}
	}

	return (
		<div className={classes.chipContainer}>
			<div className={classes.chipRow1}>
				<div className={classes.item}>
					<div>نام درس</div>
					<div><Chip color='secondary' size="medium" label={<GetValueByNameAndKey type={1}></GetValueByNameAndKey>} /></div>
				</div>
				<div className={classes.item}>
					<div>نام فصل</div>
					<div><Chip color='secondary' size="medium" label={<GetValueByNameAndKey type={2}></GetValueByNameAndKey>} /></div>
				</div>
			</div>
			<div className={classes.chipRow2}>
				<div className={classes.item}>
					<div>سطح سوال</div>
					<div><Chip color='secondary' size="medium" label={<GetValueByNameAndKey type={3}></GetValueByNameAndKey>} /></div>
				</div>
				<div className={classes.item}	>
					<div>گزینه ی صحیح</div>
					<div><Chip color='secondary' size="medium" label={<GetValueByNameAndKey type={4}></GetValueByNameAndKey>} /></div>
				</div>
			</div>
		</div>
	)
}

export { Chips }