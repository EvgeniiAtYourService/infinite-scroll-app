import React, { useState, useEffect } from 'react';
import styles from './PostList.module.css';
import { IPost } from '../../models';
import { useNavigate } from 'react-router-dom'

function PostList() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState<IPost[]>([])
    
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const didScrolled = (event: any) => {
        const wholePageHeight = event.target.documentElement.scrollHeight; // Общая высота страницы с учётом скролла
        const scrollOffset = event.target.documentElement.scrollTop; // Текущее положение скролла от верха страницы
        const windowHeight = window.innerHeight; // Высота видимой области страницы (Высота браузера)

        if ((wholePageHeight - (scrollOffset + windowHeight)) < 100) { // Условие для приближения к нижнему краю
            setIsLoading(true);
        }
    }

    useEffect(() => {
        if (isLoading) {            
            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
                .then(response => response.json())
                .then(data => { setPosts([...posts, ...data]); setCurrentPage(prevValue => prevValue + 1) })
                .catch(error => alert(`Ошибка при запросе данных, попробуйте обновить страницу. ${error.message}`))
                .finally(() => setIsLoading(false))
        }
    }, [isLoading, currentPage, posts])

    useEffect(() => {
        document.addEventListener('scroll', didScrolled)
        return () => document.removeEventListener('scroll', didScrolled)
    }, [])

    const didPostClicked = (postId: number) => () => navigate(`/${postId}`);

    const didShowMoreButtonClicked = () => {
        
    }

    return (
        <div className={styles['container']}>
            {(posts.length === 0) 
                ? <span>Загрузка...</span> 
                : posts.map(post => (
                        <div
                            key={post.id}
                            className={styles['post']}
                            onClick={didPostClicked(post.id)}
                        >
                            <h3 className={styles['post__title']}>{post.title}</h3>
                            <p className={styles['post__text']}>{post.body}</p>
                        </div>
                    ))
            }
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