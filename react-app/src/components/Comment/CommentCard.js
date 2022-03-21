import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment, putComment, deleteComment } from '../../store/comments';

export default function CommentCard({ comment }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user?.id);
	const steps = useSelector(state => state.steps);

	const [editable, setEditable] = useState(false);
	const [originalContent, setOriginalContent] = useState(comment.content);
	const [content, setContent] = useState(comment.content || "");
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [replyContent, setReplyContent] = useState("");

	const replyOrComment = comment.reply ? "reply" : "comment";

	const dateConverter = (commentTimestamp) => { //TODO #214 comment dateConverter often off by an hour
		const currentDate = new Date();
		const commentDate = Date.parse(commentTimestamp);
		let seconds = ((currentDate - (commentDate + 21599000)) / 1000);

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

	const submitReply = async (e, parentId) => {
		dispatch(postComment({
			authorId: userId,
			projectId: comment.projectId,
			stepId: null,
			reply: parentId,
			type: "reply",
			content: replyContent
		}))
		setShowReplyForm(false);
		setReplyContent('');
	}

	return (
		<div className={`${replyOrComment}-card`}>
			<div>
				<a className={`${comment.type}-username`} href={`/users/${comment.author.id}`}>{`${comment.author.username}'s ${comment.type}`}</a>
				{comment.stepId && <>
					<span className="updated-tag"> on </span>
					<a href={`/projects/${comment.projectId}#step-${steps[comment.stepId]?.stepNumber}`} className="step-anchor">Step {steps[comment.stepId]?.stepNumber}</a>
				</>}
				<span className="updated-tag pad-left">updated {dateConverter(comment.updatedAt)} ago</span>
			</div>
			<input className="comment-content"
				disabled={!editable}
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className="comment-btns">
				<button hidden={!userId || editable || comment.reply}
					value={comment.id}
					onClick={(e) => setShowReplyForm(true)}
				>
					<i className="fa-solid fa-reply" />
				</button>
				<button hidden={!userId || editable}
					onClick={(e) => setEditable(true)}
				>
					<i className="fa-solid fa-pen-to-square" />
				</button>
				<button hidden={!userId || editable}
					onClick={() => {
						dispatch(deleteComment({ commentId: comment.id }));
						setEditable(false);
					}}
				>
					<i className="fa-solid fa-trash-can" />
				</button>
				<button hidden={!userId || !editable || !content}
					onClick={e => {
						dispatch(putComment({
							commentId: comment.id,
							content
						}));
						setOriginalContent(content);
						setEditable(false);
					}}
				>
					<i className="fa-solid fa-floppy-disk" />
				</button>
				<button hidden={!userId || !editable} onClick={e => { setContent(originalContent); setEditable(false); }}><i className="fa-solid fa-rotate-left" /></button>
			</div>
			{showReplyForm &&
				<div className="reply-form">
					<input type="text"
						placeholder="add your reply..."
						value={replyContent}
						onChange={(e) => setReplyContent(e.target.value)}
						required
					/>
					<div className='comment-container-buttons'>
						<button className='submit-comment-button' type="submit" onClick={(e) => submitReply(e, comment.id)}>Reply to {comment.author.username}</button>
						<button className='discard-comment-button' type="button" onClick={e => setShowReplyForm(false)}>Cancel</button>
					</div>
				</div>
			}
		</div>
	)
}
