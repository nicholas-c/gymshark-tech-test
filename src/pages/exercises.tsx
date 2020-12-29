import { NextApiRequest } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { ExerciseContext } from '../components/providers/ExerciseProvider';
import { Filters } from '../components/Filters';
import { Card } from '../components/Card';

const Exercises = ({data, groups = ''}) => {
  // @ts-ignore
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
          <Filters groups={groups} />

          <div className="w-full  flex  flex-wrap">
            {exercises.length > 0 ? exercises.map(exercise => (
              <div className="w-full  sm:w-1/2  lg:w-1/3  py-2  md:p-4" key={exercise.id}>
                <Card exercise={exercise} classes="w-full" />
              </div>
            )) : (
              <h2 className="w-full | uppercase  font-bold  text-4xl  text-center">
                No exercises found
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Exercises.getInitialProps = async (req: NextApiRequest) => {
  const url = new URL('/api/exercises', process.env.API_HOST);
  const groups = req.query.groups;

  url.searchParams.append('limit', '21');

  if (groups) {
    // @ts-ignore
    url.searchParams.append('groups', groups);
  }

  const apiResponse = await fetch(url.href);
  const data = await apiResponse.json();

  return {
    data,
    groups: groups
  }
}

export { Exercises as default }
