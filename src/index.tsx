import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import PostPage from './features/posts/PostPage';
import reportWebVitals from './reportWebVitals';
import './index.css';
 





function Index() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "posts/:postID",
      element: <PostPage />
    }
  ])

  return <RouterProvider router={router} />;
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
