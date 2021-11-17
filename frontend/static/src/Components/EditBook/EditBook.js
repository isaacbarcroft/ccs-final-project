import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import ReadMoreReact from 'read-more-react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Card from 'react-bootstrap/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditOffIcon from '@mui/icons-material/EditOff';


const BookCard = ({ book, deleteBook, options, handleUpdate }) => {

    const HoverText = styled.p`
        color: #000;
        :hover {
            cursor: pointer;
        }
    `

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>
    const [edit, setEdit] = useState(false)
    const [currentBook, setCurrentBook] = useState(book);
    const optionsHTML = options.map(option => <option value={option}>{option}</option>)
    const [value, setValue] = useState(2);


    <Box
        sx={{
            '& > legend': { mt: 2 },
        }}
    >
        <Typography component="legend">Controlled</Typography>
        <Rating
            name="simple-controlled"
            value={value}
            onChange={handleChange}
        />
    </Box>
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
    console.log({ currentBook })


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
                {currentBook.page_count ? <p>Total Pages: {currentBook.page_count}</p> : null}
            </Card.Body>

            <div style={{ display: 'flex', alignItems: 'center' }} className="shadow p-3 bg-body rounded">
                {edit ?
                    <div className='col'>
                        <form onSubmit={handleSubmit}>
                            <textarea onChange={handleChange} type='text' value={currentBook.comments} name='comments' placeholder="Comments" />
                            {/* <input type="number" placeholder="Pages Read:" name='pages_read' onChange={handleChange} value={currentBook.pages_read} /> */}
                            {/* <select onChange={handleChange} value={currentBook.options} name="options">
                                <option>Select option</option>
                                {optionsHTML}
                            </select> */}
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">My Rating</Typography>
                                <Rating
                                    name="avg_rating"
                                    value={parseInt(currentBook.avg_rating)}
                                    onChange={handleChange}
                                />
                            </Box>
                            <button className="btn btn-dark mx-1" type='submit'>Update</button>
                        </form>
                        <div className="col">
                            <IconButton type='button' onClick={() => setEdit(false)}>
                                <EditOffIcon type='button' onClick={() => setEdit(false)} />
                            </IconButton>
                            <IconButton onClick={(e) => deleteBook(e)} id={currentBook.id}>
                                <DeleteIcon type='button' />
                            </IconButton>
                            {/* <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(false)}>Cancel</button>
                            <button type='button' id={currentBook.id} onClick={(e) => deleteBook(e)} className="btn btn-dark mx-1 mb-5">Remove Book</button> */}
                        </div>
                    </div>
                    :
                    <div className="col">
                        <p>My Thoughts: {currentBook.comments ? currentBook.comments : <p></p>} </p>
                        <p>Pages Read: {currentBook.page_count}</p>
                        {/* <p>My Rating: <span className='font-italic'>{currentBook.options}</span></p> */}
                        <Typography component="legend">Rating</Typography>
                        <Rating name="read-only" value={currentBook.avg_rating} readOnly />
                        <IconButton aria-label="delete"
                            type='button' onClick={() => setEdit(true)}>
                            <EditIcon />
                        </IconButton >
                        {/* <button className=" editBTN btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(true)}>Edit</button> */}
                    </div>
                }
            </div>

        </Card>
    )
}

export default BookCard
