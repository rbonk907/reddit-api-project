import React from 'react';
import './App.css';
import PostList from './features/posts/PostList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectPosts, fetchPosts } from './features/posts/postsSlice';
import { useEffect } from 'react';
import { AppDispatch } from './app/store';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import PostPage from './features/posts/PostPage';
import Header from './features/search/Header';
import FilterBar from './Components/FilterBar';
import { BsHouseDoor } from 'react-icons/bs';


export default function App() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchPosts('embedded'));
  }, []);
  
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList posts={posts} />} />
          <Route path=":subreddit/" element={<PostList posts={posts} />} />
          <Route path=":subreddit/" element={<PostList posts={posts} />} />
          <Route path=":subreddit/" element={<PostList posts={posts} />} />
          <Route path=":subreddit/" element={<PostList posts={posts} />} />
        </Route>
        <Route path=":subreddit/posts/:postID" element={<PostPage />} />
      </Routes>
  );
}

function Layout() {
  const dispatch = useAppDispatch();

  const handleNavClick = (subreddit: string) => {
    dispatch(fetchPosts(subreddit));
  }
  
  return (
    <div className="App">
      <Header />
      <aside>
        <div className="subredditLink">
          <span className="feeds">FEEDS</span>
          <NavLink to="/" >
            <div className="home">
              <BsHouseDoor />
              Home
            </div>
          </NavLink>
          <div className='line'></div>
          <NavLink 
            to="C_Programming/"
            onClick={() => handleNavClick('C_Programming')} >
            r/C_Programming
          </NavLink>
          <NavLink to="computerarchitecture/" >r/computerarchitecture</NavLink>
          <NavLink to="ECE/" >r/ECE</NavLink>
          <NavLink to="embedded/" >r/embedded</NavLink>
        </div>
      </aside>
      <div className="postSection">
        <FilterBar />
        <Outlet />
      </div>
    </div>
  )
}

