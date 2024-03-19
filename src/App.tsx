import React from 'react';
import { Routes, Route } from 'react-router-dom'
import PostList from './components/PostList/PostList';
import Post from './components/Post/Post';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PostList />} />
      <Route path='/:postId' element={<Post />} />
    </Routes>
  );
}

export default App;