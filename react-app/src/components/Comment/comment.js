import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getComments, postComment, putComment, deleteComment} from '../../store/comments';
import './comment.css';

const Comment = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session?.user)
    const authorId = user.id
    const {projectId} = useParams();
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [editable, setEditable] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(getComments({projectId}))
    }, [dispatch, projectId])

    let commentObject = useSelector(state => state.comments)
    let commentArr = Object.values(commentObject)

    const handleCancelClick = (e) => {
        e.preventDefault();
        setShowCommentForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let stepId = null;
        let reply = null;
        console.log('did we get to handlle')
        let type = 'eightmax';
        let content = comment;
        let data = {authorId, projectId, stepId, reply, type, content}
        let newComment = dispatch(postComment(data))
        if (newComment) {
            setShowCommentForm(false);
            setComment('');
        }
    }

    const saveUpdate = (e, commentId) => {
        e.preventDefault();
        const pendingComment = document.getElementById(commentId)
        const updatedCommentBody = pendingComment.innerHTML;
        let content = updatedCommentBody;
        let stepId = null;
        let reply = null;
        let type = 'eightmax';
        let data = {commentId, authorId, projectId, stepId, reply, type, content}
        dispatch(putComment(data))
        setEditable(false)
    }


    const cancelUpdate = (e, id) => {
        const body = document.querySelector(`.comment-body-${id}`)
        console.log('typeof comment', typeof comment)
        body.innerHTML = comment;
        setEditable(false);
    }

    const activeEdit = (e, id) => {
        setEditable(true);
        console.log(e.target.value)
        let commentBody = document.querySelector(`.comment-body-${id}`)
        setComment(commentBody.innerText)
    }

    const removeComment = (commentId) => {
        dispatch(deleteComment({commentId}));
        setEditable(false);
    }

    return (
        <section className="add-comment">
            <h1>Leave a comment...</h1>
            <button onClick={() => setShowCommentForm(true)}>Create a Comment</button>
            <br />
            {showCommentForm && 
            <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="add your comment..." onChange={(e) => setComment(e.target.value)} required></input>
                <button type="submit">Post Comment</button>
                <button type="button" onClick={handleCancelClick}>Nevermind</button>
            </form>
            </>
            }
            <br />
            <div className="comment-container">
                {commentArr?.map(comment => {
                    return (
                        <li key={comment.id}>
                            <p className="comment-username">User #{comment.authorId} commented:</p>
                            <p className={`comment-body-${comment.id}`} id={comment.id} contentEditable={editable} suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{comment.content}</p>
                            <button hidden={(!(authorId === comment.authorId) || (editable))} onClick={(e) => activeEdit(e, comment.id)}>Edit</button>
                            {editable &&
                            <div hidden={(!(authorId === comment.authorId))}>
                                <form id={comment.id} onSubmit={e => saveUpdate(e, comment.id)}>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={e => cancelUpdate(e, comment.id)}>Cancel</button>
                                </form>
                             </div>
                            }
                            <button hidden={!(authorId === comment.authorId)} onClick={() => removeComment(comment.id)}>Delete</button>
                        </li>
                    )
                })}
            </div>
        </section>
    )
}

export default Comment;