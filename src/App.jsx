import { useState } from 'react';
import './App.css';
import { useGetPostsQuery, useCreatePostMutation } from './redux/api/apiSlice';

const App = () => {
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const { data, isLoading, error, refetch } = useGetPostsQuery();
  const [createPost, { isLoading: isCreating, error: createPostError }] =
    useCreatePostMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (createPostError) {
    return <p>Error while creating post... {createPostError.message}</p>;
  }

  if (error) {
    return <p>There was an error: {error.message}</p>;
  }

  const handleCreatePost = async () => {
    try {
      await createPost(newPost);
      // refetch after creating a post
      refetch();
    } catch (err) {
      console.error(`Error while creating a post ${err.message}`);
      throw new Error(err.message);
    }
  }

  console.log('data', data);
  return (
    <>
      <h1>Hello from React!</h1>
      <div>
        <input
          type='text'
          placeholder='Title...'
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type='text'
          placeholder='Body...'
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, body: e.target.value }))
          }
        />
        <button onClick={handleCreatePost} disabled={isCreating}>Create Post</button>
      </div>

      <div>
        {data?.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </div>
    </>
  );
};

export default App;
