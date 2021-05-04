import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar({ handleLogout, storage }) {
  // const [displayArticles, setDisplayArticles] = useState(null);

  // const [storage, setStorage] = useState(localStorage.getItem("auth-token"));

  // useEffect(() => {
  //   // setDisplayArticles(storage);
  // }, [storage]);
  // function handleLogout() {
  //   localStorage.setItem("auth-token", null);
  //   setStorage(null);
  // }
  return (
    // <nav className="navbar bg-dark container">
    //   <h4>
    //     <Link to="/">Home</Link>
    //   </h4>
    //   <h4>
    //     <Link to="/notes">Notes</Link>
    //   </h4>
    //   <h4>
    //     <Link to="/create">Create Note</Link>
    //   </h4>
    // </nav>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">WriteUP</Link>
          </li>
          {storage !== null && (
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          )}
          <li>
            <Link to="/new-article">New Article</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
