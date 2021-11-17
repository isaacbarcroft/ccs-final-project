import { useState, useEffect } from 'react';
import Form from '../Form/Form';
import { Redirect, useHistory, useParams, useLocation, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, green } from '@mui/material/colors';
import BookComment from '../BookComment/BookComment';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import ReadMoreReact from 'read-more-react';
import Spinner from 'react-bootstrap/Spinner';
import GroupBookSearch from '../GroupBookSearch/GroupBookSearch';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';



function Group(props) {
    const { id } = useParams()
    const [group, setGroup] = useState();

    const { enqueueSnackbar } = useSnackbar();

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState();

    // const currentGroup = props.groups.filter((group) => group.id === parseInt(id))[0]
    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>

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
            setGroup(data);
            props.setBooks();
        }
        getGroup();
    }, []);

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`/api_v1/books/comments`);
            const data = await response.json();
            setComments(data);
        }
        getComments();

    }, [])




    async function addBookToGroup(bookToSubmit, finished) {


        bookToSubmit.finished = finished
        bookToSubmit.group = group.id;

        const response = await fetch('/api_v1/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(bookToSubmit),
        });

        if (!response.ok) {
            console.error('There has been a problem with your fetch operation:', response);
            return
        }

        const data = await response.json();
        setGroup((prevState) => (
            {
                ...prevState,
                books: [...prevState.books, data],
            }
        ));
        props.setBooks();
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.submitComment(comment, props.books);
        setComment('');
        props.getComments(event)
    }

    if (!group) {
        return <div>Loading ...</div>
    }


    let booksHTML;
    if (props.books) {
        booksHTML = props.books.items?.map(book => {
            const bookToSubmit = {
                author: book.volumeInfo.authors?.toString(),
                title: book.volumeInfo.title,
                image: book.volumeInfo.imageLinks?.thumbnail,
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
                </div >)
        }
        )
    } else {
        booksHTML = group.books.map(book =>

            <Card id={book.id} style={{ flex: '1 1 250px', marginTop: '30px', marginBottom: '30px', marginRight: '30px' }}>
                <Link style={{ textDecoration: 'none' }} to={`/groups/${id}/books/${book.id}`}>
                    <Card.Img src={book.image} alt="book cover" />
                </Link>
                <Card.Body>
                    <Card.Title >{book.title}</Card.Title>
                    <Card.Subtitle>{book.author}</Card.Subtitle>
                </Card.Body>
            </Card>

        );
    }

    const matches = group.name.match(/\b(\w)/g);
    const name = matches.join('');
    const avatarHTML = name?.toUpperCase();

    const membersHTML = group.members.map(member =>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }} ClassName="row">
            <Avatar style={{ textAlign: 'left', fontFamily: 'Mochiy Pop P One' }} className="avatar" sx={{ bgcolor: green[500], width: 30, height: 30 }}>{member.username.slice(0, 1).toUpperCase()}</Avatar>
            <li style={{ textAlign: 'left', listStyle: 'none', marginLeft: '5px' }}>{member.username.toUpperCase()}</li>
        </div>);


    return (

        <div className="container">
            <div className="row">
                <div style={{ paddingLeft: '50px', marginTop: '55px' }} className="col-8">
                    <div style={{}} className="group mt-2 shadow p-5 mb-5 bg-body rounded" id={group?.id} >
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                            <Avatar style={{ fontFamily: 'Mochiy Pop P One' }}
                                className="groupAvatar" sx={{ bgcolor: deepPurple[500] }}>
                                {avatarHTML}
                            </Avatar>
                            <h2 style={{ fontSize: '30px', marginLeft: '5px' }} className='group'>{group?.name}</h2>
                        </div>
                        <div className="border"></div>
                        {/* <button className="deleteGroup"
                            type='button' id={group?.id}
                            onClick={(event) => props.deleteGroup(event)}>Delete Group</button> */}
                        <h3 style={{ textAlign: 'start', marginTop: '40px', fontFamily: 'Oswald' }}>Members: </h3>
                        <ul>
                            {membersHTML}
                        </ul>
                        <h3 style={{ textAlignLast: 'justify', fontFamily: 'Oswald' }}>Books: </h3>
                        {/* <div className="container bookGroup" > */}
                        <div style={{ display: 'flex', flexWrap: 'wrap' }} clasName="bookCardGroup">
                            {booksHTML}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <div className="col-4 mt-2">
                    <GroupBookSearch setBooks={props.setBooks} />
                </div>

            </div>
        </div >

    )
}

export default Group;