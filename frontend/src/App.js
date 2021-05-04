import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./components/Articles";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NewArticle from "./components/NewArticle";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./components/userContext";
import "./App.css";
// import Login from "./components/Login";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [storage, setStorage] = useState(localStorage.getItem("auth-token"));

  useEffect(() => {
    // setDisplayArticles(storage);
  }, [storage]);
  function handleLogout() {
    localStorage.setItem("auth-token", null);
    setStorage(null);
  }

  const value = { userData, setUserData };

  return (
    <Router>
      <NavBar handleLogout={handleLogout} storage={storage} />
      <UserContext.Provider value={value}>
        <div id="page-body">
          <Switch>
            <Route path="/" exact>
              <Home></Home>
            </Route>
            <Route path="/register" component={Register} />
            <Route path="/login">
              <Login setStorage={setStorage}></Login>
            </Route>
            <Route path="/articles">
              <Articles storage={storage} />
            </Route>

            <Route path="/new-article">
              <NewArticle />
            </Route>
            {/* <Route path="/article/:id" component={Article} exact /> */}
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
