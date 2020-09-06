import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import {
  getBookQuery,
  deleteBookMutation,
  getBooksQuery,
  getAuthorsQuery,
  updateBookMutation,
} from '../queries/queries';
import { useForm } from 'react-hook-form';

export interface IAuthor {
  id: string;
  name: string;
  age: number;
}

type Iprops = {
  bookId: string;
};

type FormData = {
  name: string;
  genre: string;
  authorId: string;
};

export default ({ bookId }: Iprops) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [deleteBook] = useMutation(deleteBookMutation);
  const [updateBook] = useMutation(updateBookMutation);
  const { data: bookData } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });
  console.log(bookData);
  const { data: authorData } = useQuery(getAuthorsQuery);

  const onDeleteClick = (id: string) => {
    deleteBook({
      variables: { id },
      refetchQueries: [{ query: getBooksQuery }],
    }).then(() => {
      window.location.reload();
    });
  };

  const onSubmit = handleSubmit(({ name, genre, authorId }) => {
    updateBook({
      variables: {
        id: bookData.book.id,
        name,
        genre,
        authorId
      },
      refetchQueries: [{query: getBooksQuery}]
    }).then(() => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  });

  return (
    <div id='book-details'>
      <p>Output book details here</p>
      {bookData ? (
        <>
          <form onSubmit={onSubmit}>
            <div className='field'>
              <label>Book Name: </label>
              <input
                name='name'
                defaultValue={bookData.book.name}
                ref={register}
              />
            </div>
            <div className='field'>
              <label>Genre: </label>
              <input
                name='genre'
                defaultValue={bookData.book.genre}
                ref={register}
              />
            </div>
            <div className='field'>
              <label>Author: </label>
              <select name='authorId' defaultValue={bookData.book.author.id} ref={register}>
                {authorData.authors.map((author: IAuthor) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit'>更新</button>
          </form>
          <button onClick={() => onDeleteClick(bookData.book.id)}>削除</button>
        </>
      ) : (
        <p>No book selected...</p>
      )}
    </div>
  );
};
