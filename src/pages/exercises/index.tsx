import Head from 'next/head'
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { ExerciseContext} from './../../components/providers/ExerciseProvider';
import { Card } from './../../components/Card';
import muscleGroups from './../../config/muscleGroups.json';

const Exercises = ({data, groups = []}) => {
  const { exercises, setExercises } = useContext(ExerciseContext);

  useEffect(() => setExercises(data.exercises));

  return (
    <>
      <Head>
        <title>Gymshark | Exercises</title>
      </Head>

      <div className="container  mx-auto  px-4">
        <h1 className="text-5xl  uppercase  font-bold  mb-12">
          Exercises
        </h1>

        <div className="md:flex">
          <div className="relative | w-full  md:w-1/5 | flex-shrink-0">
            <div className="md:sticky  top-0 | pr-4">
              <h2 className="mb-2 | font-bold  uppercase">
                Filters
              </h2>

              <ol className="mb-4">
                {muscleGroups.map(group => (
                  <li>
                    <label className="flex  items-center">
                      <input type="checkbox" className="mr-3" checked={groups.includes(group.toLowerCase())} />

                      {group}
                    </label>
                  </li>
                ))}
              </ol>

              <button className="w-full | rounded | px-6  py-2 | bg-green-600  hover:bg-green-500 | uppercase  font-bold  text-center">
                Search
              </button>
            </div>
          </div>

          <div className="flex  flex-wrap">
            {exercises.length > 0 && exercises.map(exercise => (
              <Card exercise={exercise} classes="w-full  sm:w-1/2  lg:w-1/3  p-4" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

Exercises.getInitialProps = async (req) => {
  const apiResponse = await fetch('http://localhost:3000/api/exercises?limit=21');
  const data = await apiResponse.json();

  return {
    data,
    groups: req.query.groups
  }
}

export { Exercises as default }
