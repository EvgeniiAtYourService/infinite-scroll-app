import React, { useState, useEffect } from 'react';
import styles from './PostList.module.css';
import { IPost } from '../../models';
import { useNavigate } from 'react-router-dom'

function PostList() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?limit=10&page=1')
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])

    useEffect(() => {
        return () => {
        }
    }, [])

    const didPostClicked = (postId: number) => () => navigate(`/${postId}`);

    const didShowMoreButtonClicked = () => {
        
    }

    return (
        <div className={styles['container']}>
            {posts.length === 0 
            ? <span>Загрузка...</span> 
            : (
                <>
                    {/* {posts.map(post => ( */}
                    {posts.filter((o, r) => r < 3).map(post => (
                        <div 
                            key={post.id} 
                            className={styles['post']}
                            onClick={didPostClicked(post.id)}
                        >
                            <h3 className={styles['post__title']}>{post.title}</h3>
                            <p className={styles['post__text']}>{post.body}</p>
                        </div>
                    ))}
                </>
            )}
            <button 
                className={styles['show-more-button']}
                onClick={didShowMoreButtonClicked}
            >
                Загрузить еще
            </button>
        </div>
    );
}

export default PostList;