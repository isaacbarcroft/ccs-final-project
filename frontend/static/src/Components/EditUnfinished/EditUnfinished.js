import { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    const [currentBook, setCurrentBook] = useState({ ...book });

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
        <Card style={{ marginBottom: '30px', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.7)' }}>
            {currentBook.image ? <Card.Img className="cardImgP" src={currentBook.image} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
            <Card.Body>
                <Card.Title>{currentBook.title}</Card.Title>
                <Card.Subtitle>{`${currentBook.author}`}</Card.Subtitle>
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

            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)' }} className="shadow p-3 rounded">
                {edit ?
                    <div style={{}} className="col">
                        <form onSubmit={handleSubmit}>
                            <textarea onChange={handleChange} type='text' value={currentBook.comments} name='comments' placeholder="Comments" />
                            <input type="number" placeholder="Pages Read:" name='pages_read' onChange={handleChange} max={currentBook.page_count} value={currentBook.pages_read} />
                            <IconButton type='submit'>
                                <DoneIcon type='submit' />
                            </IconButton>
                        </form>
                        <div className="col">
                            <IconButton type='button' onClick={() => setEdit(false)}>
                                <EditOffIcon type='button' onClick={() => setEdit(false)} />
                            </IconButton>
                            <IconButton id={currentBook.id} onClick={() => finishBook(currentBook)}>
                                <BookmarkAdded id={currentBook.id} onClick={() => finishBook(currentBook)} />
                            </IconButton>
                        </div>
                    </div>
                    :
                    <div className="col">
                        <p>My Thoughts: {currentBook.comments}</p>
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
                        <div style={{ display: 'flex', justifyContent: 'center' }} >
                            <IconButton id={currentBook.id} onClick={(e) => deleteBook(e)} >
                                <DeleteIcon id={currentBook.id} onClick={(e) => deleteBook(e)} />
                            </IconButton>
                            <IconButton type='button' onClick={() => setEdit(true)}>
                                <EditIcon type='button' onClick={() => setEdit(true)} />
                            </IconButton>
                        </div>
                    </div>
                }
            </div>

        </Card>
    )
}

export default BookCardUnfinished;
