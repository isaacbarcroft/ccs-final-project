import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';

function Book(props){
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [categories, setCategories] = useState();
    const [pages, setPages] = useState();
    const [search, setSearch] = useState(false);

  
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
function handleTitleChange(event){
    setTitle(event.target.value);
    console.log(title)
}

function handleAuthorChange(event){
    setAuthor(event.target.value);
    console.log(author)
}

function handleCategoryChange(event){
    setCategories(event.target.value);
    console.log(categories)
}

function handleSubmit(event){
    event.preventDefault();
    
    // props.submitMessage();
    // console.log(props)
    const searchTerm = event.target.value;
    console.log({searchTerm})
    console.log({title})
    console.log({author})
    props.getBooks(title, author, categories);
    setTitle('');
    setAuthor('');
    setCategories('');
    
}

function handleBookList(event){
    event.preventDefault();
    props.addBookToLibrary( author, title, )
}
function handleBookLibrary(){

}

const readMore = <div style={{color: 'blue'}} className="readMore">Read More</div>
  
 let bookHTML;

if(!props.books) {
    bookHTML = <Spinner animation='grow' variant='primary'/>
  } else {
      return bookHTML = props.books.items?.map(book => 
        <div className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2">   
        <h2>{book.volumeInfo.title}</h2>
        {book.volumeInfo.imageLinks?.thumbnail ? <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" /> :  <p style={{width: '50%'}}className='noImage t-3 shadow p-3 mb-5 bg-body rounded mt-2 ds-flex justify-content-center'>No Image Available</p> }
        <p>{`Written by: ${book.volumeInfo.authors}`}</p>
        <p>{book.volumeInfo.description ?
        <HoverText><ReadMoreReact text={book.volumeInfo.description}
                                    min={25}
                                    ideal={50}
                                    max={10000000}
                                    style={{cursor: 'pointer'}}
                                    readMoreText={readMore}/>
        </HoverText> : null }</p>
        {book.volumeInfo.categories ? <p>Category: {book.volumeInfo.categories}</p> : null }
        {book.volumeInfo.pageCount ? <p>{book.volumeInfo.pageCount} pages</p> : null }
        <button className="btn btn-dark mx-1" type='submit' onClick={() => props.addBookToLibrary(book.volumeInfo.authors.toString(), book.volumeInfo.title,book.volumeInfo.description, book.volumeInfo.imageLinks?.thumbnail,book.volumeInfo.categories.toString(), book.volumeInfo.pageCount )}>Add to Reading List</button>
        <button className="btn btn-dark mx-1" typr='submit' onClick={handleBookLibrary}>Add to Library</button>
        </div>)
  }


  

const groupsHTML = props.groups.map(group => <option value={group.name}>{group.name}</option>)
    return(
        <>

        <div className="container" >

            <div className="row">
                <div class="col-8">
                    {bookHTML}
                </div>
                <div className="col shadow p-3 mb-5 bg-body rounded">
                <div>Back to Profile
                    <button className="btn btn-dark" onClick={redirect} >Back to Profile</button>
                </div>
                    <h2 className="newArticleForm text-center mt-3">Find a Book</h2>
                        <form id="form"className="mt-3 ds-flex justify-content-center mt-3" onSubmit={handleSubmit}>
                            <a name="form" ></a>
                            <div className="form-group text-left mb-3">
                                <label htmlFor='title'>Title</label>
                                <input type="text"
                                    className="form-control"
                                    id='bookTitle'
                                    placeholder="Title"
                                    onChange={handleTitleChange}
                                    
                                    name='title'
                                    value={title}
                                />
                            </div>
                            <div className="form-group text-left mb-3">
                                <label htmlFor='body'>Author</label>
                                <input type="text"
                                    className="form-control"
                                    id='bookAuthor'
                                    placeholder="Author"
                                    onChange={handleAuthorChange}
                                    
                                    name='author'
                                    value={author}
                                />
                            </div>
                            <label htmlFor='body'>Category</label>
                            <input  className="form-control"
                                    onChange={handleCategoryChange} 
                                    name="categories" 
                                    value={categories}
                                    placeholder="Category"
                                    />
                            <label htmlFor=''>Add to Group</label>
                            <select> 
                                {groupsHTML}
                            </select>
                            <div className="form-group text-left mb-3 mt-3">
                                {/* <label htmlFor='options'>Draft/Submitted</label> */}
                                <button type="submit"
                                    className=" homeButton form-control  btn btn-dark"
                                    id='articleOptions'
                                    name='submit'
                                    value='SUBMIT'
                                >Submit</button>
                            </div>
                            
                        
                        </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Book;