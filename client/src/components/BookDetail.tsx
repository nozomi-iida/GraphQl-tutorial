import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { getBookQuery, deleteBookMutation, getBooksQuery } from '../queries/queries';
import { IBook } from '../types';
import { resolve } from 'dns';

type Iprops = {
  bookId: string;
};

export default ({ bookId }: Iprops) => {
  const [deleteBook] = useMutation(deleteBookMutation);
  const { data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });

  const onDeleteClick = (id: string) => {
    deleteBook({
      variables: { id },
      refetchQueries: [{ query: getBooksQuery, }],
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div id='book-details'>
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
          <button onClick={() => onDeleteClick(data.book.id)}>削除</button>
        </>
      ) : (
        <p>No book selected...</p>
      )}
    </div>
  );
};
