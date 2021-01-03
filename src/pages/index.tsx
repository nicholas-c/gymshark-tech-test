import Head from 'next/head'
import { useContext, useEffect } from 'react';
import { ExerciseContext} from './../components/providers/ExerciseProvider';
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
  const url = new URL('/api/exercises', process.env.NEXT_PUBLIC_API_HOST);

  url.searchParams.append('limit', '10');
  url.searchParams.append('offset', '41');

  const apiResponse = await fetch(url.href);
  const data = await apiResponse.json();

  return {
    data
  }
}

export { Home as default }
