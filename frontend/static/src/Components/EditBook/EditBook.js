import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import ReadMoreReact from 'read-more-react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


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
        console.log(e.target)
        const { name, value } = e.target;
        console.log(name, value)
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


    return (
        <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">{currentBook?.finished === true ? "Finished" : "Not Finished"}
            <h2>{currentBook.title}</h2>
            {currentBook.image ? <img src={currentBook.image} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
            <p>{`Written by: ${currentBook.author}`}</p>
            <p>{currentBook.description ?
                <HoverText><ReadMoreReact text={currentBook.description}
                    min={25}
                    ideal={50}
                    max={10000000}
                    style={{ cursor: 'pointer' }}
                    readMoreText={readMore} />
                </HoverText> : null}</p>

            {currentBook.categories ? <p>Category: {currentBook.categories}</p> : null}
            {currentBook.page_count ? <p>Total Pages: {currentBook.page_count}</p> : null}
            <div className=" mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                {edit ?
                    <div className='col'>
                        <form onSubmit={handleSubmit}>
                            <textarea onChange={handleChange} type='text' value={currentBook.comments} name='comments' placeholder="Comments" />
                            {/* <input type="number" placeholder="Pages Read:" name='pages_read' onChange={handleChange} value={currentBook.pages_read} /> */}
                            <select onChange={handleChange} value={currentBook.options} name="options">
                                <option>Select option</option>
                                {optionsHTML}
                            </select>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">Controlled</Typography>
                                <Rating
                                    name="avg_rating"
                                    value={parseInt(currentBook.avg_rating)}
                                    onChange={handleChange}
                                />
                            </Box>
                            <button className="btn btn-dark mx-1" type='submit'>Update</button>
                        </form>
                        <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(false)}>Cancel</button>
                        <button type='button' id={currentBook.id} onClick={(e) => deleteBook(e)} className="btn btn-dark mx-1 mb-5">Remove Book</button>
                    </div>
                    :
                    <div><p>My Thoughts: {currentBook.comments}</p>
                        <p>Pages Read: {currentBook.page_count}</p>
                        <p>My Rating: <span className='font-italic'>{currentBook.options}</span></p>
                        <Typography component="legend">Rating</Typography>
                        <Rating name="read-only" value={currentBook.avg_rating} readOnly />
                        <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(true)}>Edit</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default BookCard
