import React from 'react';
import { useQuery } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
import { IBook } from '../types';

type Iprops = {
  bookId: string;
};

export default ({ bookId }: Iprops) => {
  const { data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });
  return (
    <div id="book-details">
      <p>Output book details here</p>
      {data ? (
        <>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author</p>
          <ul>
            {data.book.author.books.map((book: IBook) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </>
      ): (
        <p>No book selected...</p>
      )}
    </div>
  );
};
