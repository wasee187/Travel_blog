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
import Footer from './components/footer/Footer.jsx';
import Contact from './pages/contact/Contact.jsx';
import About from './pages/about/About.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import Profile from './pages/profile/Profile.jsx';
import Categories from './pages/categories/Categories.jsx';

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
        <Route path='/dashboard/:userId'>
          {user ? <Dashboard /> : <Register />}
        </Route>
        <Route path='/profile/:userId'>
          {user ? <Profile /> : <Register />}
        </Route>
        <Route path='/category'>
          {user && user.role ? <Categories /> : <Register />}
        </Route>
        <Route path='/post/:postId'>
          <ReadPost />
        </Route>
        <Route path='/contactUs'>
          <Contact />
        </Route>
        <Route path='/aboutUs'>
          <About />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
