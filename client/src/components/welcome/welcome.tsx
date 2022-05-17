import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopupComponent } from "../popup/popup";

import './style.css';

type WelcomeComponentProps = {
    setIsLogined: (isLogined: boolean) => void;
    setUserId?: (userId: number) => void;
    isLogined: boolean;
    isEnd?: boolean;
}

type WelcomeContentProps = {
    handleButtonClick: () => void;
    isLogined: boolean;
}

const WelcomeContent: FC<WelcomeContentProps> = ({
    isLogined,
    handleButtonClick,
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
        <button className="main__botton" onClick={() => {
            handleButtonClick();
        }}>
            {
                isLogined ?
                'Create my first survey' :
                'Create first survey'
            }
            
        </button>
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
    setIsLogined,
    setUserId,
    isLogined = false,
    isEnd = false,
    ...props
}) => {
    const navigate = useNavigate();
    const [isLoginActive, setIsLoginActive] = useState(false);

    const handleButtonClick = () => {
        if (isLogined) {
            navigate('/create');
        } else {
            setIsLoginActive(true);
        }
        // if (isLogined) {
        //     setIsLoginActive(true);
        // } else {
        //     setIsRegisterActive(false);
        // }
    }

    const hidePopup = (login?: string, password?: string, isRegistration?: boolean) => {
        if (login && password) {
            const data = {
                login,
                password,
            }

            if (isRegistration) {
                fetch('https://quiet-island-30954.herokuapp.com/api/users/create', {
                    method: 'POST',
                    body: new URLSearchParams({
                        'login': login,
                        'password': password,
                    }),
                    // mode: 'no-cors',
                    // headers: {
                    //   'Content-Type': 'application/json;charset=utf-8'
                    // },
                })
                    .then((res) => {
                        if (res.ok) {
                            setIsLogined(true);
                        }
                        return res.json();
                    })
                    .then((json) => {
                        setUserId && setUserId(json.id);
                    });
            } else {
                fetch('https://quiet-island-30954.herokuapp.com/api/users/login', {
                    method: 'POST',
                    body: new URLSearchParams({
                        'login': login,
                        'password': password,
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((json) => {
                        setIsLogined(true);
                        setUserId && setUserId(json.id);
                    });
            }
        }

        setIsLoginActive(false);
    }

    return (
        <main className="main" data-islogined={isLogined} data-isend={isEnd}>
            <div className="main__container">
                {
                    isEnd ?
                    <EndContent /> :
                    <WelcomeContent
                        isLogined={isLogined}
                        handleButtonClick={handleButtonClick}
                    />
                }
            </div>
            {isLoginActive && <PopupComponent onHide={hidePopup} />}
        </main>
    );
};
