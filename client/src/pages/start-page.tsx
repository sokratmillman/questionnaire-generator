import React, { FC, useEffect, useState } from 'react';
import { HeaderComponent } from '../components/header/header';
import { Survey, Surveys } from '../components/surveys/surveys';
import { WelcomeComponent } from '../components/welcome/welcome';

const StartPage: FC<{
    isLogined: boolean;
    setIsLogined: (isLogined: boolean) => void;
    userId: number;
    setUserId: (userId: number) => void;
}> = ({ isLogined, setIsLogined, userId, setUserId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [surveys, setSurveys] = useState<Survey[]>([]);

    useEffect(() => {
        if (userId) {
            setIsLoading(true);

            fetch(`https://quiet-island-30954.herokuapp.com/api/surveys/author?id=${userId}`, {
                method: 'GET',
            }).then((data) => {
                return data.json();
            }).then((data) => {
                setSurveys(data);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [userId]);

    if (surveys.length !== 0) {
        return (
            <>
                <HeaderComponent isAdmin={isLogined} />
                <Surveys surveys={surveys} />
            </>
        );
    }

    return (
        <>
            <HeaderComponent isAdmin={isLogined} />
            <WelcomeComponent setUserId={setUserId} isLogined={isLogined} setIsLogined={setIsLogined} />
        </>
    );
};

export default StartPage;