const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const TRASH_COMMENT = "comments/TRASH_COMMENT";

const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

const trashComment = (commentId) => ({
    type: TRASH_COMMENT,
    commentId
})

export const getComments = function ({ projectId }) {
    return async (dispatch) => {
        const response = await fetch(`/api/comments/${projectId}`)

        if (response.ok) {
            const comments = await response.json();
            dispatch(loadComments(comments));
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ['An error occurred. Please try again.'];
        }
    }
}

export const postComment = function ({ authorId, projectId, stepId, reply, type, content }) {
    return async (dispatch) => {
        const response = await fetch("/api/comments/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author_id: authorId,
                project_id: projectId,
                step_id: stepId,
                reply,
                type,
                content
            }),
        })

        if (response.ok) {
            const { comment } = await response.json();
            dispatch(createComment(comment));
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ['An error occurred. Please try again.'];
        }
    }
}

export const putComment = function ({ commentId, authorId, projectId, stepId, reply, type, content }) {
    return async (dispatch) => {
        const response = await fetch("/api/comments/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: commentId,
                author_id: authorId,
                project_id: projectId,
                step_id: stepId,
                reply,
                type,
                content
            })
        })

        console.log('here is the response', response)

        if (response.ok) {
            const comment = await response.json();
            console.log('here is the new comment', comment)
            dispatch(editComment(comment));
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ['An error occurred. Please try again.'];
        }
    }
}

export const deleteComment = function ({ commentId }) {
    return async (dispatch) => {
        const response = await fetch("/api/comments/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: commentId })
        })

        if (response.ok) {
            dispatch(trashComment(commentId));
        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return ['An error occurred. Please try again.'];
        }
    }
}

export default function reducer(stateDotComments = {}, action) {
    let updatedState = { ...stateDotComments };
    switch (action.type) {
        case LOAD_COMMENTS:
            action.comments.forEach(comment => {
                updatedState[action.comment.id] = comment;
            })
            return updatedState;
        case CREATE_COMMENT:
            return updatedState;
        case EDIT_COMMENT:
            updatedState[action.comment.id] = action.comment;
            return updatedState;
        case TRASH_COMMENT:
            delete updatedState[action.commentId];
            return updatedState;
        default:
            return stateDotComments;
    }
}
