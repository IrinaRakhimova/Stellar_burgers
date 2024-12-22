import React, {useState} from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const AppHeader: React.FC = () => {
    const [active, setActive] = useState<'constructor' | 'orders' | 'profile'>('constructor');

    const handleHeaderClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        item: 'constructor' | 'orders' | 'profile'
    ) => {
        e.preventDefault(); 
        setActive(item); 
    };
  
    return (
    <header className={styles.header}>
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                <li className={styles.leftSideList}>
                    <div className={styles.listItem}>
                        <BurgerIcon type={active === 'constructor' ? 'primary' : 'secondary'} />
                        <a 
                            href="/" 
                            className={`${styles.link} ${active === 'constructor' ? styles.active : ''}`}
                            onClick={(e) => handleHeaderClick(e, 'constructor')}
                        >
                            Конструктор
                        </a>
                    </div>
                    <div className={styles.listItem}>
                        <ListIcon type={active === 'orders' ? 'primary' : 'secondary'} />
                        <a 
                            href="/" 
                            className={`${styles.link} ${active === 'orders' ? styles.active : ''}`}
                            onClick={(e) => handleHeaderClick(e, 'orders')}
                        >
                            Лента заказов
                        </a>
                    </div>    
                </li>
                <li>
                    <a href="/">
                        <Logo />
                    </a>
                </li>
                <li className={styles.listItem}>
                    <ProfileIcon type={active === 'profile' ? 'primary' : 'secondary'} />
                    <a 
                        href="/" 
                        className={`${styles.link} ${active === 'profile' ? styles.active : ''}`}
                        onClick={(e) => handleHeaderClick(e, 'profile')}
                    >
                        Личный кабинет
                    </a>
                </li>
            </ul>
        </nav>
    </header>
  );
};