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
  
  
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path=":subreddit/:filter/" element={<PostList />} />
          <Route path=":subreddit/" element={<PostList />} />
        </Route>
        <Route path=":subreddit/:filter/posts/:postID" element={<PostPage />} />
        <Route path=":subreddit/posts/:postID" element={<PostPage />} />
      </Routes>
  );
}

function Layout() {
  const dispatch = useAppDispatch();

  const handleNavClick = (subreddit: string, filter: string) => {
    dispatch(fetchPosts({name: subreddit, filter: filter}));
  }
  
  return (
    <div className="App">
      <Header />
      <aside>
        <div className="subredditLink">
          <span className="feeds">FEEDS</span>
          <NavLink 
            to="/"
            onClick={() => handleNavClick('embedded', 'hot')} >
            <div className="home">
              <BsHouseDoor />
              Home
            </div>
          </NavLink>
          <div className='line'></div>
          <NavLink 
            to="C_Programming"
            onClick={() => handleNavClick('C_Programming', 'hot')} 
            className={({ isActive }) => isActive ? "linkActive" : undefined} >
            r/C_Programming
          </NavLink>
          <NavLink 
            to="computerarchitecture"
            onClick={() => handleNavClick('computerarchitecture', 'hot')} 
            className={({ isActive }) => isActive ? "linkActive" : undefined} >
            r/computerarchitecture
          </NavLink>
          <NavLink 
            to="ECE"
            onClick={() => handleNavClick('ECE', 'hot')} 
            className={({ isActive }) => isActive ? "linkActive" : undefined} >
            r/ECE
          </NavLink>
          <NavLink 
            to="embedded"
            onClick={() => handleNavClick('embedded', 'hot')} 
            className={({ isActive }) => isActive ? "linkActive" : undefined} >
            r/embedded
          </NavLink>
        </div>
      </aside>
      <div className="postSection">
        <FilterBar handleClick={handleNavClick}/>
        <Outlet />
      </div>
    </div>
  )
}

