import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { IPost } from './models';

function App() {

  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
  }, [])

  useEffect(() => {
    return () => {
    }
  }, [])

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className={styles['post']}>
          <h3 className={styles['post__title']}>{post.title}</h3>
          <p className={styles['post__text']}>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;