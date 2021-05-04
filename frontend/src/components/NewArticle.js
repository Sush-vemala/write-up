import React, { useState } from "react";
import "./NewArticle.css";
import axios from "axios";

function NewArticle() {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    // console.log(event.target);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    // setInput(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    const newArticle = {
      title: input.title,
      content: input.content,
    };
    console.log(input);
    axios.post("http://localhost:3002/articles/create", newArticle);
  }

  return (
    <div>
      {/* <form>
        <label>Article Title</label>
        <input type="text" value={input.title} onChange={handleChange}></input>
        <label>Content</label>
        <textarea onChange={handleChange} value={input.content}></textarea>
        <button className="button"  onClick={handleClick}>
          Post Article
        </button>
      </form> */}
      <form>
        <label>Article Title</label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}></input>
        <label>Content</label>
        <textarea
          onChange={handleChange}
          name="content"
          value={input.content}></textarea>
        <button className="button" onClick={handleClick}>
          Post Article
        </button>
      </form>
    </div>
  );
}

export default NewArticle;
