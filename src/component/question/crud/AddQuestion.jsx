import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { questionActions } from '../../../core/store/_actions';
import { connect } from 'react-redux';
import { courseService } from '../../../core/service/course/courseService'
import { FormControl, InputLabel, Select, MenuItem, Paper, Grid, Button, LinearProgress, Typography } from '@material-ui/core';
import './styles.scss'
import MyTextField from '../../../shared/component/my-text-field/MyTextField';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { useAddQuestionStyles } from './styles'

function AddQuestion(props) {

	const classes = useAddQuestionStyles();
	const isMobile = useMediaQuery({ maxWidth: 500 })

	const [obj, setObj] = useState({
		course_id: 802,
		category_id: 701,
		level: 1,
		question: "",
		description: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		correct_option: 1,
		randomize: true,
		book_version: 0,
		for_game: true,
		for_exercise: true,
		has_answer: false
	})

	const levels = [
		{
			id: 1,
			title: 'آسان'
		},
		{
			id: 2,
			title: 'متوسط'
		},
		{
			id: 3,
			title: 'سخت'
		}
	]

	const options = [
		{
			id: 1,
			title: 'گزینه ی 1'
		},
		{
			id: 2,
			title: 'گزینه ی 2'
		},
		{
			id: 3,
			title: 'گزینه ی 3'
		},
		{
			id: 4,
			title: 'گزینه ی 4'
		}
	]
	const [courses, setCourses] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		courseService.getCourses(801).then(res => {
			setCourses(res.data);
		})
	}, [])

	useEffect(() => {
		courseService.getCourseCategories(obj.course_id)
			.then(res => {
				setCategories(res.data);
				setObj({ ...obj, category_id: res.data[0].id })
			});
		// eslint-disable-next-line
	}, [obj.course_id]);


	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(
			ContentState.createFromBlockArray(
				convertFromHTML('<p>شرح سوال ...</p>')
			)
		),
	);
	const inputLabel = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleEditorChange = (content) => {
		let editorSourceHTML = draftToHtml(convertToRaw(content.getCurrentContent()));
		setObj({ ...obj, description: editorSourceHTML })
		setEditorState(content)

	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setObj({ ...obj, [name]: value })
	}

	const isNotValidForm = () => {
		const { description, question, option1, option2, option3, option4 } = obj;
		return (!description ||
			!option1 ||
			!option2 ||
			!option3 ||
			!option4 ||
			!question) || description.length <= 30;
	}

	const addQuestion = () => {
		const values = { ...obj, description: obj.description.split('&nbsp;').join('') }
		if (!isNotValidForm())
			props.addQuestion(values);
	}

	function MySelect({ name, value, label, list }) {
		return <FormControl fullWidth variant="outlined">
			<InputLabel ref={inputLabel} id="select-outlined-label">
				{label}
			</InputLabel>
			<Select
				color='secondary'
				labelId="select-outlined-label"
				id="select-outlined"
				name={name}
				value={value}
				onChange={handleInputChange}
				labelWidth={labelWidth}
			>
				{list.map(
					item => <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
				)}
			</Select>
		</FormControl>
	}

	return <div className={classes.container}>
		<Paper className={clsx(classes.paper
			, { [classes.paperChange]: isMobile, 'fadein-con': props.addingJob })}>
			<Grid container spacing={3}>
				<Grid item sm={12} xs={12} md={12}>
					<Button style={{ float: 'left' }} color='secondary' disabled={isNotValidForm() || props.addingJob} variant="contained" onClick={addQuestion}>ثبت سوال</Button>
				</Grid>
				{props.addingJob &&
					<Grid item sm={12} xs={12} md={12}>
						<LinearProgress />
					</Grid>
				}
				<Grid item sm={6} xs={12} md={6}>
					<MyTextField autoFocus={true} onChange={handleInputChange} value={obj.question} field={'question'} label={'سوال'}></MyTextField>
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MySelect name={'course_id'} value={obj.course_id} label={'انتخاب درس'} list={courses} />
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MySelect name={'category_id'} value={obj.category_id} label={'انتخاب فصل'} list={categories} />
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MySelect name={'level'} value={obj.level} label={'سطح سوال'} list={levels} />
				</Grid>
				<Typography className={classes.editorTitle}>در ویرایشگر متنی زیر متن کامل سوال را وارد کنید</Typography>
				<Grid className={classes.editor} item sm={12} xs={12} md={12}>
					<Editor
						toolbar={
							{
								options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'history']
							}}
						defaultEditorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName"
						onEditorStateChange={handleEditorChange}
					/>
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MyTextField onChange={handleInputChange} value={obj.option1} field={'option1'} label={'گزینه 1'}></MyTextField>
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MyTextField onChange={handleInputChange} value={obj.option2} field={'option2'} label={'گزینه 2'}></MyTextField>
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MyTextField onChange={handleInputChange} value={obj.option3} field={'option3'} label={'گزینه 3'}></MyTextField>
				</Grid>
				<Grid item sm={6} xs={12} md={6}>
					<MyTextField onChange={handleInputChange} value={obj.option4} field={'option4'} label={'گزینه 4'}></MyTextField>
				</Grid>
				<Grid item sm={4} xs={4} md={4}>
					<MySelect name={'correct_option'} value={obj.correct_option} label={' گزینه صحیح'} list={options} />
				</Grid>
			</Grid>
		</Paper>
	</div>
}

function mapState(state) {
	const { addingQuestion } = state.question;
	return { addingQuestion }
}

const actionCreators = {
	addQuestion: questionActions.addQuestion
}
const connectedAddQuestionPage = connect(mapState, actionCreators)(AddQuestion)
export { connectedAddQuestionPage as AddQuestion }