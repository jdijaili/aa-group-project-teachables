import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, postComment, putComment, deleteComment } from '../../store/comments';
import './comment.css';

const Comment = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session?.user)
	const userId = user?.id
	let { projectId } = useParams();
	projectId = parseInt(projectId, 10)
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [reply, setReply] = useState(null);
	const [replyValue, setReplyValue] = useState(null);
	const [editable, setEditable] = useState(false);
	const [comment, setComment] = useState('');
	const [errors, setErrors] = useState([]); //TODO #186 display comment errors
	let commentObject = useSelector(state => state.comments)
	let commentArr = Object.values(commentObject)
	let onlyCommentArr = [];
	let onlyReplyArr = [];
	commentArr.forEach(c => {
		if ((c.reply === null) && (c.projectId === projectId)) {
			onlyCommentArr.push(c)
		} else if (c.projectId === projectId) {
			onlyReplyArr.push(c)
		}
	})

	useEffect(() => {
		dispatch(getComments({ projectId }))
	}, [dispatch, projectId])

	const dateConverter = (comment) => {
		const currentDate = new Date();
		const commentDate = Date.parse(comment)
		let seconds = ((currentDate - (commentDate + 21599000)) / 1000)

		var d = Math.floor(seconds / (3600 * 24));
		var h = Math.floor(seconds % (3600 * 24) / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 60);

		var dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
		var hDisplay = ((h > 0) && (d === 0)) ? h + (h === 1 ? " hour " : " hours ") : "";
		var mDisplay = ((m > 0) && (h === 0)) ? m + (m === 1 ? " minute " : " minutes ") : "";
		var sDisplay = ((s > 0) && ((m === 0))) ? s + (s === 1 ? " second" : " seconds") : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
	}

	const handleCancelClick = (e) => {
		e.preventDefault();
		setShowCommentForm(false);
		setShowReplyForm(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let authorId = userId;
		let stepId = null;
		let reply = null;
		let type = 'comment';
		let content = comment;
		let newComment = { authorId, projectId, stepId, reply, type, content }
		let submittedComment = dispatch(postComment(newComment))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors)
			})
		if (submittedComment) {
			setShowCommentForm(false);
			setComment('');
		}
	}

	const handleReplySubmit = async (e) => {
		e.preventDefault()
		let authorId = userId;
		let stepId = null;
		let type = 'reply';
		let content = comment;
		let data = { authorId, projectId, stepId, reply, type, content }
		let newReply = dispatch(postComment(data))
		if (newReply) {
			setShowReplyForm(false);
			setComment('')
		}
	}

	const saveUpdate = async (e, commentId) => {
		e.preventDefault();
		const pendingComment = document.getElementById(commentId)
		const updatedCommentBody = pendingComment.innerText;
		let authorId = userId;
		let content = updatedCommentBody;
		let stepId = null;
		let reply = null;
		let type = 'comment';
		let data = { commentId, authorId, projectId, stepId, reply, type, content }
		dispatch(putComment(data))
		let commentBody = document.querySelector(`.comment-body-${commentId}`)
		commentBody.contentEditable = false;
		setEditable(false)
	}

	const saveReplyUpdate = (e, id, cId) => {
		e.preventDefault();
		const pendingReply = document.getElementById(id)
		const updatedReplyBody = pendingReply.innerText;
		let authorId = userId;
		let commentId = id;
		let content = updatedReplyBody;
		let stepId = null;
		let reply = cId;
		let type = 'reply';
		let data = { commentId, authorId, projectId, stepId, reply, type, content }
		dispatch(putComment(data))
		let replyBody = document.querySelector(`.reply-body-${id}`)
		replyBody.contentEditable = false;
		setEditable(false)
	}


	const cancelUpdate = (e, id) => {
		const body = document.querySelector(`.comment-body-${id}`)
		body.innerHTML = comment;
		setEditable(false);
	}

	const cancelReplyUpdate = (e, id) => {
		const body = document.querySelector(`.reply-body-${id}`)
		body.innerHTML = comment;
		setEditable(false);
	}

	const activeEdit = (e, id) => {
		setEditable(id)
		let commentBody = document.querySelector(`.comment-body-${id}`)
		commentBody.contentEditable = true;
		setComment(commentBody.innerText)
	}

	const activeReply = (e, id) => {
		if (user) {
			setReplyValue(id);
			setShowReplyForm(true);
		} else {
			// alert("must be logged in to reply to a comment")
		}
	}

	const activeEditReply = (e, id) => {
		setEditable(id)
		let replyBody = document.querySelector(`.reply-body-${id}`)
		replyBody.contentEditable = true;
		setComment(replyBody.innerHTML);
	}

	const removeComment = (commentId) => {
		dispatch(deleteComment({ commentId }));
		setEditable(false);
	}

	return (
		<section className="add-comment">
			<h1 className='comment-header'>Leave a comment...</h1>
			<button onClick={user ? () => setShowCommentForm(true) : null}>Create a Comment</button>
			<br />
			{showCommentForm &&
				<>
					<form className='new-comment-container' onSubmit={handleSubmit}>
						<input type="text" placeholder="add your comment..." onChange={(e) => setComment(e.target.value)} required></input>
						<div className='comment-container-buttons'>
							<button className='submit-comment-button' type="submit">Post Comment</button>
							<button className='discard-comment-button' type="button" onClick={handleCancelClick}>Nevermind</button>
						</div>
					</form>
				</>
			}
			<br />
			<div className="comment-container">
				<div className="comment-count">Comments: {onlyCommentArr.length}</div>
				{onlyCommentArr?.map((comment, i) => {
					return (
						<>
							<hr key={`hrkey-${comment.id}`} />
							<li key={`container-for-${comment.id}`} className={`comment-parent comment-parent-${comment.id}`}>
								<div className={`comment-list comment-${comment.id}`} key={comment.id}>
									<div className="comments-text">
										<p className="comment-username">{comment.username} <span className="updated-tag">updated {dateConverter(comment.updatedAt)} ago</span></p>
										<p className={`comment-body comment-body-${comment.id}`} id={comment.id} suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{comment.content}</p>
									</div>
									<div className="comments-btns">
										<button className="reply-btn" hidden={(editable)} value={comment.id} onClick={(e) => activeReply(e, comment.id)}>Reply</button>
										<button hidden={(!(userId === comment.authorId) || (editable))} onClick={(e) => activeEdit(e, comment.id)}>Edit</button>
										<button hidden={(!(userId === comment.authorId) || editable)} onClick={() => removeComment(comment.id)}>Delete</button>
									</div>
									{(showReplyForm && (comment.id === replyValue)) ?
										<div className="reply-form">
											<form className='new-comment-container' onSubmit={handleReplySubmit}>
												<input type="text" placeholder="add your reply..." onChange={(e) => setComment(e.target.value)} required></input>
												<div className='comment-container-buttons'>
													<button className='submit-comment-button'type="submit" onClick={() => setReply(comment.id)}>Reply to {comment.username}</button>
													<button className='discard-comment-button'type="button" onClick={handleCancelClick}>Nevermind</button>
												</div>
											</form>
										</div> : null
									}
									{(editable === comment.id) &&
										<div hidden={(!(userId === comment.authorId))}>
											<form id={comment.id} onSubmit={e => saveUpdate(e, comment.id)}>
												<button type="submit">Save</button>
												<button type="button" onClick={e => cancelUpdate(e, comment.id)}>Cancel</button>
											</form>
										</div>
									}
								</div>
							</li>
							{(onlyCommentArr.length === (i + 1)) ? <hr className="botttom-hr" key="key" /> : null}
							{onlyReplyArr?.map(reply => {
								if (reply.reply === comment.id) {
									return (
										<li key={`container-for-${reply.id}`} className={`reply-parent reply-parent-${reply.id}`}>
											<div className={`reply-list reply-${reply.id}`} key={reply.id}>
												<div className="reply-text">
													<p className="reply-username">{reply.username} <span className="updated-tag">updated {dateConverter(reply.updatedAt)} ago</span></p>
													<p className={`reply-body reply-body-${reply.id}`} id={reply.id} contentEditable='false' suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{reply.content}</p>
												</div>
												<div className="reply-btns">
													<button hidden={(!(userId === reply.authorId) || (editable))} onClick={(e) => activeEditReply(e, reply.id)}>Edit</button>
													<button hidden={!(userId === reply.authorId)} onClick={() => removeComment(reply.id)}>Delete</button>
												</div>
											</div>
											{(editable === reply.id) &&
												<div key={`editbtns-${reply.id}`} hidden={(!(userId === reply.authorId))}>
													<form id={reply.id} onSubmit={e => saveReplyUpdate(e, reply.id, reply.reply)}>
														<button type="submit">Save</button>
														<button type="button" onClick={e => cancelReplyUpdate(e, reply.id)}>Cancel</button>
													</form>
												</div>
											}
										</li>
									)
								} else {
									return (<></>)
								}
							})}
						</>
					)
				})}
			</div>
		</section>
	)
}

export default Comment;
