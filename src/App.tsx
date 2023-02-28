import React from 'react';
import './App.css';
import { PostList } from './features/posts/PostList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectPosts, fetchPosts } from './features/posts/postsSlice';
import { useEffect } from 'react';
import { AppDispatch } from './app/store';
import { Routes, Route, Outlet } from 'react-router-dom';
import PostPage from './features/posts/PostPage';


export default function App() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchPosts());
  }, [dispatch]);
  
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList posts={posts} />} />
          <Route path="posts/:postID" element={<PostPage />} />
        </Route>
      </Routes>
  );
}

function Layout() {
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

