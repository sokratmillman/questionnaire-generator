import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
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
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [data, setData] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`https://quiet-island-30954.herokuapp.com/api/surveys/${id}`, {
                method: 'GET',
            }).then((data) => {
                return data.json();
            }).then((data) => {
                setData(data.data);
                setResultData(JSON.parse(JSON.stringify(data.data)));
                setDescription(data.description);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const currQuestions = data[step - 1];

    const onAnswer = () => {
        if (step >= data.length) {
            onSubmit();
            navigate('/end');
            return;
        }
        setStep(prevCount => prevCount + 1);
    }

    const onSubmit = () => {
        const urlencoded = new URLSearchParams();
        urlencoded.append('data', JSON.stringify(resultData));

        fetch(`https://quiet-island-30954.herokuapp.com/api/surveys/${id}`, {
                method: 'POST',
                body: urlencoded,
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded',
                },
            })
    }

    const onChange = (stage: number, row: number, column: number, option: string) => {
        setResultData((currData) => {
            const newData = currData.slice();
            // @ts-ignore
            newData[stage - 1][row][column] = option;

            return newData;
        })
    }

    if (data.length === 0) {
        return null;
    }

    return <>
        <HeaderComponent />
        <div>
            <Stage
                description={description}
                totalStages={data.length}
                currentStage={step}
                questions={currQuestions}
                onAnswer={onAnswer}
                onChange={onChange}
            />
        </div>
    </>
};

export default SurveyPage;