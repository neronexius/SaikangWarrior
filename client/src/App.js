import {BrowserRouter as Router, Route, Switch, NavLink, useHistory, Redirect} from 'react-router-dom'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration';
import React, { useState, useEffect } from "react";
import Post from './components/UI/Post';
import NavBar from './components/UI/NavBar';
import Home from './components/UI/Home';
import Search from './components/UI/Search';
import Cart from './components/UI/Cart';
import Request from './components/UI/Request';
import Task from './components/UI/Task';
import Welcome from './components/UI/Welcome';


function App() {
  useEffect(() => {
  }, [])
  const [userData, setUserData] = useState({});
  return (
    <Router>

      <Switch>
      <Route path="/"exact>
      <Welcome/>
      </Route>

      <Route path="/login">
        <Login
        setUserData = {setUserData}
        />
      </Route>

      <Route path="/register">
        <Registration/>
      </Route>

      <Route path="/post">
      <NavBar
      userData={userData}
      setUserData ={setUserData}
      />
        <Post/>
      </Route>

      <Route path="/home">
      <NavBar
      userData={userData}
      setUserData ={setUserData}
      />
        <Home
        userData={userData}
        setUserData = {setUserData}
        />
      </Route>

      <Route path="/search">
      <NavBar
      userData={userData}
      setUserData ={setUserData}
      />
        <Search
        />
      </Route>


      <Route path="/cart">
      <NavBar
      userData={userData}
      setUserData ={setUserData}
      />
        <Cart
        />
      </Route>

      <Route path="/request">
      <NavBar
      userData={userData}
      setUserData ={setUserData}
      />
        <Request
        />
      </Route>

      <Route path="/task">
      <NavBar
      userData={userData}
      setUserData ={setUserData}
      />
        <Task
        />
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
