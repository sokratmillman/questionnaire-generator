import React, { FC } from "react";
import { HeaderComponent } from "../components/header/header";
import { NewSurveyComponent } from "../components/new-survey/new-survey";

const CreateSurveyPage: FC = () => {
    return (
        <>
            <HeaderComponent isAdmin={true} />
            <NewSurveyComponent />
        </>
    )
};

export default CreateSurveyPage;