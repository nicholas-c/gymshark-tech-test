import Head from 'next/head'
import { useContext, useEffect } from 'react';
import { ExerciseContext} from './../components/providers/ExerciseProvider';
import { GenderContext } from './../components/providers/GenderProvider';

import { Introduction } from './../components/Introduction';
import { Card } from './../components/Card';

const Home = ({data}) => {
  const { exercises, setExercises } = useContext(ExerciseContext);

  useEffect(() => setExercises(data.exercises));

  return (
    <>
      <Head>
        <title>Gymshark</title>
      </Head>

      <div>
        <Introduction />

        <div>
          <div className="container  mx-auto  px-4">
            <h2 className="text-xl  font-bold  uppercase  mb-4">
              Featured Exercises
            </h2>
          </div>

          <div className="flex  overflow-x-scroll">
            {exercises.length > 0 && exercises.map(exercise => (
              <Card exercise={exercise} key={exercise.id} classes="w-2/3  sm:w-1/4  xl:w-1/5 | m-4" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Home.getInitialProps = async () => {
  const apiResponse = await fetch('http://localhost:3000/api/exercises?limit=10&offset=41');
  const data = await apiResponse.json();

  return {
    data
  }
}

export { Home as default }
