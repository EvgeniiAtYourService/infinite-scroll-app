import React from 'react';
import { IPost } from '../../models';
import styles from './PostCard.module.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
    post: IPost;
}

const PostCard: React.FC<IProps> = props => {

    const { post: { id, body, title, userId } } = props;

    const navigate = useNavigate();

    const didPostClicked = (postId: number) => () => navigate(`/${postId}`);

    return (
        <div
            className={styles['post']}
            onClick={didPostClicked(id)}
        >
            <h3 className={styles['post__title']}>{title}</h3>
            <span className={styles['post__author']}>Автор: {userId}</span>
            <p className={styles['post__text']}>{body}</p>
        </div>
    )
}

export default PostCard;