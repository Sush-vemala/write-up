import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "./userContext";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import "./Home.css";

function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const [flag, setFlag] = useState(false);
  const [userName, setUserName] = useState("");
  const [newData, setNewData] = useState({});

  function handleEdit() {
    setFlag(true);
  }
  function handleTextChange(e) {
    console.log(e.target.value);
    setUserName(e.target.value);
  }

  function renderInputField() {
    return (
      <div>
        <label>username</label>
        <input type="text" value={userName} onChange={handleTextChange}></input>
        <div className="button-group">
          <button className="button" type="submit" onClick={handleSubmit}>
            Change
          </button>
          <button className="button" type="submit" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await axios.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenResponse.data) {
        const userRes = await axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, [newData]);

  function handleCancel() {
    console.log("form should be canceled");
  }

  async function handleSubmit() {
    let data = await axios.patch(
      `http://localhost:3002/users/updateProfile/${userData.user.id}`,
      { displayName: userName }
    );
    setNewData(data);
  }
  console.log(userData);
  console.log(userData.user);
  return (
    <div>
      <p> Write up is a articles publishing platform. </p>
      {userData.user ? (
        <div>
          {/* <h1>Profile</h1> */}
          <h2>Welcome, {userData.user.displayName}</h2>
          <div className="userData">
            <p> click on the edit option to change your profile settings</p>
            <EditIcon onClick={handleEdit}></EditIcon>
          </div>
          {flag ? renderInputField() : <> </>}
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
export default Home;
