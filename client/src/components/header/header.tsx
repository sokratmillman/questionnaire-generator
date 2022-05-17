import React, { FC } from "react";
import { Link } from 'react-router-dom'

import './style.css';

type HeaderProps = {
    isAdmin?: boolean;
    activeItem?: number;
}

export const HeaderComponent: FC<HeaderProps> = ({
    isAdmin = false,
    activeItem = 0,
    ...props
}) => {
    return (
        <header className="header">
            <nav className="header__nav">
                <Link to="/" className="header__logo">InnoQuestionnaire</Link>
                {
                    isAdmin && 
                    <ul className="header__list">
                        <li className={`header__item ${activeItem === 1 ? 'header__item--active' : ''}`}>
                            <Link to="/create">
                                Create survey
                            </Link>
                        </li>
                        {/* <li className={`header__item ${activeItem === 2 ? 'header__item--active' : ''}`}>
                            <Link to="/settings">
                                Settings
                            </Link>
                        </li> */}
                        <li className="header__item">Log out</li>
                    </ul>
                }
            </nav>
        </header>
    );
};
