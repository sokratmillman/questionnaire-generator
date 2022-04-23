import React, { FC, useState } from "react";
import { HeaderComponent } from "../components/header/header";
import { Stage } from "../components/stage/stage";

export type Question = {
    id: number;
    title: string;
    options: string[];
}

export type FrameQuestions = {
    frameQuestions: Question[];
}

const SurveyPage: FC = () => {
    const [step, setStep] = useState(1);
    const questions: FrameQuestions[] = [
        {
            frameQuestions: [
                {
                    id: 1,
                    title: 'The lectures were useful 1',
                    options: [
                        'Yes, everything is fine',
                        'Partially, it can be removed',
                        'No, it was bad',
                    ]
                }
            ]
        },
        {
            frameQuestions: [
                {
                    id: 2,
                    title: 'The lectures were useful 2',
                    options: [
                        'Yes, everything is fine',
                        'Partially, it can be removed',
                        'No, it was bad',
                    ]
                }
            ]
        },
        {
            frameQuestions: [
                {
                    id: 3,
                    title: 'The lectures were useful 3',
                    options: [
                        'Yes, everything is fine',
                        'Partially, it can be removed',
                        'No, it was bad',
                    ]
                }
            ]
        },
    ];
    const currQuestions = questions[step - 1];

    const onAnswer = () => {
        setStep(prevCount => prevCount + 1);
    }

    if (step > questions.length) {
        return null;
    }

    return <>
        <HeaderComponent />
        <div>
            <Stage
                totalStages={questions.length}
                currentStage={step}
                questions={currQuestions}
                onAnswer={onAnswer}
            />
        </div>
    </>
    
};

export default SurveyPage;