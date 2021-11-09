import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import ReadMoreReact from 'read-more-react';


const BookCardUnfinished = ({ book, deleteBook, options, handleUpdate }) => {

    const HoverText = styled.p`
        color: #000;
        :hover {
            cursor: pointer;
        }


    `

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>
    const [edit, setEdit] = useState(false);
    const [currentBook, setCurrentBook] = useState(book);
    // console.log(book);

    function handleChange(e) {
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

    const optionsHTML = options.map(option => <option value={option}>{option}</option>)

    return (
        <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">{currentBook?.finished === false ? "Not Finished" : "Finished"}
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
            {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
            <div className=" mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                {edit ?
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type='text' value={currentBook.comments} name='comments' placeholder="Comments" />
                            <input type="number" placeholder="Pages Read:" name='pages_read' onChange={handleChange} value={currentBook.pages_read} />
                            <select onChange={handleChange} value={currentBook.options} name="options">
                                <option>Select option</option>
                                {optionsHTML}
                            </select>
                            <button className="btn btn-dark mx-1" type='submit'>Update</button>
                        </form>
                        <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(false)}>Cancel</button>
                        <button type="button" id={currentBook.id} onClick={(e) => deleteBook(e)} className="btn btn-dark mx-1 mb-5">Remove Book</button>
                    </div>
                    :
                    <div><p>My Thoughts: {currentBook.comments}</p>
                        <p>Pages Read: {currentBook.pages_read}</p>
                        <p>My Rating: <span className='font-italic'>{currentBook.options}</span></p>
                        <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(true)}>Edit</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default BookCardUnfinished;
