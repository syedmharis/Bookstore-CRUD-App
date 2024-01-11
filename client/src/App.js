import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_URL)
      .then((response) => response.json())
      .then((data) => setBooks(data.reverse()));
  }, [books]);

  const addBook = (newBook) => {
    setBooks([newBook, ...books]); 
  };

  return (
    <div className="App">
      <h1>Bookstore</h1>
      <div className="add-book-form">
        <AddBookForm addBook={addBook} />
      </div>
      <div className="book-list">
        <BookList books={books} />
      </div>
    </div>
  );
}

export default App;
