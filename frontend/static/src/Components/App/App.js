import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch, Redirect, withRouter, useHistory, useLocation  } from 'react-router-dom';
import Book from '../Book/Book';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Cookies from 'js-cookie';
import ScrollTop from 'react-scrolltop-button';
import Profile from '../Profile/Profile';
import Groups from '../Groups/Groups';
import Footer from '../Footer/Footer';
import Spinner from 'react-bootstrap/Spinner';

function App(props) {

  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    is_staff: null,
  });
    const [profile, setProfile] = useState({
    alias: '',
    image: null,
  });
  const [users, setUsers] = useState({
    username: '',
    password: '',
});
  const [isAuth, setIsAuth] = useState(null);
  const [books, setBooks] = useState([]);
  const history = useHistory();


 useEffect(() => {
 
  const checkAuth = async () => {
  const response = await fetch('/rest-auth/user/');
  if(!response.ok) {
    console.log('not ok')
    setIsAuth(false);
  } else {
    const data = await response.json();
    setAdmin(data)
    // console.log({response})
    console.log({data})
    setIsAuth(true);
    console.log({admin})
    console.log(admin.is_staff)
  }
 }
 checkAuth()
}, [isAuth])

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = 'key=AIzaSyCLgbfwe2wEaHpDS8n2XBRlU3rgv5Gz7DA';
  
    async function getBooks(title, author, categories){
      console.log(title, author, categories);
      const response = await fetch(`${BASE_URL}intitle:${title}+inauthor:${author}+insubject:${categories}&${API_KEY}`);
      if(!response.ok) {
        console.log(response);
      } else {
        const data = await response.json();
        setBooks(data);
        console.log({data})
        console.log(books)
        console.log({title})
        console.log({author})
        console.log({categories})
        console.log(`${BASE_URL}intitle:${title}+inauthor:${author}+insubject:${categories}&${API_KEY}`)
      }
      }
    
      async function addBookToLibrary(author, title, description, image, categories){
        console.log({author})
        console.log({title})
        console.log({description})
        // console.log({title})
        console.log({categories})
        const newBook = {
          author: author,
          title: title,
          description: description,
          // image: image,
          categories: categories, 
    
        };
        console.log({books});
        const response = await fetch('/api_v1/books/', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify(newBook),
        });
        if(response.ok){
          console.log(response)
          setBooks([...books, newBook]);
          console.log({books})
          return response.json(); 
    }  
      }


      async function handleLogoutSubmit(event){
        // event.preventDefault();
         const options = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'X-CSRFToken': Cookies.get('csrftoken'),
             },
             body: JSON.stringify(users),
         };
         const response = await fetch('/rest-auth/logout/', options)
         if(!response){
             console.log(response);
         } else {
             console.log(response)
             const data = await response.json();
             Cookies.remove('Authorization');
            setIsAuth(false)
            history.push("/login")
            
         }
         <Redirect path="/login" />
        }
        


  return (
    <div className="App">

      <Header handleLogoutSubmit={handleLogoutSubmit} isAuth={isAuth} admin={admin}/>
      <Switch>
        <Route path='/profile'>
          <Profile  books={books}/>
        </Route>
        <Route path='/groups'>
          <Groups />
        </Route>
        <Route path="/login">
          <Login isAuth={isAuth} setIsAuth={setIsAuth} users={users} setUsers={setUsers}/>
        </Route>
        <Route path="/register">
          <Registration isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path='/books'>
          <Book books={books} getBooks={getBooks} addBookToLibrary={addBookToLibrary}/>
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
      </Switch>
      <ScrollTop
      
      text="^"
      distance={50}
      breakpoint={908}
      style={{ backgroundColor: "#191C1F", color: "white" }}
      className="scroll-your-role"
      speed={50}
      target={0}
      icon={<i class="bi bi-caret-up-square"></i>}
    />
    <Footer />
    </div>
  );
}

export default App;
