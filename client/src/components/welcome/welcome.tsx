import React, { FC } from "react";
import { HeaderComponent } from "../header/header";
import { PopupComponent } from "../popup/popup";

import './style.css';

type WelcomeComponentProps = {
    isLogined?: boolean;
    isEnd?: boolean;
}

const WelcomeContent: FC<Pick<WelcomeComponentProps, 'isLogined'>> = ({
    isLogined,
}) => (
    <>
        <h1 className="main__title">
            {isLogined ? 'Create your first survey' : 'Welcome to InnoQuestionnaire!'}
        </h1>
        {
            !isLogined && 
            <p className="main__subtitle">
                Create surveys of any complexity with us
            </p>
        }
        <ul className="main__list">
            <li className="main__item">Upload .csv file for questions</li>
            <li className="main__item">Share link on survey</li>
            <li className="main__item">Manage results in your account</li>
        </ul>
        <a className="main__bottom" href="/">
            {
                isLogined ?
                'Create my first survey' :
                'Create first survey'
            }
            
        </a>
    </>
)

const EndContent: FC = () => (
    <>
        <i className="main__icon">🎉</i>
        <h1 className="main__title">
            Thank you for completing the survey!
        </h1>
    </>
)

export const WelcomeComponent: FC<WelcomeComponentProps> = ({
    isLogined = false,
    isEnd = false,
    ...props
}) => {
    return (
        <>
            <HeaderComponent isAdmin={isLogined} />
            <main className="main" data-islogined={isLogined} data-isend={isEnd}>
                <div className="main__container">
                    {
                        isEnd ?
                        <EndContent /> :
                        <WelcomeContent isLogined={isLogined} />
                    }
                </div>
            </main>
        </>
    );
};
