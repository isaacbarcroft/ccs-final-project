import { useState, useEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';

function Profile(props){
    let history = useHistory();

    const [myBooks, setMyBooks] = useState();
    console.log(props.books)
    const redirect = () => {
      history.push('/books')
    }
    const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}
`
    const readMore = <div style={{color: 'blue'}} className="readMore">Read More</div>  

 
    const handleChange = (event) => {
        const {name, value} = event.target;
        setMyBooks({...myBooks, [name]: value});
      }
      useEffect(() => {
        
        async function getMyBooks(){
          const response = await fetch(`/api_v1/books/`);
          if(!response.ok) {
            console.log(response);
          } else {
            const data = await response.json();
            setMyBooks(data);
            console.log({data})
            console.log({myBooks})
          }
        }
        getMyBooks();
      },[,props.isAuth])



    const booksEditHTML = myBooks?.map(book => 
        <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">   
        <h2>{book.title}</h2>
        {book.image ? <img src={book.image} alt="" /> :  <p style={{width: '50%'}}className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p> }
        <p>{`Written by: ${book.author}`}</p>
        <p>{book.description ?
        <HoverText><ReadMoreReact text={book.description}
                                    min={25}
                                    ideal={50}
                                    max={10000000}
                                    style={{cursor: 'pointer'}}
                                    readMoreText={readMore}/>
        </HoverText> : null }</p>
        {book.categories ? <p>Category: {book.categories}</p> : null }
        {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
        <form>
        <input onChange={handleChange} value={book.comments}/>
        </form>
        <option>My Rating: {book.options}</option>
        <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(book.volumeInfo.authors.toString(), book.volumeInfo.title,book.volumeInfo.description, book.volumeInfo.imageLinks?.thumbnail,book.volumeInfo.categories.toString() )}>Add to Reading List</button>
        
        </div>)



   
     
      const booksHTML = myBooks?.map(book => 
          <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">   
          <h2>{book.title}</h2>
          {book.image ? <img src={book.image} alt="" /> :  <p style={{width: '50%'}}className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p> }
          <p>{`Written by: ${book.author}`}</p>
          <p>{book.description ?
          <HoverText><ReadMoreReact text={book.description}
                                      min={25}
                                      ideal={50}
                                      max={10000000}
                                      style={{cursor: 'pointer'}}
                                      readMoreText={readMore}/>
          </HoverText> : null }</p>
          {book.categories ? <p>Category: {book.categories}</p> : null }
          {/* {book.volumeInfo?.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null } */}
          <p>{book.comments}</p>
          <option>My Rating: {book.options}</option>
          <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(book.volumeInfo.authors.toString(), book.volumeInfo.title,book.volumeInfo.description, book.volumeInfo.imageLinks?.thumbnail,book.volumeInfo.categories.toString() )}>Add to Reading List</button>
          
          </div>)

    return(
        <>
        <div className='container'>
        <h1>Profile</h1>
        <div className='Library'>
            {booksHTML}
            {booksEditHTML}
        <div> Find a Book</div>
            <button onClick={redirect} >Search</button>
        </div>
        </div>
        </>
    )
}

export default Profile;