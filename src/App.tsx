import React from 'react';
import './App.css';
import { PostList } from './features/posts/PostList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectPosts, fetchPosts } from './features/posts/postsSlice';
import { useEffect } from 'react';
import { AppDispatch } from './app/store';

export const loader = (dispatch: AppDispatch) => {
  dispatch(fetchPosts);
}

function App() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchPosts());
  }, [dispatch]);
  
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <PostList posts={posts}/>
    </div>
  );
}

export default App;
