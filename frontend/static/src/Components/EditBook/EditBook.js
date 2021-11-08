import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import ReadMoreReact from 'read-more-react';


const BookCard = ({ book, deleteBook, handleChange, handleSubmit, optionsHTML }) => {

    const HoverText = styled.p`
        color: #000;
        :hover {
            cursor: pointer;
        }
    `

    const readMore = <div style={{ color: 'blue' }} className="readMore">Read More</div>
    const [edit, setEdit] = useState(false)
    // console.log(book);

    return (
        <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">{book?.finished === true ? "Finished" : "Not Finished"}
            <h2>{book.title}</h2>
            {book.image ? <img src={book.image} alt="" /> : <p style={{ width: '50%' }} className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p>}
            <p>{`Written by: ${book.author}`}</p>
            <p>{book.description ?
                <HoverText><ReadMoreReact text={book.description}
                    min={25}
                    ideal={50}
                    max={10000000}
                    style={{ cursor: 'pointer' }}
                    readMoreText={readMore} />
                </HoverText> : null}</p>

            {book.categories ? <p>Category: {book.categories}</p> : null}
            {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
            <div className=" mt-3 shadow p-3 mb-5 bg-body rounded mt-2">
                {edit ?
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={book.comments} />
                            <input type="text" placeholder="Pages Read:" />
                            <select>
                                {optionsHTML}
                            </select>
                            <button className="btn btn-dark mx-1" type='submit'>Update</button>
                        </form>
                        <button className="btn btn-dark mx-1 mb-5" type='submit' >Edit</button>
                        <button id={book.id} onClick={(e) => deleteBook(e)} className="btn btn-dark mx-1 mb-5">Remove Book</button>
                    </div>
                    :
                    <div><p>My Thoughts: {book.comments}</p>
                        <p>Pages Read: {book.page_count}</p>
                        <p>My Rating: <span className='font-italic'>{book.options}</span></p>
                        <button className="btn btn-dark mx-1 mb-5" type='button' onClick={() => setEdit(true)}>Show Edit</button>
                    </div>
                }
            </div>

        </div>
    )
}

export default BookCard
