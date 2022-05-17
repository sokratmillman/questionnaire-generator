import React, { FC } from 'react';
import { HeaderComponent } from '../components/header/header';
import { NewSurveyComponent } from '../components/new-survey/new-survey';

interface CreateSurveyPageProps {
    userId: number;
}

const CreateSurveyPage: FC<CreateSurveyPageProps> = ({
    userId
}) => {
    return (
        <>
            <HeaderComponent isAdmin={true} activeItem={1} />
            <NewSurveyComponent userId={userId} />
        </>
    )
};

export default CreateSurveyPage;