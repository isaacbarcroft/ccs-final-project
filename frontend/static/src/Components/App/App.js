import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch, Redirect, useHistory, } from 'react-router-dom';
import Book from '../Book/Book';
import Header from '../Header/Header';
import LeaderBoard from '../HomePage/HomePage';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Cookies from 'js-cookie';
import ScrollTop from 'react-scrolltop-button';
import Profile from '../Profile/Profile';
import Groups from '../Groups/Groups';
import Footer from '../Footer/Footer';
import GroupBookSearch from '../GroupBookSearch/GroupBookSearch';
import Group from '../Group/Group';
import GroupBook from '../GroupBook/GroupBook';
import SplashPage from '../SplashPage/SplashPage';
import Four from '../404/404';

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
  const [books, setBooks] = useState();
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState();
  const [selectedBook, setSelectedBook] = useState({ id: 0, name: '' });

  async function addGroup(name) {
    const newGroup = {
      name: name,
    };
    const response = await fetch('/api_v1/groups/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(newGroup),
    });

    if (!response.ok) {
      throw new Error('Network response was not OK');
    } else {
      const data = await response.json();
      setGroups([...groups, data]);
    }
  }


  async function deleteGroup(event) {
    const response = await fetch(`/api_v1/groups/${event.target.id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    } else {
      const updatedGroups = [...groups]
      const index = updatedGroups.findIndex(group => group.id === event.id);
      updatedGroups.splice(index, 1);
      setGroups(updatedGroups);
      <Redirect to='groups' />
    }

  }

  useEffect(() => {

    // GET request using fetch with async/await
    async function getGroups() {
      const response = await fetch('/api_v1/groups/');
      const data = await response.json();
      setGroups(data);

    }// return menuItemsAPI
    getGroups();
  }, [isAuth])


  // GET request using fetch with async/await
  async function getGroupComments(event) {
    const response = await fetch(`/api_v1/books/${event.target.value}/comments/`);
    const data = await response.json();
    const matchedBook = books?.find(book => {
      const bookIdString = book.id.toString()
      return bookIdString === event.target.value
    })

    setComments(data);
    setSelectedBook(matchedBook)
    getGroupComments();
  }



  useEffect(() => {

    const checkAuth = async () => {
      const response = await fetch('/rest-auth/user/');
      if (!response.ok) {
        setIsAuth(false);
      } else {
        const data = await response.json();
        setAdmin(data)
        setIsAuth(true);
      }
    }
    checkAuth()
  }, [isAuth])




  //addBookToList
  async function addBookToLibrary(bookToSubmit, finished, pageRead) {
    bookToSubmit.finished = finished
    const response = await fetch('/api_v1/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(bookToSubmit),
    });
    if (response.ok) {
    }
  }

  async function addBookForLater(author, title, description, image, categories, pages) {
    const newBook = {
      author,
      title,
      description,
      image: image,
      categories,
      page_count: pages,

    };

    const response = await fetch('/api_v1/books/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(newBook),
    });
    if (response.ok) {

    }
  }

  async function handleLogoutSubmit(event) {
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
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      Cookies.remove('Authorization');
      setIsAuth(false)
      history.push("/")

    }
    <Redirect path="/" />
  }

  const NavRoute = ({ exact, path, component: Component }) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>
        <Header />
        <Component {...props} />
      </div>
    )} />
  )


  return (
    <div className="App">
      <Header handleLogoutSubmit={handleLogoutSubmit} isAuth={isAuth} admin={admin} />
      <Switch>

        <Route path='/groupsearch'>
          <GroupBookSearch books={books} addBookToLibrary={addBookToLibrary}
            groups={groups} addBookForLater={addBookForLater}
            setBooks={setBooks} />
        </Route>
        <Route path='/profile'>
          <Profile books={books} isAuth={isAuth} admin={admin} setBooks={setBooks} />
        </Route>
        <Route path='/groups/:id/books/:id'>
          <GroupBook groups={groups} users={users} admin={admin} />
        </Route>
        <Route path='/groups/:id'>
          <Group deleteGroup={deleteGroup} selectedBook={selectedBook} comments={comments} setComments={setComments} groups={groups} setGroups={setGroups} addGroup={addGroup} setBooks={setBooks} books={books} addBookToLibrary={addBookToLibrary} admin={admin} />
        </Route>
        <Route path='/groups'>
          <Groups getGroupComments={getGroupComments} selectedBook={selectedBook} comments={comments} setComments={setComments} groups={groups} setGroups={setGroups} addGroup={addGroup} setBooks={setBooks} admin={admin} />
        </Route>
        <Route path="/login">
          <Login isAuth={isAuth} setIsAuth={setIsAuth} users={users} setUsers={setUsers} />
        </Route>
        <Route path="/register">
          <Registration isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path='/books'>
          <Book books={books} addBookToLibrary={addBookToLibrary}
            groups={groups} addBookForLater={addBookForLater}
            setBooks={setBooks}
          />
        </Route>
        <Route path='/leaderboard'>
          <LeaderBoard books={books} groups={groups} users={users} isAuth={isAuth} />
        </Route>
        <Route exact path='/'>
          <SplashPage isAuth={isAuth} setIsAuth={setIsAuth} users={users} setUsers={setUsers} />
        </Route>
        <Route path="*">
          <Four />
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
