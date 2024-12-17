import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

interface AppHeaderProps {
    activeItem?: 'constructor' | 'orders' | 'profile';
}

export const AppHeader: React.FC<AppHeaderProps> = ({ activeItem = 'constructor' }) => {
  return (
    <header className={styles.header}>
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                <li className={styles.gap}>
                    <div className={styles.listItem}>
                        <BurgerIcon type={activeItem === 'constructor' ? 'primary' : 'secondary'} />
                        <a 
                            href="/constructor" 
                            className={classNames(
                                "text text_type_main-default ml-2",
                                { [styles.active]: activeItem === 'constructor' }
                            )}
                        >
                            Конструктор
                        </a>
                    </div>
                    <div className={styles.listItem}>
                        <ListIcon type={activeItem === 'orders' ? 'primary' : 'secondary'} />
                        <a 
                            href="/orders" 
                            className={classNames(
                                'text text_type_main-default ml-2',
                                { [styles.active]: activeItem === 'orders' }
                            )}
                        >
                            Лента заказов
                        </a>
                    </div>    
                </li>
                <li className={styles.logo}>
                    <a href="/">
                        <Logo />
                    </a>
                </li>
                <li className={styles.listItem}>
                    <ProfileIcon type={activeItem === 'profile' ? 'primary' : 'secondary'} />
                    <a 
                        href="/profile" 
                        className={classNames(
                            'text text_type_main-default ml-2',
                            { [styles.active]: activeItem === 'profile' }
                        )}
                    >
                        Личный кабинет
                    </a>
                </li>
            </ul>
        </nav>
    </header>
  );
};