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
	// const [errors, setErrors] = useState([]); //TODO #186 display comment errors
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

		const d = Math.floor(seconds / (3600 * 24));
		const h = Math.floor(seconds % (3600 * 24) / 3600);
		const m = Math.floor(seconds % 3600 / 60);
		const s = Math.floor(seconds % 60);

		const dDisplay = d > 0 ? `${d} day${d === 1 ? "" : "s"} ` : "";
		const hDisplay = h > 0 && d === 0 ? `${h} hour${h === 1 ? "" : "s"} ` : "";
		const mDisplay = m > 0 && h === 0 ? `${m} minute${m === 1 ? "" : "s"} ` : "";
		const sDisplay = s > 0 && m === 0 ? `${s} second${s === 1 ? "" : "s"} ` : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
	}

	const handleCancelClick = (e) => {
		e.preventDefault();
		setShowCommentForm(false);
		setShowReplyForm(false);
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
			.catch(async (res) => {
				await res.json();
				// const data = await res.json();
				// if (data && data.errors) setErrors(data.errors)
			})
		if (submittedComment) {
			setShowCommentForm(false);
			setComment('');
		}
	}

	const handleReplySubmit = async (e) => {
		e.preventDefault()
		let newReply = dispatch(postComment({
			authorId: userId,
			projectId,
			stepId: null,
			reply,
			type: "reply",
			content: comment
		}))
		if (newReply) {
			setShowReplyForm(false);
			setComment('')
		}
	}

	const saveUpdate = async (e, commentId) => {
		e.preventDefault();
		dispatch(putComment({
			commentId,
			authorId: userId,
			projectId,
			stepId: null,
			reply: null,
			type: "comment",
			content: document.getElementById(commentId).innerText
		}))
		let commentBody = document.querySelector(`.comment-body-${commentId}`)
		commentBody.contentEditable = false;
		setEditable(false)
	}

	const saveReplyUpdate = (e, id, cId) => {
		e.preventDefault();
		dispatch(putComment({
			commentId: id,
			authorId: userId,
			projectId,
			stepId: null,
			reply: cId,
			type: "reply",
			content: document.getElementById(id).innerText
		}))
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
						<div key={i}>
							<hr key={`hrkey-${comment.id}`} />
							<li key={`container-for-${comment.id}`} className={`comment-parent comment-parent-${comment.id}`}>
								<div className={`comment-list comment-${comment.id}`} key={comment.id}>
									<div className="comments-text">
										<p className="comment-username">{comment.username} <span className="updated-tag">updated {dateConverter(comment.updatedAt)} ago</span></p>
										<p className={`comment-body comment-body-${comment.id}`} id={comment.id} suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{comment.content}</p>
									</div>
									<div className="comments-btns">
										<button className="reply-btn" hidden={(editable)} value={comment.id} onClick={(e) => activeReply(e, comment.id)}>Reply</button>
										<button hidden={(!(userId === comment.authorId) || editable)} onClick={(e) => activeEdit(e, comment.id)}>Edit</button>
										<button hidden={(!(userId === comment.authorId) || editable)} onClick={() => removeComment(comment.id)}>Delete</button>
									</div>
									{(showReplyForm && (comment.id === replyValue)) ?
										<div className="reply-form">
											<form className='new-comment-container' onSubmit={handleReplySubmit}>
												<input type="text" placeholder="add your reply..." onChange={(e) => setComment(e.target.value)} required></input>
												<div className='comment-container-buttons'>
													<button className='submit-comment-button' type="submit" onClick={() => setReply(comment.id)}>Reply to {comment.username}</button>
													<button className='discard-comment-button' type="button" onClick={handleCancelClick}>Nevermind</button>
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
													<button hidden={(!(userId === reply.authorId) || editable)} onClick={(e) => activeEditReply(e, reply.id)}>Edit</button>
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
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Comment;
