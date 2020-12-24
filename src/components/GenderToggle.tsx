import { useContext } from 'react';
import { GenderContext } from './providers/GenderProvider';

const GenderToggle = () => {
  const { gender, setGender } = useContext(GenderContext);

  return (
    <div className="absolute  right-0  flex  items-center  p-2">
      <label htmlFor="genderToggle" className="hidden  md:inline">Male</label>

      <div>
        <input type="checkbox" className="hidden" id="genderToggle" onChange={(e) => setGender(e.target.checked ? 'female' : 'male')} />

        <label htmlFor="genderToggle" className="block  w-12   h-6  md:mx-2  bg-gray-800  rounded-full  transition-colors">
          <div className={`w-6  h-6  bg-green-500  rounded-full  transition-transform  ease-in-out  transform  translate-x-0  ${gender === 'female' && 'translate-x-full'}`}></div>
        </label>
      </div>

      <label htmlFor="genderToggle" className="hidden  md:inline">Female</label>
    </div>
  )
}

export { GenderToggle }
