import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch, Redirect, withRouter, useHistory, useLocation } from 'react-router-dom';
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
import Form from '../Form/Form';

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

  async function addGroup(name) {
    const newGroup = {
      name: name,
    };
    console.log(name);
    const response = await fetch('/api_v1/groups/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(newGroup),
    });
    if (response.ok) {
      console.log(response)
      setGroups([...groups, newGroup]);
      console.log({ groups })
      return response.json();
    }
  }

  async function addMember(name) {
    const newMember = {
      members: name,
    };
    console.log(name);
    const response = await fetch('/api_v1/groups/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(newMember),
    });
    if (response.ok) {
      console.log(response)
      setGroups([...groups, newMember]);
      console.log({ groups })
      return response.json();
    }
  }

  useEffect(() => {

    // GET request using fetch with async/await
    async function getGroups() {
      const response = await fetch('/api_v1/groups/');
      const data = await response.json();
      console.log({ data });
      setGroups(data);
      console.log('groups', groups);
    }// return menuItemsAPI
    getGroups();
    console.log({ groups })
  }, [])

  useEffect(() => {

    const checkAuth = async () => {
      const response = await fetch('/rest-auth/user/');
      if (!response.ok) {
        console.log('not ok')
        setIsAuth(false);
      } else {
        const data = await response.json();
        setAdmin(data)
        // console.log({response})
        console.log({ data })
        setIsAuth(true);
        console.log({ admin })
        console.log(admin.is_staff)
      }
    }
    checkAuth()
  }, [isAuth])


  //addBookToList
  async function addBookToLibrary(bookToSubmit, finished) {
    console.log({ finished })


    bookToSubmit.finished = finished


    console.log({ bookToSubmit })
    const response = await fetch('/api_v1/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(bookToSubmit),
    });
    if (response.ok) {
      console.log(response)
      // setBooks([...books, newBook]);
      // console.log({books})
      // return response.json(); 
    }
  }

  async function addBookForLater(author, title, description, image, categories, pages) {
    console.log({ author })
    console.log({ title })
    console.log({ description })
    // console.log({title})
    console.log({ categories })
    const newBook = {
      author,
      title,
      description,
      // image: image,
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
      console.log(response)
      // setBooks([...books, newBook]);
      // console.log({books})
      // return response.json(); 
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

      <Header handleLogoutSubmit={handleLogoutSubmit} isAuth={isAuth} admin={admin} />
      <Switch>
        <Route path='/profile'>
          <Profile books={books} isAuth={isAuth} />
        </Route>
        <Route path='/groups'>
          <Groups groups={groups} addGroup={addGroup} setBooks={setBooks} />
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
        <Route path='/home'>
          <HomePage books={books} groups={groups} users={users} isAuth={isAuth} />
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
