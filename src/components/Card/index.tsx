import { useContext } from 'react';
import Link from 'next/link';
import { GenderContext } from './../providers/GenderProvider';
import { slugify } from './../../utils';

const Card = ({ exercise, classes }) => {
  const { gender } = useContext(GenderContext);

  return (
    <Link href={`/exercise/${slugify(exercise.name)}`}>
      <a className={`block | ${classes} | flex-shrink-0`}>
        <img src={exercise[gender].image} alt={exercise.name} className="rounded-lg  mb-2  h-52  w-full | object-cover  object-center" loading="lazy" />

        <h2 className="text-lg  font-bold">
          {exercise.name}
        </h2>

        <p className="text-sm  text-gray-300">
          {exercise.bodyAreas.map((area: string, index: number) => (
            <span key={index + area}>
              {area + (index !== exercise.bodyAreas.length - 1 ? ' | ' : '')}
            </span>
          ))}
        </p>
      </a>
    </Link>
  );
};

export { Card }
