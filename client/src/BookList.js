import React from 'react';
import Book from './Book';

const BookList = ({ books }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Author</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>ISBN</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <Book key={book._id} book={book} />
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
