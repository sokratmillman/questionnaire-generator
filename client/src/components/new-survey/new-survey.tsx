import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

interface NewSurveyComponentProps {
    userId: number;
}

export const NewSurveyComponent: FC<NewSurveyComponentProps> = ({
    userId,
}) => {
    const navigate = useNavigate();

    const [size, setSize] = useState('3-3');
    const [file, setFile] = useState<File>();

    const onUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    }

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData();

        // @ts-ignore
        formData.append('title', event.target['create-name'].value);
        // @ts-ignore
        formData.append('questionDescription', event.target['create-question'].value);
        // @ts-ignore
        formData.append('width', event.target['create-size'].value.split('-')[0]);
        // @ts-ignore
        formData.append('height', event.target['create-size'].value.split('-')[1]);
        // @ts-ignore
        formData.append('filtering', false);
        // @ts-ignore
        formData.append('filteringQuestion', '');
        // @ts-ignore
        formData.append('csvFile', file);

        fetch(`https://quiet-island-30954.herokuapp.com/api/surveys/create/?authorId=${userId}`, {
            method: 'POST',
            body: formData,
        }).then((res) => {
            return res.json();
        }).then((json) => {
            navigate('/');
        });
    }

    const handleSizeOnChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        setSize(evt.target.value);
    }

    return (
        <div className="create">
            <h1 className="create__title">New survey</h1>
            <form className="create__form" onSubmit={handleOnSubmit}>
                <div>
                    <label className="create__label" htmlFor="create-name">Survey name</label>
                    <input className="create__input" name="create-name" id="create-name" placeholder="My first survey" />
                </div>
                
                <div>
                    <label className="create__label" htmlFor="create-question">Question description</label>
                    <textarea className="create__input create__input--area" name="create-question" id="create-question" placeholder="How  many people on the Earth?" />
                </div>

                <div>
                    <label className="create__label" htmlFor="create-scv">Answers</label>
                    <label className="create__scv-button">
                        + Upload .csv file
                        <input onChange={(e) => onUpload(e.target.files)} type="file" className="create__fileinput" name="create-scv" id="create-scv"></input>
                    </label>
                </div>

                <div>
                    <label className="create__label" htmlFor="create-size">Grid size</label>
                    <select onChange={handleSizeOnChange} value={size} className="create__input create__select" name="create-size"  id="create-size">
                        <option className="create__option" value="1-1">1x1 grid</option>
                        <option className="create__option" value="1-2">1x2 grid</option>
                        <option className="create__option" value="1-3">1x3 grid</option>
                        <option className="create__option" value="2-1">2x1 grid</option>
                        <option className="create__option" value="2-2">2x2 grid</option>
                        <option className="create__option" value="2-3">2x3 grid</option>
                        <option className="create__option" value="3-1">3x1 grid</option>
                        <option className="create__option" value="3-2">3x2 grid</option>
                        <option className="create__option" value="3-3">3x3 grid</option>
                    </select>
                </div>

                {/* <div>
                    <label className="create__label" htmlFor="create-filter-question">Question for filtering (if any)</label>
                    <input className="create__input" name="create-filter-question" id="create-filter-question" placeholder="Write here your question" />
                </div> */}
                
                <button className="create__submit" type="submit">
                    Save survey
                </button>
            </form>
        </div>
    );
};
