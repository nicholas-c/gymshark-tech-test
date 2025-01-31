import { createContext, useState } from 'react';

const GenderContext = createContext<{
  gender: string,
  setGender: any
}>({
  gender: 'male',
  setGender: () => {}
});

const GenderContextProvider = ({children}) => {
  const [ gender, setGender ] = useState('male');

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};

export { GenderContext, GenderContextProvider }
