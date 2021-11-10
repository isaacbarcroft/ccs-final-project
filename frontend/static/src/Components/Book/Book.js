import ReadMoreReact from 'read-more-react';
import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory, Redirect } from 'react-router-dom';
import Form from '../Form/Form';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SimpleSnackbar from '../ProgressBar/ProgressBar';
import { SnackbarProvider, useSnackbar } from 'notistack';

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





    // function handleBookList(event) {
    //     event.preventDefault();
    //     props.addBookToLibrary()
    // }
    // function handleBookLibrary() {

    // }

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>

    let bookHTML;



    if (!props.books) {
        bookHTML = <Spinner animation='grow' variant='primary' />
    } else {
        return bookHTML = props.books.items?.map(book => {
            console.log('book', book);
            const bookToSubmit = {
                author: book.volumeInfo.authors.toString(),
                title: book.volumeInfo.title,
                image: book.volumeInfo.imageLinks?.thumbnail,
                description: book.volumeInfo.description?.toString(),
                categories: book.volumeInfo.categories?.toString(),
                page_count: book.volumeInfo.pageCount,

            }
            const handleClick = (variant) => () => {
                props.addBookToLibrary(bookToSubmit, true);
                enqueueSnackbar('I love snacks.', { variant });
            };

            const handleClickVariant = (variant) => () => {
                props.addBookToLibrary(bookToSubmit, false)
                // variant could be success, error, warning, info, or default
                enqueueSnackbar('This is a success message!', { variant });
            };

            // const handleClick = () => {
            //     props.addBookToLibrary(bookToSubmit, true);
            //     console.log({ bookToSubmit })
            //     setOpen(true);
            // };
            // const handleClick1 = () => {
            //     props.addBookToLibrary(bookToSubmit, false)
            //     setOpen(true);
            // };

            // const action = (
            //     <React.Fragment>
            //         <Button color="secondary" size="small" onClick={handleClose}>
            //             UNDO
            //         </Button>
            //         <IconButton
            //             size="small"
            //             aria-label="close"
            //             color="inherit"
            //             onClick={handleClose}
            //         >
            //             <CloseIcon fontSize="small" />
            //         </IconButton>
            //     </React.Fragment>
            // );
            // const action1 = (
            //     <React.Fragment>
            //         <Button color="secondary" size="small" onClick={handleClose}>
            //             UNDO
            //         </Button>
            //         <IconButton
            //             size="small"
            //             aria-label="close"
            //             color="inherit"
            //             onClick={handleClose}
            //         >
            //             <CloseIcon fontSize="small" />
            //         </IconButton>
            //     </React.Fragment>
            // );

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
                        type="submit"
                        onClick={handleClick('success')}>Add To Completed

                    </Button>
                    {/* <Snackbar
                        // open={open}
                        autoHideDuration={3000}
                        // onClose={handleClose}
                        message="Book Added to 'Completed'"
                    // action={action}
                    /> */}
                    <Button className="bookBtn btn btn-dark mx-1"
                        type="submit"
                        onClick={handleClickVariant('success')}>Add To Library</Button>
                    {/* <Snackbar
                        // open={open}
                        autoHideDuration={3000}
                        // onClose={handleClose}
                        message="Book Added to Library"
                    // action={action1}
                    /> */}
                    {/* <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(bookToSubmit, true)}>Add to Reading List</button>
                    <button className="btn btn-dark mx-1" typr='submit' onClick={() => props.addBookToLibrary(bookToSubmit, false)}>Add to Library</button> */}
                </div >)
        }
        )
    }


    const groupsHTML = props.groups?.map(group => <option value={group.name}>{group.name}</option>)
    return (
        <>

            <div className="container" >
                <div>
                    <button className="btn btn-dark mb-3" onClick={redirect} >Back to Profile</button>
                </div>
                <div className="row">
                    <div className="col-6 mt-3">
                        {bookHTML}
                    </div>
                    <div className="col shadow p-3 mb-5 bg-body rounded">

                        <Form setBooks={props.setBooks} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book;