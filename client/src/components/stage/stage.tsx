import React, { FC } from "react";

import './style.css';

type StagesProps = {
  description: string;
  currentStage: number;
  questions: any[];
  onAnswer: () => void;
  onChange: (stage: number, row: number, column: number, option: string) => void;
  totalStages: number;
}

export const Stage: FC<StagesProps> = ({
  description,
  currentStage,
  questions,
  onChange,
  onAnswer,
  totalStages,
}) => {
  if (!questions) {
    return null;
  }

  return (
    <form className="stage" onSubmit={
      (evt) => {
        evt.preventDefault();
        onAnswer();
      }
    }>
      <div className="stage__info">
        <p className="stage__description">{description}</p>
        <span className="stage__number">Stage {currentStage} of {totalStages}</span>
      </div>
      <table className="stage__table">
        {questions.map((arr, row) => (
          <tr className="stage__tr" key={`${currentStage}-${row}`}>
            {arr.map((item: any, column: number) => {
              const variants: any[] = item.split('\n');
              if (variants.length === 1) {
                return <td className="stage__td" key={`${currentStage}-${row}-${column}`}>{item}</td>
              } else {
                return (<td className="stage__td" key={`${currentStage}-${row}-${column}`}>
                  {variants.map((variant, variantIndex) => (
                    <div key={`${currentStage}-${row}-${column}-${variantIndex}`}>
                      <label htmlFor={`${currentStage}-${row}-${column}`}>{variant}</label>
                      <input
                        required
                        type="radio"
                        name={`${currentStage}-${row}-${column}`}
                        value={variant} 
                        onChange={(evt) => {
                          const info: any[] = evt.target.name.split('-');
                          onChange(currentStage, info[1], info[2], evt.target.value);
                        }}
                      />
                    </div>
                  ))}
                </td>);
              }
            })}
          </tr>
        ))}
        <tr></tr>
      </table>
      <button type="submit" className="stage_button">
        Go to next stage
      </button>
    </form>
  );
}
