import React, { FC } from "react";

import './style.css';

export type Survey = {
    name: string;
    link: string;
}

type SurveysProps = {
    surveys: Survey[];
}

export const Surveys: FC<SurveysProps> = ({
    surveys,
}) => {
    return (
        <div className="surveys">
            <h1 className="surveys__title">My surveys · {surveys.length}</h1>
            <ul className="surveys__list">
                {surveys.map(survey => (
                    <li className="surveys__item">
                        <h2 className="surveys__name">
                            {survey.name}
                        </h2>
                        <div className="surveys__info">
                            <button className="surveys__link">Copy link</button>
                            <button className="surveys__link">Download .csv results</button>
                            <button className="surveys__link surveys__link--remove">Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="surveys__button">
                + Create new survey
            </button>
        </div>
    )
}
