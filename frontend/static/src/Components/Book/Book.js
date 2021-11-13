import ReadMoreReact from 'read-more-react';
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory, Redirect } from 'react-router-dom';
import Form from '../Form/Form';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import CardHTML from '../Card/Card';
import Card from 'react-bootstrap/Card';



function Book(props) {

    const [pages, setPages] = useState();
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
            const handleClick = (variant) => () => {
                props.addBookToLibrary(bookToSubmit, true);
                enqueueSnackbar('Added to Completed', { variant });
            };

            const handleClickVariant = (variant) => () => {
                props.addBookToLibrary(bookToSubmit, false)
                // variant could be success, error, warning, info, or default
                enqueueSnackbar('Added to Library', { variant });
            };

            return (

                <Card style={{ flexDirection: 'row', marginBottom: '30px' }}>
                    {book.volumeInfo.imageLinks?.thumbnail ?
                        <Card.Img className="cardImg" variant="top" src={book.volumeInfo.imageLinks?.thumbnail} />
                        : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
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


                // <div className="row">

                //     <div className="col-6">
                //         <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                //             {/* <RecipeReviewCard books={props.books} /> */}
                //             <h2>{book.volumeInfo.title}</h2>


                //             {book.volumeInfo.imageLinks?.thumbnail ? <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
                //             <p>{`Written by: ${book.volumeInfo.authors}`}</p>
                //             <p>{book.volumeInfo.description ?
                //                 <HoverText><ReadMoreReact text={book.volumeInfo.description}
                //                     min={25}
                //                     ideal={50}
                //                     max={10000000}
                //                     style={{ cursor: 'pointer' }}
                //                     readMoreText={readMore} />
                //                 </HoverText> : null}</p>
                //             {book.volumeInfo.categories ? <p>Category: {book.volumeInfo.categories}</p> : null}
                //             {book.volumeInfo.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null}
                //             
                //             {/* <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(bookToSubmit, true)}>Add to Reading List</button>
                //     <button className="btn btn-dark mx-1" typr='submit' onClick={() => props.addBookToLibrary(bookToSubmit, false)}>Add to Library</button> */}
                //         </div>
                //     </div >
                //     {/* <div className="col shadow p-3 mb-5 bg-body rounded">
                //         <Form setBooks={props.setBooks} />
                //     </div> */}

                // </div >
            )
        }
        )
    }

    return (
        <>

            <div className="container" >
                <div>
                    <button className="btn btn-dark mb-3" onClick={redirect} >Back to Profile</button>
                </div>
                <div className="row">
                    <div className="col-8 mt-3">
                        {/* <CardHTML books={props.books} /> */}
                        {bookHTML}
                    </div>
                    <div className="col-4 shadow p-3 mb-5 bg-body rounded">
                        <Form setBooks={props.setBooks} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book;