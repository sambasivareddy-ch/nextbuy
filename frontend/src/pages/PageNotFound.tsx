import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/pagenotfound.module.css';

const PageNotFound: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404 - Page Not Found</h1>
                <p className={styles.message}>The page you are looking for does not exist.</p>
                <Link to="/" className={styles.homeLink}>Go to Home</Link>
            </div>
        </div>
    );
}

export default PageNotFound;  