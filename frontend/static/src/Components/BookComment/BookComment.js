import { useState } from 'react';


function BookComment(props) {

    const commentsHTML = props.comments?.map(comment =>
        <div className="comment-list" key={comment.id} value={comment.book}>
            <h4>{comment.user_name}</h4>
            <p>{comment.body}</p>
            <p>{comment.book}</p>
        </div>)

    return (
        <>
            {commentsHTML}
        </>

    )
}

export default BookComment;