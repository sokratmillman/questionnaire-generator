import React, { FC, useState } from "react";

import './style.css';

type HeaderProps = {
    isAdmin?: boolean;
}

export const HeaderComponent: FC<HeaderProps> = ({
    isAdmin = false,
    ...props
}) => {
    const [isActive, setIsActive] = useState(1);

    return (
        <header className="header">
            <nav className="header__nav">
                <a className="header__logo" href="/">InnoQuestionnaire</a>
                {
                    isAdmin && 
                    <ul className="header__list">
                        <li className="header__item header__item--active">Create survey</li>
                        <li className="header__item">Settings</li>
                        <li className="header__item">Log out</li>
                    </ul>
                }
            </nav>
        </header>
    );
};
