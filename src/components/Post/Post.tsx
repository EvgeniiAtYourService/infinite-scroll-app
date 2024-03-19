import React, { useState, useEffect } from 'react'
import { IPost } from '../../models'
import styles from './Post.module.css';
import { useParams, useNavigate } from 'react-router-dom'

const Post = () => {

    const { postId } = useParams();

    const navigate = useNavigate();

    const [post, setPost] = useState<IPost | null>(null)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data))
    }, [])

    const didBackButtonClicked = () => navigate('/');

    return (
        <div className={styles['container']}>
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
            <button
                className={styles['back-button']}
                onClick={didBackButtonClicked}
            >
                На главную
            </button>
        </div>
    )
}

export default Post;