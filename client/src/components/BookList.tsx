import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { IBook } from '../types';
import { getBooksQuery } from '../queries/queries';
import BookDetail from './BookDetail';

export default () => {
  const [selected, setSelected] = useState('');
  const { data, loading } = useQuery(getBooksQuery);
  if (loading) {
    return <div>Logaind books...</div>;
  }
  return (
    <div>
      <ul id="book-list">
        {data.books.map((book: IBook) => (
          <li key={book.id} onClick={() => setSelected(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetail bookId={selected} />
    </div>
  );
};
