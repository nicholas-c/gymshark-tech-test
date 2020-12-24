import { createContext, useState, useContext } from 'react';

const ExerciseContext = createContext([]);

const ExerciseContextProvider = ({children}) => {
  const [ exercises, setExercises ] = useState([]);

  const updateExercises = (data) => setExercises([...exercises, ...data]);

  return (
    <ExerciseContext.Provider value={{
      exercises,
      updateExercises,
      setExercises
    }}>
      {children}
    </ExerciseContext.Provider>
  )
};

export { ExerciseContext, ExerciseContextProvider }
