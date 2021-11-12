import { useState, useEffect } from 'react';

function Comment(props) {

    const [comments, setComments] = useState();

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`/api_v1/books/comments`);
            const data = await response.json();
            console.log({ data });
            setComments(data);
        }
        getComments();
        console.log({ comments })

    }, [])

    console.log({ comments })
    const commentHTML = comments?.map(comment =>
        <div className="comment-list" key={comment.id} value={comment?.book}>
            <h4>{comment?.user_name}</h4>
            <p>{comment?.body}</p>
            <p>{comment?.user_name}</p>
        </div>)


    return (
        <>
            {commentHTML}
        </>
    )
}

export default Comment;