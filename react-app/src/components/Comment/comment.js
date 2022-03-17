import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, postComment, putComment, deleteComment } from '../../store/comments';
import './comment.css';

export default function Comment() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session?.user);
	const userId = user?.id
	let { projectId } = useParams();
	projectId = parseInt(projectId);
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [reply, setReply] = useState(null);
	const [replyValue, setReplyValue] = useState(null);
	const [editCommentId, setEditCommentId] = useState("");
	const [comment, setComment] = useState('');
	// const [errors, setErrors] = useState([]);
	let commentObject = useSelector(state => state.comments);
	let commentArr = Object.values(commentObject);
	let onlyCommentArr = [];
	let onlyReplyArr = [];
	commentArr.forEach(c => {
		if ((c.reply === null) && (c.projectId === projectId)) {
			onlyCommentArr.push(c)
		} else if (c.projectId === projectId) {
			onlyReplyArr.push(c)
		}
	})
	let steps = useSelector(state => state.steps);

	useEffect(() => {
		dispatch(getComments({ projectId }))
	}, [dispatch, projectId]);

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
		})).catch(async (res) => {
			await res.json();
			// const data = await res.json();
			// if (data && data.errors) {
			// 	console.log(data.errors);
			// 	setErrors(data.errors);
			// }
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

	const saveUpdate = (e, id, cId) => {
		e.preventDefault();
		const type = cId ? "reply" : "comment";
		dispatch(putComment({
			commentId: id,
			authorId: userId,
			projectId,
			stepId: null,
			reply: cId,
			type,
			content: document.getElementById(id).innerText
		}));
		document.querySelector(`#${type}-${id}`).contentEditable = false;
		setEditCommentId("");
	}

	const cancelUpdate = (e, id, isReply) => {
		const type = isReply ? "reply" : "comment";
		const commentInput = document.querySelector(`#${type}-${id}`);
		commentInput.innerHTML = comment;
		commentInput.contentEditable = false;
		setEditCommentId("");
	}

	const activeEdit = (e, id, isReply) => {
		setEditCommentId(id);
		const type = isReply ? "reply" : "comment";
		let commentBody = document.querySelector(`#${type}-${id}`);
		commentBody.contentEditable = true;
		setComment(commentBody.innerText);
	}

	const activeReply = (e, id) => {
		setReplyValue(id);
		setShowReplyForm(true);
	}

	const removeComment = (commentId) => {
		dispatch(deleteComment({ commentId }));
		setEditCommentId("");
	}

	return (
		<section id="comment-section" className="add-comment">
			<h1 className='comment-header'>Leave a comment...</h1>
			<button onClick={user ? () => setShowCommentForm(true) : null}>Create a Comment</button>
			<br />
			{showCommentForm &&
				<form className='new-comment-container' onSubmit={handleSubmit}>
					<input type="text" placeholder="add your comment..." onChange={(e) => setComment(e.target.value)} required />
					<div className='comment-container-buttons'>
						<button className='submit-comment-button' type="submit">Post Comment</button>
						<button className='discard-comment-button' type="button" onClick={handleCancelClick}>Nevermind</button>
					</div>
				</form>
			}
			<br />
			<div className="comment-container">
				<div className="comment-count">Comments: {onlyCommentArr.length}</div>
				{onlyCommentArr.map((comment, i) => {
					return (
						<div key={comment.id}>
							<hr />
							<li className="comment-parent">
								<div className="comment-list">
									<div className="comments-text">
										<p className="comment-username">{comment.username}
											<span className="updated-tag pad-left">updated {dateConverter(comment.updatedAt)} ago</span>
											{comment.stepId && <>
												<span className="updated-tag"> on </span>
												<a href={`/projects/${projectId}#step-${steps[comment.stepId]?.stepNumber}`} className="comment-username">Step {steps[comment.stepId]?.stepNumber}</a>
											</>}
										</p>
										<p id={`comment-${comment.id}`} suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{comment.content}</p>
									</div>
									<div className="comments-btns">
										<button hidden={!user || editCommentId} value={comment.id} onClick={(e) => activeReply(e, comment.id)}><i className="fa-solid fa-reply" /></button>
										<button hidden={!user || editCommentId} onClick={(e) => activeEdit(e, comment.id, false)}><i className="fa-solid fa-pen-to-square" /></button>
										<button hidden={!user || editCommentId} onClick={() => removeComment(comment.id)}><i className="fa-solid fa-trash-can" /></button>
										<button hidden={!user || editCommentId !== comment.id} onClick={e => saveUpdate(e, comment.id, "")}><i className="fa-solid fa-floppy-disk"/></button>
										<button hidden={!user || editCommentId !== comment.id} onClick={e => cancelUpdate(e, comment.id, false)}><i className="fa-solid fa-rotate-left" /></button>
									</div>
									{showReplyForm && comment.id === replyValue &&
										<div className="reply-form">
											<form className='new-comment-container' onSubmit={handleReplySubmit}>
												<input type="text" placeholder="add your reply..." onChange={(e) => setComment(e.target.value)} required />
												<div className='comment-container-buttons'>
													<button className='submit-comment-button' type="submit" onClick={() => setReply(comment.id)}>Reply to {comment.username}</button>
													<button className='discard-comment-button' type="button" onClick={handleCancelClick}>Nevermind</button>
												</div>
											</form>
										</div>
									}
								</div>
							</li>
							{onlyCommentArr.length === i + 1 && <hr />}
							{onlyReplyArr.map(reply => {
								if (reply.reply === comment.id) {
									return (
										<li key={reply.id} className={`reply-parent`}>
											<div className="reply-list">
												<div className="reply-text">
													<p className="reply-username">{reply.username}
														<span className="updated-tag pad-left">updated {dateConverter(reply.updatedAt)} ago</span>
													</p>
													<p id={`reply-${reply.id}`} contentEditable='false' suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{reply.content}</p>
												</div>
												<div className="reply-btns">
													<button hidden={!user || editCommentId} onClick={(e) => activeEdit(e, reply.id, true)}><i className="fa-solid fa-pen-to-square" /></button>
													<button hidden={!user || editCommentId} onClick={() => removeComment(reply.id)}><i className="fa-solid fa-trash-can" /></button>
													<button hidden={!user || !editCommentId} onClick={e => saveUpdate(e, reply.id, reply.reply)}><i className="fa-solid fa-floppy-disk"/></button>
													<button hidden={!user || !editCommentId} onClick={e => cancelUpdate(e, reply.id, true)}><i className="fa-solid fa-rotate-left" /></button>
												</div>
											</div>
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
