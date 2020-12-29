import { NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ExerciseContext} from '../components/providers/ExerciseProvider';
import { Card } from '../components/Card';
import muscleGroups from '../config/muscleGroups.json';

const Exercises = ({data, groups = ''}) => {
  // @ts-ignore
  const { exercises, updateExercises, setExercises } = useContext(ExerciseContext);
  const [ filters, setFilters ] = useState(groups !== '' ? groups.split(',') : []);
  const Router = useRouter();
  const { count, remaining, total } = data;

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
              <h2 className="mb-2  py-2 | font-bold  uppercase">
                Filters
              </h2>

              <ol className="mb-4">
                {muscleGroups.map(group => (
                  <li key={group}>
                    <label className="flex  items-center  mb-2  cursor-pointer">
                      <input type="checkbox" name="groups" value={group} className="appearance-none  cursor-pointer | h-5  w-5 | mr-2 | border  border-white  rounded | checked:bg-green-600" checked={filters.includes(group.toLowerCase())} onChange={(e) => {
                        const inputName = e.target.value.toLowerCase();

                        if (!e.target.checked) {
                          const newFilters = [...filters.filter((filter) => inputName !== filter)];
                          setFilters(newFilters)

                          Router.push({
                            pathname: '/exercises',
                            query: {
                              groups: newFilters.join(',')
                            }
                          })
                        } else {
                          const newFilters = [...filters, inputName];
                          setFilters(newFilters)

                          Router.push({
                            pathname: '/exercises',
                            query: {
                              groups: newFilters.join(',')
                            }
                          })
                        }
                      }} />

                      {group}
                    </label>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="w-full  flex  flex-wrap">
            {exercises.length > 0 ? exercises.map(exercise => (
              <div className="w-full  sm:w-1/2  lg:w-1/3  p-4" key={exercise.id}>
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
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3000' : 'https://gymshark-tech-test.vercel.app/';
  const url = new URL('/api/exercises', server);
  const groups = req.query.groups;

  url.searchParams.append('limit', '21');

  if (groups) {
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
