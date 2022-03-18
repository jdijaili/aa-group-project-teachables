import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, postComment } from '../../store/comments';
import './comment.css';
import CommentCard from './CommentCard';

export default function CommentSection() {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user?.id);
	let { projectId } = useParams();
	projectId = parseInt(projectId);
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [comment, setComment] = useState('');

	const allComments = useSelector(state => state.comments);
	const commentTable = { base: [] };
	for (const id in allComments) {
		const comment = allComments[id];
		if (comment.projectId === projectId) {
			if (comment.reply) {
				if (commentTable[comment.reply]) {
					commentTable[comment.reply].push(comment);
				} else {
					commentTable[comment.reply] = [comment];
				}
			} else {
				commentTable.base.push(comment);
			}
		}
	}

	useEffect(() => {
		dispatch(getComments({ projectId }))
	}, [dispatch, projectId]);

	const handleCancelClick = (e) => {
		e.preventDefault();
		setShowCommentForm(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let submittedComment = dispatch(postComment({
			authorId: userId,
			projectId,
			stepId: null,
			reply: null,
			type: 'comment',
			content: comment
		}))
		if (submittedComment) {
			setShowCommentForm(false);
			setComment('');
		}
	}

	return (
		<section id="comment-section" className="add-comment">
			<div hidden={!userId}>
				<h1 className='comment-header'>Leave a comment...</h1>
				<button onClick={() => setShowCommentForm(true)}>Create a Comment</button>
			</div>
			<br />
			{showCommentForm &&
				<form className='new-comment-container' onSubmit={handleSubmit}>
					<input type="text" placeholder="add your comment..." onChange={(e) => setComment(e.target.value)} required />
					<div className='comment-container-buttons'>
						<button className='submit-comment-button' type="submit">Post Comment</button>
						<button className='discard-comment-button' type="button" onClick={handleCancelClick}>Cancel</button>
					</div>
				</form>
			}
			<br />
			<div className="comment-container">
				<div className="comment-count">Comments: {commentTable?.base.length}</div>
				{commentTable?.base.map((comment, i) => {
					return (
						<div key={comment.id}>
							<hr />
							<CommentCard comment={comment} />
							{commentTable?.base.length === i + 1 && <hr />}
							{commentTable?.[comment.id]?.map(reply => {
								return (
									<CommentCard comment={reply} key={reply.id} />
								)
							})}
						</div>
					)
				})}
			</div>
		</section>
	)
}
