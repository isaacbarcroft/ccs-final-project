import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditOffIcon from '@mui/icons-material/EditOff';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';


function Comment(props) {
    const [editableComment, setEditableComment] = useState(props.comment);
    const [isEditing, setIsEditing] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setEditableComment(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    console.log('com', props.book)

    async function editComment(event) {

        const newComment = {
            user_name: props.admin.username,
            book: props.book.title,
            body: editableComment.body,
        };


        const response = await fetch(`/api_v1/books/${props.book.id}/comments/${event.id}/`, {
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
            console.log({ data })

            const updatedBook = { ...props.book };
            const comments = [...updatedBook.book_comments]
            const index = comments.findIndex(comment => comment.id === parseInt(data.id));
            comments[index] = data;
            updatedBook.book_comments = comments;
            props.setBook(updatedBook);
            setIsEditing(false)
        }
    }

    async function deleteComment(event) {
        const response = await fetch(`/api_v1/books/${props.book.id}/comments/${event.id}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not OK');
        } else {
            const updatedBook = { ...props.book };
            const comments = [...updatedBook.book_comments];
            const index = comments.findIndex(comment => comment.id == event.id);
            comments.splice(index, 1)
            updatedBook.book_comments = comments;
            props.setBook(updatedBook);
        }

    }

    // console.log({ props })

    return (
        <>
            {isEditing ?


                <form>

                    <textarea onChange={handleChange} type='text' value={editableComment.body} name='body' />
                    <p>{editableComment.user_name}</p>
                    <IconButton onClick={() => setIsEditing(false)}>
                        <EditOffIcon />
                    </IconButton>
                    <IconButton id={editableComment.id} onClick={() => editComment(editableComment)}>
                        <SendIcon id={editableComment.id} onClick={() => editComment(editableComment)} />
                    </IconButton>
                    {/* <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type='button' id={editableComment.id} onClick={() => editComment(editableComment)} className='btn btn-dark mx-1 mb-5'>Submit</button> */}
                </form>



                : (
                    <div>
                        <div class="direct-chat-info clearfix"> <span class="direct-chat-name pull-left">{props.comment.user_name}</span> <span class="direct-chat-timestamp pull-right">{props.comment.created_at}</span> </div>
                        <div class="direct-chat-text"> {props.comment.body} </div>

                        {/* <p className="commentBody">{props.comment.body}</p>
                        <p className="commentUser">{props.comment.user_name}</p> */}
                        {props.comment.user_name === props.admin.username ? (
                            <div>
                                <IconButton aria-label="delete"
                                    value={props.comment.id} onClick={() => setIsEditing(true)}>
                                    <EditIcon color="primary" />
                                </IconButton >
                                <IconButton value={props.comment.id} onClick={() => deleteComment(props.comment)}>
                                    <DeleteIcon />
                                </IconButton>
                                {/* <button className="btn delete-btn btn-dark" value={props.comment.id} onClick={() => deleteComment(props.comment)}>Delete</button>
                                <button className="btn edit-btn btn-dark" value={props.comment.id} onClick={() => setIsEditing(true)}>Edit</button> */}
                            </div>

                        ) : (null)
                        }
                    </div >
                )
            }
        </>
    )
}

export default Comment;