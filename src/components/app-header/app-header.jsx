import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

export const AppHeader = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.leftSideList}>
                        <div className={styles.listItem}>
                            <BurgerIcon type={currentPath === '/' ? 'primary' : 'secondary'} />
                            <Link 
                                to="/" 
                                className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}
                            >
                                Конструктор
                            </Link>
                        </div>
                        <div className={styles.listItem}>
                            <ListIcon type={currentPath === '/orders' ? 'primary' : 'secondary'} />
                            <Link 
                                to="/orders"  
                                className={`${styles.link} ${currentPath === '/orders' ? styles.active : ''}`}
                            >
                                Лента заказов
                            </Link>
                        </div>    
                    </li>
                    <li>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </li>
                    <li className={styles.listItem}>
                        <ProfileIcon type={currentPath.startsWith('/profile')  ? 'primary' : 'secondary'} />
                        <Link 
                            to="/profile" 
                            className={`${styles.link} ${currentPath.startsWith('/profile') ? styles.active : ''}`}
                        >
                            Личный кабинет
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};