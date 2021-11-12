import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import { Redirect, useHistory, useParams, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BookComment from '../BookComment/BookComment';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import ReadMoreReact from 'read-more-react';
import Spinner from 'react-bootstrap/Spinner';
import GroupBookSearch from '../GroupBookSearch/GroupBookSearch';
import Cookies from 'js-cookie';


function Group(props) {
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar();
    const [group, setGroup] = useState();
    const [comments, setComments] = useState();
    const [comment, setComment] = useState('');
    const currentGroup = props.groups.filter((group) => group.id === parseInt(id))[0]
    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>

    let location = useLocation();
    // console.log(location);


    const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}
`


    useEffect(() => {
        async function getGroup() {
            const response = await fetch(`/api_v1/groups/${id}`);
            const data = await response.json();
            console.log({ data });
            setGroup(data);

        }
        getGroup();


    }, [])
    console.log({ group })


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
    async function addBookToGroup(bookToSubmit, finished) {
        console.log({ finished })


        bookToSubmit.finished = finished


        console.log({ bookToSubmit })
        const response = await fetch('/api_v1/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(bookToSubmit),
        });
        if (response.ok) {
            console.log(response)
            // setBooks([...books, newBook]);
            // console.log({books})
            // return response.json(); 
        }
    }


    console.log({ comments })

    function handleCommentChange(event) {
        setComment(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        props.submitComment(comment, props.books);
        console.log(props)
        setComment('');
        props.getComments(event)
    }

    function HTML() {
        const matches = group?.name.match(/\b(\w)/g);
        const name = matches?.join('');
        const nameHTML = name?.toUpperCase();

        const members = group?.members.map(member => <div><h4>{member.username}</h4></div>)
        console.log(group?.books)
        const books = group?.books.map(book =>
            <div id={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <img src={book.image} />
            </div>)

        return (
            <>
                <div className="group mt-3 shadow p-3 mb-5 bg-body rounded mt-2" id={group?.id} ><h2 className='groupTitle'>{group?.name}</h2>
                    <Avatar style={{ fontFamily: 'Mochiy Pop P One', position: 'absolute', right: '10px' }} className="groupAvatar" sx={{ bgcolor: deepPurple[500] }}>{nameHTML}</Avatar>
                    <div id={group?.id}>
                        {/* <h4>Books</h4>
                    <h5 >{group.books?.title}</h5>
                    <p>{group.members.username}</p>
                    <h2>Comments</h2>
                    <BookComment comments={props.comments} /> */}
                        <button className='btn btn-dark joinGroupBtn' id={group?.id} onClick={() => props.joinGroup(group.id, group.name)}>Join Group</button>
                    </div>
                    <h3>Members: {members}</h3>
                    <h3>Books: {books}</h3>
                    <p>{props.books}</p>
                    <GroupBookSearch groups={props.groups} setBooks={props.setBooks} group={group} />
                </div>
            </>
        )
    }

    let bookHTML;

    // console.log('group name', typeof group.name)

    if (!props.books) {
        bookHTML = <Spinner animation='grow' variant='primary' />
    } else {
        return bookHTML = props.books.items?.map(book => {
            console.log('book', book);
            const bookToSubmit = {
                author: book.volumeInfo.authors?.toString(),
                title: book.volumeInfo.title,
                image: book.volumeInfo.imageLinks?.thumbnail,
                group: group.id,
                description: book.volumeInfo.description?.toString(),
                categories: book.volumeInfo.categories?.toString(),
                page_count: book.volumeInfo.pageCount,

            }


            const handleClick = (variant) => () => {
                addBookToGroup(bookToSubmit)
                enqueueSnackbar('Added to Completed', { variant });
            };

            return (
                <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.imageLinks?.thumbnail ? <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
                    <p>{`Written by: ${book.volumeInfo.authors}`}</p>
                    <p>{book.volumeInfo.description ?
                        <HoverText><ReadMoreReact text={book.volumeInfo.description}
                            min={25}
                            ideal={50}
                            max={10000000}
                            style={{ cursor: 'pointer' }}
                            readMoreText={readMore} />
                        </HoverText> : null}</p>
                    {book.volumeInfo.categories ? <p>Category: {book.volumeInfo.categories}</p> : null}
                    {book.volumeInfo.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null}
                    <Button className="bookBtn btn btn-dark mx-1"
                        variant="contained"
                        type="submit"
                        onClick={handleClick('success')}>Add To Group

                    </Button>
                    {/* <Button className="bookBtn btn btn-dark mx-1"
                        // color="palette.success.dark"
                        type="submit"
                        onClick={handleClickVariant('success')}>Add To Library</Button> */}
                    {/* <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(bookToSubmit, true)}>Add to Reading List</button>
                    <button className="btn btn-dark mx-1" typr='submit' onClick={() => props.addBookToLibrary(bookToSubmit, false)}>Add to Library</button> */}
                </div >)
        }
        )
    }

    return (
        <>
            <HTML group={group} />
            {/* {commentHTML} */}
            {/* {bookHTML} */}
            <form className="Comments-form" onSubmit={handleSubmit}>

                <textarea name="text" type="text" placeholder='comments' />
                <button type="submit" className="submit_btn">Submit</button>
            </form>

        </>
    )
}

export default Group;