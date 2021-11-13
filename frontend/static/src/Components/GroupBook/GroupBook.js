import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';
import Cookies from 'js-cookie';

function GroupBook(props) {
    const [book, setBook] = useState();
    const { id } = useParams()
    const [comment, setComment] = useState('');

    console.log({ props })
    console.log({ id })
    console.log({ book })

    useEffect(() => {
        getBook();
    }, []);

    useEffect(() => {
        getBook()
    }, [comment])

    async function getBook() {
        const response = await fetch(`/api_v1/books/${id}`);
        const data = await response.json();
        setBook(data);

    }

    async function submitComment(text) {
        const newComment = {
            user: props.admin.username,
            book: book.title,
            body: text,
        };
        console.log({ newComment });

        const response = await fetch(`/api_v1/books/${id}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newComment),

        });
        console.log(response)
        setComment([...comment, newComment])
        if (response.ok) {
            return response.json();
        }
    }

    async function deleteComment(event) {
        console.log(event.id);
        console.log('delete function');
        const response = await fetch(`/api_v1/books/${id}/comments/${event.id}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not OK');
        } else {
            const updatedComments = [...book.book_comments]
            console.log({ updatedComments })
            const index = updatedComments.findIndex(comment => comment.id === event.id);
            updatedComments.splice(index, 1);
            setComment(updatedComments);
            console.log({ updatedComments })
        }

    }

    async function editComment(text) {
        const newComment = {
            user: props.admin.username,
            book: book.title,
            body: text,
        };
        console.log({ newComment });

        const response = await fetch(`/api_v1/chats/${id}/messages/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newComment),

        });
        if (!response.ok) {
            throw new Error('Network response was not OK');
        } else {
            const data = await response.json();
            const updatedComments = [...book.book_comments]; /// ?????
            const index = updatedComments.findIndex(comment => comment.id === data.id);
            updatedComments[index] = data;
            setComment([...comment, newComment])
        }
    }


    function handleTextChange(event) {
        setComment(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        submitComment(comment);
        console.log(props)
        setComment('');

    }

    if (!book) {
        return <div>Loading ...</div>
    }



    let booksHTML;
    let commentHTML;
    if (book) {
        booksHTML = <div id={book.id} className="mb-5">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <img src={book.image} />
        </div>


        commentHTML = book?.book_comments.map(comment =>
            <div>
                <p>{comment.body}</p>
                <p>{comment.user_name}</p>
                <button className="btn delete-btn" value={comment.id} onClick={() => deleteComment(comment)}>Delete</button>
                <button className="btn edit-btn" value={comment.id} onClick={() => editComment(comment)}>Edit</button>
            </div>)

    }
    console.log({ commentHTML })

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {booksHTML}
                    </div>
                    <div className="col">
                        <h4>Comments</h4>
                        {commentHTML}
                    </div>
                </div>
            </div>
            <div className="commentForm">
                <form className="Message-form" onSubmit={handleSubmit}>
                    <textarea name="text" value={comment} type="text" placeholder={`thoughts on  #${book?.title}`} onChange={handleTextChange} />
                    <button type="submit" className="submit_btn">Submit</button>
                </form>
            </div>
        </>
    )
}

export default GroupBook;