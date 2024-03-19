import React, { useState, useEffect } from 'react';
import styles from './PostList.module.css';
import { IPost } from '../../models';
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';

const LIMIT = 10;

function PostList() {

    const [posts, setPosts] = useState<IPost[]>([])

    const [totalCount, setTotalCount] = useState<number | null>(null)
    
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    // Условие, чтобы перестать реагировать на скролл после первых 5-и прокруток
    const infiniteScrollDisabled = currentPage > 6;

    const didScrolled = (event: any) => { // TODO: FIX any
        // Общая высота страницы с учётом скролла
        const wholePageHeight = event.target.documentElement.scrollHeight;
        // Текущее положение скролла от верха страницы
        const scrollOffset = event.target.documentElement.scrollTop;
        // Высота видимой области страницы (Высота браузера)
        const windowHeight = window.innerHeight;
        // Условие для приближения к нижнему краю
        const scrolledToEnd = (wholePageHeight - (scrollOffset + windowHeight)) < 100; 

        if (scrolledToEnd) { 
            setIsLoading(true);
        }
    };

    useEffect(() => {
        // Будем запрашивать 10 новых постов каждый раз, когда isLoading === true
        if (isLoading) {       
            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${currentPage}`)
                .then(response => {
                    // Установим общее кол-во постов
                    setTotalCount(Number(response.headers.get('x-total-count'))); // FIX if condition
                    return response.json();
                })
                .then(data => {
                    setPosts([...posts, ...data]); 
                    setCurrentPage(prevValue => prevValue + 1);
                })
                .catch(error => alert(`Ошибка при запросе данных, попробуйте обновить страницу. ${error.message}`))
                .finally(() => setIsLoading(false))
        }
    }, [isLoading, currentPage, posts])

    useEffect(() => {
        document.addEventListener('scroll', didScrolled);

        if (infiniteScrollDisabled) {
            document.removeEventListener('scroll', didScrolled);
        }

        return () => document.removeEventListener('scroll', didScrolled);
    }, [infiniteScrollDisabled])

    const didShowMoreButtonClicked = () => setIsLoading(true);

    return (
        <div className={styles['container']}>
            {(posts.length === 0) 
                ? <Loader /> 
                : posts.map(post => <PostCard key={post.id} post={post} />)
            }

            {/* Индикатор загрузки при прокрутках и для кнопки загрузки */}
            {(posts.length > 0) && isLoading && <Loader />}

            {/* Спрячем кнопку после загрузки всех постов */}
            {infiniteScrollDisabled && (posts.length !== totalCount) && (
                <button
                    className={styles['show-more-button']}
                    onClick={didShowMoreButtonClicked}
                    disabled={isLoading}
                >
                    Загрузить еще
                </button>
            )}
        </div>
    );
}

export default PostList;