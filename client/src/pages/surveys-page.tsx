import React, { FC } from "react";
import { HeaderComponent } from "../components/header/header";
import { Survey, Surveys } from "../components/surveys/surveys";

const SurveysPage: FC = () => {
    const surveys: Survey[] = [
        {
            name: 'My first survey',
            link: 'kek',
        },
        {
            name: 'My second survey',
            link: 'lol',
        },
    ];

    return (
        <>
            <HeaderComponent isAdmin={true} />
            <Surveys
                surveys={surveys}
            />
        </>
    )
};

export default SurveysPage;