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
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState(null);
    const [replyValue, setReplyValue] = useState(null);
    const [editable, setEditable] = useState(false);
    const [comment, setComment] = useState('');
    let commentObject = useSelector(state => state.comments)
    let commentArr = Object.values(commentObject)
    let onlyCommentArr = [];
    let onlyReplyArr = [];
    console.log('onlyReplies',onlyReplyArr)
    commentArr.forEach(c => {
        if (c.reply === null) {
            onlyCommentArr.push(c)
        } else {
            onlyReplyArr.push(c)
        }
    })
    
    function appendReplies (reply)  {
        const parent = document.getElementsByClassName(`comment-${reply.reply}`)
        console.log('reply', reply.reply)
        console.log('parent', parent)
        console.log('parent index 0', parent[0])
        let replyContainer = document.createElement('div')
        replyContainer.className = `reply-container-${reply.id}`
        
        let replyText = document.createElement('div')
        let replyUsername = document.createElement('p')
        replyUsername.innerText = reply.username
        replyUsername.className = 'reply-username'
        let replyContent = document.createElement('p')
        replyContent.innerText = reply.content
        replyContent.className = 'reply-content'
        let replyBtns = document.createElement('div')
        let replyEdit = document.createElement('button')
        replyEdit.innerText = 'Edit'
        replyEdit.className = 'reply-edit'
        let replyDelete = document.createElement('button')
        replyDelete.innerText = 'Delete'
        replyDelete.className = 'reply-delete'
        
        replyText.appendChild(replyUsername)
        replyText.appendChild(replyContent)
        replyBtns.appendChild(replyEdit)
        replyBtns.appendChild(replyDelete)
        replyContainer.appendChild(replyText)
        replyContainer.appendChild(replyBtns)

        //change

        // console.log('the reply container', replyContainer)
        
        if (parent.length) {
            console.log('made it here')
            // how can I append this adjacently? - insertAdjacentHTML is not working 
            parent[0].appendChild(replyContainer)
            // parent[0].insertAdjacentElement("after", replyContainer)
            // parent[0].insertAdjacentHTML(replyContainer)

        } else {
            console.log('made it to no comment parent case')
            return null
        }
        
    }

    useEffect(() => {
        dispatch(getComments({projectId}))
    }, [dispatch, projectId])


    const dateConverter = (date) => {
        return Date.now() - Date.parse(date)
    }


    const handleCancelClick = (e) => {
        e.preventDefault();
        setShowCommentForm(false);
        setShowReplyForm(false);
        setReply(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let stepId = null;
        let reply = null;
        let type = 'eightmax';
        let content = comment;
        let data = {authorId, projectId, stepId, reply, type, content}
        let newComment = dispatch(postComment(data))
        console.log(newComment, 'newCommnet')
        if (newComment) {
            setShowCommentForm(false);
            setComment('');
        }
    }

    const handleReplySubmit = (e) => {
        e.preventDefault()
        let stepId = null;
        let type = 'eightmax';
        let content = comment;
        let data = {authorId, projectId, stepId, reply, type, content}
        let newReply = dispatch(postComment(data))
        if (newReply) {
            setShowReplyForm(false);
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
        body.innerHTML = comment;
        setEditable(false);
    }

    const activeEdit = (e, id) => {
        setEditable(true);
        let commentBody = document.querySelector(`.comment-body-${id}`)
        setComment(commentBody.innerText)
    }

    const activeReply = (e, id) => {
        setShowReplyForm(true);
        setReplyValue(id);
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
                <div className="comment-count">Comments: {onlyCommentArr.length}</div>
                {onlyCommentArr?.map((comment, i) => {
                    return (
                        <>
                        {/*  */}
                            <hr />
                            <li className={`comment-list comment-${comment.id}`} key={comment.id}>
                                <div className="comments-text">
                                    <p className="comment-username">{comment.username} {Date.now()} {Date.parse(comment.updatedAt)} {dateConverter(comment.updatedAt)}</p>
                                    <p className={`comment-body comment-body-${comment.id}`} id={comment.id} contentEditable={editable} suppressContentEditableWarning={true} onChange={(e) => setComment(e.target.value)}>{comment.content}</p>
                                </div>
                                <div className="comments-btns">
                                    <button className="reply-btn" value={comment.id} onClick={(e) => activeReply(e, comment.id)}>Reply</button>
                                    <button hidden={(!(authorId === comment.authorId) || (editable))} onClick={(e) => activeEdit(e, comment.id)}>Edit</button>
                                    <button hidden={!(authorId === comment.authorId)} onClick={() => removeComment(comment.id)}>Delete</button>
                                </div>
                                {(showReplyForm && (comment.id === replyValue))?
                                    <div className="reply-form">
                                        <form onSubmit={handleReplySubmit}>
                                            <input type="text" placeholder="add your reply..." onChange={(e) => setComment(e.target.value)} required></input>
                                            <button type="submit" onClick={() => setReply(comment.id)}>Reply to {comment.username}</button>
                                            <button type="button" onClick={handleCancelClick}>Nevermind</button>
                                        </form>
                                    </div> : null
                                }
                                {editable &&
                                <div hidden={(!(authorId === comment.authorId))}>
                                    <form id={comment.id} onSubmit={e => saveUpdate(e, comment.id)}>
                                        <button type="submit">Save</button>
                                        <button type="button" onClick={e => cancelUpdate(e, comment.id)}>Cancel</button>
                                    </form>
                                </div>
                                }
                            </li>
                            {(onlyCommentArr.length === (i + 1)) ? <hr className="botttom-hr"/> :  null}
                        </>
                    )
                })}
                {onlyReplyArr?.forEach(reply => {
                    // check if reply is in dom
                    if (!document.getElementsByClassName(`reply-container-${reply.id}`).length) {
                        appendReplies(reply)
                    } 
                })}
            </div>
        </section>
    )
}

export default Comment;