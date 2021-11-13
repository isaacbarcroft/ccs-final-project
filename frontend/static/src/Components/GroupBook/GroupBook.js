import { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Comment from '../Comment/Comment';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';

function GroupBook(props) {
    const [book, setBook] = useState();
    const { id } = useParams()
    const [comment, setComment] = useState('');
    const [edit, setEdit] = useState();
    let history = useHistory();
    const redirect = () => {
        history.push(`/groups/${book.group}`)
    }

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

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value)
        setComment(prevState => ({
            ...prevState,
            [name]: value,
        }));
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
        booksHTML =
            <Card id={book.id} style={{ flexDirection: 'row', marginBottom: '30px' }}>
                <Card.Img className="cardImg" variant="top" src={book.image} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                </Card.Body>

            </Card>


        commentHTML = book?.book_comments.map(comment =>
            edit ?
                <div>
                    <form>
                        <textarea onChange={handleChange} type='text' value={comment.body} name='comments' placeholder={comment.body} />
                        <p>{comment.user_name}</p>
                        <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(false)}>Cancel</button>
                        <button type='button' id={comment.id} onClick={() => editComment(comment)} className='btn btn-dark mx-1 mb-5'>Submit</button>
                    </form>
                    <div className="col">

                    </div>
                </div>
                :
                <div>
                    <p className="commentBody">{comment.body}</p>
                    <p className="commentUser">{comment.user_name}</p>
                    <button className="btn delete-btn" value={comment.id} onClick={() => deleteComment(comment)}>Delete</button>
                    <button className="btn edit-btn" value={comment.id} onClick={() => setEdit(true)}>Edit</button>
                </div >)

    }
    console.log({ commentHTML })

    return (
        <>
            <header>
                <div>
                    <button className="btn btn-dark backToGroups" onClick={redirect} >Back to Groups</button>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {booksHTML}
                    </div>
                    <div className="col mt-3 shadow p-3 mb-5 bg-body rounded mt-3">
                        <h4>Comments</h4>
                        {commentHTML}
                        <div className="commentForm">
                            <form className="Message-form" onSubmit={handleSubmit}>
                                <textarea name="text" value={comment} type="text" placeholder={book.title ? `thoughts on  #${book?.title}` : 'comment'} onChange={handleTextChange} />
                                <button type="submit" className="submit_btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GroupBook;