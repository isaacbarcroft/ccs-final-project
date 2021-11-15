import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Comment from '../Comment/Comment';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

function GroupBook(props) {
    const [book, setBook] = useState();
    const { id } = useParams()
    const [comment, setComment] = useState('');
    const [edit, setEdit] = useState();
    let history = useHistory();
    const redirect = () => {
        history.push(`/groups/${book.group}`)
    }

    console.log({ comment })

    useEffect(() => {
        getBook();
    }, []);

    useEffect(() => {
        getBook()
    }, [comment])

    console.log({ book })


    async function getBook() {
        const response = await fetch(`/api_v1/books/${id}`);
        const data = await response.json();
        setBook(data);

    }

    async function submitComment(text) {
        const newComment = {
            user_name: props.admin.username,
            book: book.title,
            body: text,
        };

        const response = await fetch(`/api_v1/books/${id}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newComment),

        });
        setComment('')
        if (response.ok) {
            return response.json();
        }
    }





    function handleChange(e) {
        const { name, value } = e.target;
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


        commentHTML = book?.book_comments.map(book_comment => {
            console.log({ book_comment })
            return (
                <Comment setBook={setBook} book={book} comment={book_comment} admin={props.admin} />
            )
        })
        // :
        // <div>
        //     <p className="commentBody">{book_comment.body}</p>
        //     <p className="commentUser">{book_comment.user_name}</p>
        //     {book_comment.user_name === props.admin.username ? (
        //         <div>
        //             <button className="btn delete-btn" value={book_comment.id} onClick={() => deleteComment(book_comment)}>Delete</button>
        //             <button className="btn edit-btn" value={book_comment.id} onClick={() => setEdit(true)}>Edit</button>
        //         </div>
        //     ) : (null)
        //     }
        // </div >)

    }

    return (
        <>
            <header>
                <div>
                    <button className="btn btn-dark backToGroups" onClick={redirect} >Back to Groups</button>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        {booksHTML}
                    </div>
                    <div className="col-md-8">
                        <div className="page-content page-container" id="page-content">
                            <div className="padding">
                                <div className="row container d-flex justify-content-center">

                                    <div className="box box-warning direct-chat direct-chat-warning">
                                        <div className="box-header with-border">
                                            <div className="box-body">
                                                <div className="direct-chat-messages">
                                                    <div className="direct-chat-msg">
                                                        <div class="box-body">
                                                            <div class="direct-chat-messages">
                                                                <div class="direct-chat-msg">
                                                                    {commentHTML}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="commentForm">
                            <form className="Message-form" onSubmit={handleSubmit}>
                                <textarea
                                    className="textArea"
                                    name="text"
                                    value={comment}
                                    type="text"
                                    placeholder={book.title ? `thoughts on  #${book?.title}` : 'comment'}
                                    onChange={handleTextChange}
                                    cols="25"
                                    rows="3"
                                />
                                <IconButton type="submit">
                                    <SendIcon />
                                </IconButton>
                                {/* <button type="submit" className="submit_btn btn btn-dark mx-2">Submit</button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GroupBook;