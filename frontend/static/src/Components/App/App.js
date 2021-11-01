import { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter, useHistory, useLocation  } from 'react-router-dom';
import Book from '../Book/Book';
import Header from '../Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

function App() {

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
 const [books, setBooks] = useState([])

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


  
    async function getBooks(searchTerm){
      console.log(searchTerm);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=robinbson+Crusoe&key=`);
      if(!response.ok) {
        console.log(response);
      } else {
        const data = await response.json();
        setBooks(data);
        console.log({data})
        console.log(books)
      }
      }
     


  return (
    <div className="App">

      <Header />
      <Switch>
        <Route path="/login">
          <Login isAuth={isAuth} setIsAuth={setIsAuth} users={users} setUsers={setUsers}/>
        </Route>
        <Route path="/register">
          <Registration isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path='/books'>
          <Book books={books} getBooks={getBooks}/>
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
