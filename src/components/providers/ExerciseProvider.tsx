import { createContext, useState } from 'react';

type SingleExercise = {
  id: string,
  name: string,
  transcript: string,
  female: {
    image: string
  },
  male: {
    image: string
  },
  bodyAreas: Array<string>
}

const ExerciseContext = createContext<{
  exercises: Array<SingleExercise>,
  setExercises: any
}>({
  exercises: [],
  setExercises: () => {}
});

const ExerciseContextProvider = ({children}) => {
  const [ exercises, setExercises ] = useState([]);

  return (
    <ExerciseContext.Provider value={{
      exercises,
      setExercises
    }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseContextProvider }
