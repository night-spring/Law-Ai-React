import React, { createContext, useState, useEffect } from 'react';

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [professionalMode, setProfessionalMode] = useState(() => {
    return JSON.parse(localStorage.getItem('professionalMode')) || false;
  });

  const [studentMode, setStudentMode] = useState(() => {
    return JSON.parse(localStorage.getItem('studentMode')) || false;
  });

  useEffect(() => {
    localStorage.setItem('professionalMode', JSON.stringify(professionalMode));
  }, [professionalMode]);

  useEffect(() => {
    localStorage.setItem('studentMode', JSON.stringify(studentMode));
  }, [studentMode]);

  return (
    <ModeContext.Provider
      value={{
        professionalMode,
        setProfessionalMode,
        studentMode,
        setStudentMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};
