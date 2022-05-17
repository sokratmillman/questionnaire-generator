import React, { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";

import './style.css';

type PopupProps = {
    isLogin?: boolean;
    onHide: (login?: string, password?: string, isRegistration?: boolean) => void;
}

export const PopupComponent: FC<PopupProps> = ({
    isLogin = false,
    onHide,
}) => {
    const onClick = () => {
        onHide();
    }

    const [isRegsiter, setIsRegister] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        onHide(login, password, isRegsiter);
    }

    const onLoginChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setLogin(evt.target.value);
    }, []);

    const onPasswordChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value);
    }, []);

    const handleCreateNewClick = useCallback(() => {
        setIsRegister(true);
    }, []);

    return (
        <div className="wrapper" onClick={onClick}>
            <div className="popup" onClick={(event) => {
                event.stopPropagation();
            }}>
                <h1 className="popup__title">{isRegsiter ? 'Registration' : 'Log in to account'}</h1>

                <form className="popup__form" onSubmit={onSubmit}>
                    <div>
                        <label className="popup__label" htmlFor="login-email">Username</label>
                        <input name="login-email" onChange={onLoginChange} required className="popup__input" id="login-email" placeholder="Write here your username" />
                    </div>
                    
                    <div>
                        <label className="popup__label" htmlFor="login-passport">Password</label>
                        <input name="login-passport" onChange={onPasswordChange} required type="password" className="popup__input" id="login-passport" placeholder="Write here your password" />
                    </div>
                    
                    <button className="popup__submit" type="submit">
                        {isRegsiter ? 'Create account' : 'Log in'}
                    </button>
                </form>

                {!isRegsiter && <div className="popup__alternative">
                    <p className="popup__or">or</p>
                    <button onClick={handleCreateNewClick} className="popup__link">Сreate new account</button>
                </div>}
            </div>
        </div>
    )
}