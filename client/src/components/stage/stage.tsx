import React, { FC } from "react";
import { FrameQuestions } from "../../pages/survey";

import './style.css';

type StagesProps = {
    currentStage: number;
    questions: FrameQuestions;
    onAnswer: () => void;
    totalStages: number;
}

export const Stage: FC<StagesProps> = ({
    currentStage,
    questions,
    onAnswer,
    totalStages,
}) => {
    const { frameQuestions } = questions;

    return (
        <div>
            <span>Stage {currentStage} of {totalStages}</span>
            {frameQuestions.map(question => (
                <div key={question.id}>
                    <h2>{question.title}</h2>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={`${question.id}-${index}`}>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <button onClick={onAnswer}>
                Go to next stage
            </button>
        </div>
    )
}
