import React, { FC } from "react";

import './style.css';

export const NewSurveyComponent: FC = () => {

    return (
        <div className="create">
            <h1 className="create__title">New survey</h1>
            <form className="create__form">
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
                        <input type="file" className="create__fileinput" name="create-scv" id="create-scv"></input>
                    </label>
                </div>

                <div>
                    <label className="create__label" htmlFor="create-size">Grid size</label>
                    <select className="create__input create__select" name="create-size"  id="create-size">
                        <option className="create__option" value="1-1" selected>1x1 grid</option>
                        <option className="create__option" value="1-2">1x2 grid</option>
                        <option className="create__option" value="1-3">1x3 grid</option>
                    </select>
                </div>

                <div>
                    <label className="create__label" htmlFor="create-filter">Filter by</label>
                    <select className=" create__input create__select" name="create-filter" id="create-filter">
                        <option value="column" selected>By column</option>
                        <option value="row">By row</option>
                    </select>
                </div>

                <div>
                    <label className="create__label" htmlFor="create-filter-question">Question for filtering (if any)</label>
                    <input className="create__input" name="create-filter-question" id="create-filter-question" placeholder="Write here your question" />
                </div>
                
                <button className="create__submit" type="submit">
                    Save survey
                </button>
            </form>
        </div>
    );
};
