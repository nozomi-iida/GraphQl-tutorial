import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

export interface IAuthor {
  id: string;
  name: string;
  age: number;
}

type FormData = {
  name: string;
  genre: string;
  authorId: string;
};

export default () => {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const { data, loading } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const onSubmit = handleSubmit(({ name, genre, authorId }) => {
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{query: getBooksQuery}]
    });
    setValue('name', '')
    setValue('genre', '')
  }); 

  if (loading) {
    return <div>Logaind books...</div>;
  }
  return (
    <form onSubmit={onSubmit} id="add-book">
      <div className="field">
        <label>Book Name: </label>
        <input name='name' ref={register} />
      </div>
      <div className="field">
        <label>Genre: </label>
        <input name='genre' ref={register} />
      </div>
      <div className="field">
        <label>Author: </label>
        <select name='authorId' ref={register}>
          {data.authors.map((author: IAuthor) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>+</button>
    </form>
  );
};
