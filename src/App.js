import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null)


  return (
    <div className="app">
      {!user ? (
        <Login setUser = {setUser}/>
      ) : (
        <div className="app_body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomId">
                <Sidebar user = {user}/>
                <Chat user = {user}/>
              </Route>
              <Route path="/">
                <Sidebar user = {user}/>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
