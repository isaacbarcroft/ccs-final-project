import { useState, useEffect } from 'react';
import { Redirect, useHistory} from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

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
    const optionsHTML = options.map(option => <option value={option}>{option}</option>)
    console.log(optionsHTML)
 
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


    async function deleteBook(event){
      console.log(event.id);
      console.log('delete function');
     const response = await fetch(`/api_v1/books/${event.target.id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
      });
      
      const updatedBooks = myBooks.filter(book => book.id != event.id);
              setMyBooks(updatedBooks);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(); /// contructing key - value pairs
      // formData.append('title', book.title);
      // formData.append('body', book.body);
      formData.append('options', event.target.value);
      // formData.append('image', book.image);
      // formData.append('comments', books.comments);
      // formData.append('')

      const options = {
        method: 'PUT',
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: formData,
      }
      fetch(`/api_v1/books/${event.id}/`, options);
    //  getMyBooks();
     console.log('eventID',event.id)
     
    }

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
        <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={book.comments}/>
        <select>
        {optionsHTML}
        </select>
        <button className="btn btn-dark mx-1" type='submit'>Update</button>
        </form>
        </div>)
 
      const booksHTML = myBooks?.map(book => !book.finished === true ? 
          <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2"> Not Finished  
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
          <button id={book.id} onClick={deleteBook} className="btn btn-dark mx-1 mb-5">Remove Book</button>
          
          </div> : null )

           const booksListHTML = myBooks?.map(book =>  book.finished === true ? 
            <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2"> Finished  
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
            <button id={book.id} onClick={deleteBook} className="btn btn-dark mx-1 mb-5">Remove Book</button>
            
            </div> : null)

        const pagesRead = myBooks?.map(book =>  book.finished === true ? book.page_count : 0);
        // const pageTotal = pagesRead.reduce();
              console.log({pagesRead})
              // console.log({pageTotal})
    if(!props.isAuth){
      return <Redirect to="/login" />
      }

    return(
        <>
        <div className='container'>
            <header>
              <h1>Pages Read: {pagesRead}</h1>
            <div> Find a Book
                <button className='btn btn-dark' onClick={redirect} >Search</button>
            </div>
            </header>
            <div className="container" >
              <div className="row">
                <div class="col-6">
                  <h1>Profile</h1>
                  <div className='Library'>
                    {edit === false ? booksHTML : booksEditHTML}
                    </div>
                </div>
                <div className="col">
                  {booksListHTML}
                </div>
              </div>
            </div>
        </div>
        
        </>
    )
}

export default Profile;