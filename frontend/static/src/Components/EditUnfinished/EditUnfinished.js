import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import ReadMoreReact from 'read-more-react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditOffIcon from '@mui/icons-material/EditOff';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAdded from '@mui/icons-material/BookmarkAdded';
import DoneIcon from '@mui/icons-material/Done';

const BookCardUnfinished = ({ book, deleteBook, options, handleUpdate, finishBook }) => {

    const HoverText = styled.p`
        color: #000;
        :hover {
            cursor: pointer;
        }


    `

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>
    const [edit, setEdit] = useState(false);
    const [currentBook, setCurrentBook] = useState(book);

    function handleChange(e) {
        const { name, value } = e.target;
        setCurrentBook(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdate(currentBook);
        setEdit(false);
    }
    const total = currentBook.page_count ? Math.round(parseInt(currentBook.pages_read / currentBook.page_count * 100)) : null
        ('count', currentBook.page_count)
        ('read', parseInt(currentBook.pages_read))
        ({ total })
    const optionsHTML = options.map(option => <option value={option}>{option}</option>)

    return (
        <Card style={{ marginBottom: '30px', flexDirection: 'row' }}>
            {currentBook.image ? <Card.Img className="cardImgP" src={currentBook.image} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
            <Card.Body>
                <Card.Title>{currentBook.title}</Card.Title>
                <Card.Subtitle>{`Written by: ${currentBook.author}`}</Card.Subtitle>
                <Card.Text>{currentBook.description ?
                    <HoverText><ReadMoreReact text={currentBook.description}
                        min={25}
                        ideal={50}
                        max={10000000}
                        style={{ cursor: 'pointer' }}
                        readMoreText={readMore} />
                    </HoverText> : null}</Card.Text>

                {currentBook.categories ? <p>Category: {currentBook.categories}</p> : null}
                {currentBook.page_count ? <p>{currentBook.page_count} pages</p> : null}
            </Card.Body>
            <div className=" mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                {edit ?
                    <div>
                        <form onSubmit={handleSubmit}>
                            <textarea onChange={handleChange} type='text' value={currentBook.comments} name='comments' placeholder="Comments" />
                            <input type="number" placeholder="Pages Read:" name='pages_read' onChange={handleChange} max={currentBook.page_count} value={currentBook.pages_read} />
                            <IconButton type='submit'>
                                <DoneIcon />
                            </IconButton>
                            {/* <button className="btn btn-dark mx-1" type='submit'>Update</button> */}
                        </form>
                        <div className="col">
                            <IconButton type='button' onClick={() => setEdit(false)}>
                                <EditOffIcon />
                            </IconButton>
                            <IconButton id={currentBook.id} onClick={(e) => deleteBook(e)} >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton id={currentBook.id} onClick={() => finishBook(currentBook)}>
                                <BookmarkAdded />
                            </IconButton>
                            {/* <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(false)}>Cancel</button>
                            <button type="button" id={currentBook.id} onClick={(e) => deleteBook(e)} className="btn btn-dark mx-1 mb-5">Remove Book</button>
                            <button type='button' id={currentBook.id} onClick={() => finishBook(currentBook)} className='btn btn-dark mx-1 mb-5'>Mark Complete</button> */}
                        </div>
                    </div>
                    :
                    <div><p>My Thoughts: {currentBook.comments}</p>
                        <p>Pages Read: {currentBook.pages_read}</p>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" value={total} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="caption" component="div" color="text.secondary">
                                    {`${Math.round(total)}%`}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton type='button' onClick={() => setEdit(true)}>
                            <EditIcon />
                        </IconButton>
                        {/* <button className=" editBTN btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(true)}>Edit</button> */}
                    </div>
                }
            </div>

        </Card>
    )
}

export default BookCardUnfinished;
