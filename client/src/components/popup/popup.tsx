import React, { FC } from "react";

import './style.css';

type PopupProps = {
    isLogin?: boolean;
}

export const PopupComponent: FC<PopupProps> = ({
    isLogin = false,
}) => {
    return (
        <div className="popup">
            <h1 className="popup__title">Log in to account</h1>

            <form className="popup__form">
                <div>
                    <label className="popup__label" htmlFor="login-email">Email</label>
                    <input className="popup__input" id="login-email" placeholder="Write here your email" />
                </div>
                
                <div>
                    <label className="popup__label" htmlFor="login-passport">Password</label>
                    <input className="popup__input" id="login-passport" placeholder="Write here your password" />
                </div>
                
                <button className="popup__submit" type="submit">
                    Log in
                </button>
            </form>

            {
                !isLogin &&
                <div className="popup__alternative">
                    <p className="popup__or">or</p>
                    <a className="popup__link">Сreate new account</a>
                </div>
            }
        </div>
    )
}