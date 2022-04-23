import React, { FC } from "react";
import { WelcomeComponent } from "../components/welcome/welcome";

const StartPage: FC = () => {
    return <WelcomeComponent isLogined />
};

export default StartPage;