import React, { FC } from "react";
import { WelcomeComponent } from "../components/welcome/welcome";

const EndPage: FC<{
    isLogined: boolean;
    setIsLogined: (isLogined: boolean) => void;
}> = ({ isLogined, setIsLogined }) => {
    return <WelcomeComponent isEnd isLogined={isLogined} setIsLogined={setIsLogined} />
};

export default EndPage;