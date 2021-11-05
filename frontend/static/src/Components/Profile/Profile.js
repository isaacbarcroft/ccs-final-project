import { useState, useEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';

function Profile(props){
    let history = useHistory();
    const [edit, setEdit] = useState(false);
    console.log({edit})
    const [myBooks, setMyBooks] = useState();
   
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
    const types = ['No Good', 'Okay', 'Good Read', 'Loved It']
    const options = [...new Set(types?.map(book => book))];
    console.log(options)
 
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
        <select>
        <option>My Rating: {options}</option>
        </select>
        <button className="btn btn-dark mx-1" type='submit'>Update</button>
        
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
          <p>My Thoughts: {book.comments}</p>
          <p>My Rating: <span className='font-italic'>{book.options}</span></p>
          <button className="btn btn-dark mx-1 mb-5" type='submit' onClick={() => setEdit(true)}>Edit</button>
          <button>Delete</button>
          
          </div>)

    return(
        <>
        <div className='container'>
            <header>
            <div> Find a Book
                <button className='btn btn-dark' onClick={redirect} >Search</button>
            </div>
            </header>
        <h1>Profile</h1>
        <div className='Library'>
           {edit === false ? booksHTML : booksEditHTML}
       
        </div>
        </div>
        </>
    )
}

export default Profile;