import ReadMoreReact from 'read-more-react';
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Form from '../Form/Form';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Card from 'react-bootstrap/Card';



function Book(props) {

    const [search, setSearch] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    let history = useHistory();

    const redirect = () => {
        history.push('/profile')
    }

    const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}
`

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>

    let bookHTML;



    if (!props.books) {
        <div>Loading ...</div>
    } else {

        bookHTML = props.books.items?.map(book => {
            console.log('book', book);
            const bookToSubmit = {
                author: book.volumeInfo.authors?.toString(),
                title: book.volumeInfo.title,
                image: book.volumeInfo.imageLinks?.thumbnail,
                description: book.volumeInfo.description?.toString(),
                categories: book.volumeInfo.categories?.toString(),
                page_count: book.volumeInfo.pageCount,

            }
            const bookToSubmit2 = {
                author: book.volumeInfo.authors?.toString(),
                title: book.volumeInfo.title,
                image: book.volumeInfo.imageLinks?.thumbnail,
                description: book.volumeInfo.description?.toString(),
                categories: book.volumeInfo.categories?.toString(),
                page_count: book.volumeInfo.pageCount,
                pages_read: book.volumeInfo.pageCount,

            }
            const handleClick = (variant) => () => {
                props.addBookToLibrary(bookToSubmit2, true);
                enqueueSnackbar('Added to Completed', { variant });
            };

            const handleClickVariant = (variant) => () => {
                props.addBookToLibrary(bookToSubmit, false)
                // variant could be success, error, warning, info, or default
                enqueueSnackbar('Added to Library', { variant });
            };

            return (

                <Card style={{ flexDirection: 'row', marginBottom: '30px', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                    {book.volumeInfo.imageLinks?.thumbnail ?
                        <Card.Img className="cardImg" variant="top" src={book.volumeInfo.imageLinks?.thumbnail} />
                        : <p style={{ width: '50%' }} >No Image Available</p>}
                    <Card.Body>
                        <Card.Title>{book.volumeInfo.title}</Card.Title>
                        <Card.Subtitle>{book.volumeInfo.authors}</Card.Subtitle>
                        {book.volumeInfo.description ?
                            <Card.Text>
                                <HoverText><ReadMoreReact text={book.volumeInfo.description}
                                    min={25}
                                    ideal={50}
                                    max={10000000}
                                    style={{ cursor: 'pointer' }}
                                    readMoreText={readMore} />
                                </HoverText>
                            </Card.Text> : null}
                        <Button className="bookBtn btn btn-dark mx-1"
                            variant="contained"
                            type="submit"
                            onClick={handleClick('success')}>Add To Completed

                        </Button>
                        <Button className="bookBtn btn btn-dark mx-1"
                            variant="contained"
                            type="submit"
                            onClick={handleClickVariant('success')}>Add To Library</Button>
                    </Card.Body>
                </Card>
            )
        }
        )
    }

    return (
        <>

            <div className="container" >
                <header style={{ display: 'flex', justifyContent: 'start' }}>
                    <div style={{ marginTop: '10px' }}>
                        <h1 style={{ fontFamily: 'Oswald', color: 'whitesmoke', marginLeft: '20px' }}> Book Search</h1>
                        <button style={{ marginTop: '5px', backgroundColor: '#3B983B' }} className="btn btn-dark mb-3" onClick={redirect} >Back to Profile</button>
                    </div>
                </header>
                <div className="row">
                    <div className="col-6 mt-3 mx-3">
                        {/* <CardHTML books={props.books} /> */}
                        {bookHTML}
                    </div>
                    <div className="col-4">
                        <Form setBooks={props.setBooks} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book;