import React, { useState, useEffect } from 'react'
import { IPost } from '../../models'
import styles from './Post.module.css';

const Post = () => {

  const [post, setPost] = useState<IPost | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1') //
    .then(response => response.json())
    .then(data => setPost(data))
  }, [])

  return (
    <div className={styles['post']}>
        {!post ? (
            <span>Загрузка...</span>
        ) : (
            <>
                <h3 className={styles['post__title']}>{post.title}</h3>
                <span className={styles['post__author']}>Автор: {post.userId}</span>
                <p className={styles['post__text']}>{post.body}</p>
            </>
        )}
    </div>
  )
}

export default Post;