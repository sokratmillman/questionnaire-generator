import React, { FC } from "react";
import { Link } from "react-router-dom";

import './style.css';

export type Survey = {
    title: string;
    resultFilepath: string;
    id: number;
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
                    <li key={survey.id} className="surveys__item">
                        <h2 className="surveys__name">
                            {survey.title}
                        </h2>
                        <div className="surveys__info">
                            <button
                                className="surveys__link"
                                onClick={() => {
                                    // TODO: change localhost
                                    navigator.clipboard.writeText(`http://localhost:3000/survey/${survey.id}`)
                                }}
                            >Copy link</button>
                            <a className="surveys__link" href={survey.resultFilepath}>Download .csv results</a>
                        </div>
                    </li>
                ))}
            </ul>
            <Link className="surveys__button" to="/create">
                + Create new survey
            </Link>
        </div>
    )
}
