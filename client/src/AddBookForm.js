import React, { useState } from 'react';

const AddBookForm = ({ addBook }) => {
  const [book, setBook] = useState({ title: '', author: '', isbn: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(process.env.REACT_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newBook = await response.json();
      addBook(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
    }

    setBook({ title: '', author: '', isbn: '' });
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={book.title} 
        onChange={handleChange} 
        placeholder="Title" 
      />
      <input 
        type="text" 
        name="author" 
        value={book.author} 
        onChange={handleChange} 
        placeholder="Author" 
      />
      <input 
        type="text" 
        name="isbn" 
        value={book.isbn} 
        onChange={handleChange} 
        placeholder="ISBN" 
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
