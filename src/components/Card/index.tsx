import { useContext } from 'react';
import { GenderContext } from './../providers/GenderProvider';

const Card = ({exercise}) => {
  const { gender } = useContext(GenderContext);

  return (
    <article className="inline-block  w-2/3  sm:w-1/4  xl:w-1/5  m-4  flex-shrink-0">
      <img src={exercise[gender].image} alt={exercise.name} className="rounded-lg  mb-2  h-52  w-full | object-cover  object-center" />

      <h2 className="text-lg  font-bold">
        {exercise.name}
      </h2>

      <p className="text-sm  text-gray-300">
        {exercise.bodyAreas.map((area, index) => (
          <span key={index + area}>
            {area + (index !== exercise.bodyAreas.length - 1 ? ' | ' : '')}
          </span>
        ))}
      </p>
    </article>
  )
        }

export { Card }
