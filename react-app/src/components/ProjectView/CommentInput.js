import { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../../store/comments";

export default function CommentInput({ authorId, projectId, stepId }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
	const [type, setType] = useState("");

	function revealInput(type) {
		if (authorId) {
			setType(type);
		}
	}

	return (
		<>
			{!type ?
				(<>
					<button onClick={_event => { revealInput("tip") }}>Add a tip</button>
					<button onClick={_event => { revealInput("comment") }}>Make a comment</button>
					<button onClick={_event => { revealInput("question") }}>Ask a question</button>
				</>) :
				(<>
					<input
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
					<button onClick={_event => {
						dispatch(postComment({ authorId, projectId, stepId, reply: null, type, content }));
						setType("");
						setContent("");
						document.querySelector("#comment-section").scrollIntoView();
					}}>Submit</button>
					<button onClick={_event => { setType(""); setContent(""); }}>Cancel</button>
				</>)
			}
		</>
	)
}
