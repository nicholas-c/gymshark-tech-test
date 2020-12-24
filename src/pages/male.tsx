import Head from 'next/head'
import { useContext, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ExerciseContext} from './../components/providers/ExerciseProvider';

const Male = ({data}) => {
  const { exercises, setExercises } = useContext(ExerciseContext);

  useEffect(() => setExercises(data.exercises));

  return (
    <>
      <Head>
        <title>Gymshark</title>
      </Head>

      <div className="container  mx-auto  px-4">
        <h1 className="text-5xl  font-bold  uppercase  px-4">
          Arm exercises
        </h1>

        <div className="flex  flex-wrap">
          {exercises.length > 0 && exercises.map(exercise => (
            <article className="block  w-1/3  p-4  flex-shrink-0">
              <img src={exercise.male.image} alt={exercise.name} className="rounded-lg  mb-2  h-60  w-full | object-cover  object-center" />

              <h2 className="text-lg  font-bold">
                {exercise.name}
              </h2>

              <p className="text-sm  text-gray-300">
                {exercise.bodyAreas.map((area, index) => (
                  <span>
                    {area + (index !== exercise.bodyAreas.length - 1 ? ' | ' : '')}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

Male.getInitialProps = async () => {
  const apiResponse = await fetch('http://localhost:3000/api/exercises?limit=25');
  const data = await apiResponse.json();

  return {
    data
  }
}

export { Male as default }
