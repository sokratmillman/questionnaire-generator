import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import CreateSurveyPage from './pages/create-survey-page';
import EndPage from './pages/end-page';
import StartPage from './pages/start-page';
import SurveyPage from './pages/survey';

function App() {
  const [isLogined, setIsLogined] = useState(false);
  const [userId, setUserId] = useState(-1);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <StartPage
              isLogined={isLogined}
              setIsLogined={setIsLogined}
              userId={userId}
              setUserId={setUserId}
            />
          }/>
          <Route path="/end" element={
            <EndPage
              isLogined={isLogined}
              setIsLogined={setIsLogined}
            />
          } />
          <Route path="/create" element={<CreateSurveyPage userId={userId} />} />
          {/* <Route path="/my_surveys" element={<SurveysPage userId={userId}/>} /> */}
          <Route path="/survey/:id" element={<SurveyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
