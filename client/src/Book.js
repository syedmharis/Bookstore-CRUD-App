import React from 'react';

const Book = ({ book }) => {
  return (
    <tr>
      <td style={{ border: '1px solid black', padding: '8px' }}>{book.title}</td>
      <td style={{ border: '1px solid black', padding: '8px' }}>{book.author}</td>
      <td style={{ border: '1px solid black', padding: '8px' }}>{book.isbn}</td>
    </tr>
  );
};

export default Book;
