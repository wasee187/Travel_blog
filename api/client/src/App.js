import React, { useContext } from 'react';
import Home from './pages/home/Home.jsx';
import Topbar from './components/topbar/Topbar.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import Settings from './pages/settings/Settings.jsx';
import ReadPost from './pages/read-post/ReadPost.jsx';
import Write from './pages/write/Write.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Context } from './context/Context.js';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/register'>{user ? <Home /> : <Register />}</Route>
        <Route path='/login'>{user ? <Home /> : <Login />}</Route>
        <Route path='/write'>{user ? <Write /> : <Register />}</Route>
        <Route path='/settings'>{user ? <Settings /> : <Register />}</Route>
        <Route path='/post/:postId'>
          <ReadPost />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
