import Head from 'next/head'
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ExerciseContext} from './../../components/providers/ExerciseProvider';
import { CaretLeft } from "phosphor-react";

const Single = ({data}) => {
  // @ts-ignore
  const { exercises, setExercises } = useContext(ExerciseContext);

  console.log(data)

  useEffect(() => setExercises(data.exercises));

  const exercise = exercises[0];

  if (!exercise) {
    return (
      <>
        Loading
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Gymshark</title>
      </Head>

      <div className="container  mx-auto  px-4">
        <Link href="/exercises">
          <a className="flex  items-center | text-xl  uppercase">
            <CaretLeft size={24} className="mr-1" /> Back
          </a>
        </Link>

        <div className="md:flex  mt-8">
          <img src={exercise.male.image} alt={exercise.name} className="block  rounded-lg  mr-8  mb-8  w-full  md:w-1/3 | object-cover  object-center" />

          <div className="w-full">
            <h1 className="mb-2  text-5xl  font-bold">
              {exercise.name}
            </h1>

            <p className="text-sm  text-gray-300  mb-4">
              {exercise.bodyAreas.map((area, index) => (
                <span>
                  {area + (index !== exercise.bodyAreas.length - 1 ? ' | ' : '')}
                </span>
              ))}
            </p>

            {ReactHtmlParser(exercise.transcript)}
          </div>
        </div>

        <style jsx global>{`
          ol {
            margin-bottom: 1rem;
          }

          li {
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    </>
  )
}

Single.getInitialProps = async (req) => {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3000' : 'https://gymshark-tech-test.vercel.app/';
  console.log(`${server}/api/exercises?limit=1&name=${req.query.exercise}`)
  const apiResponse = await fetch(`${server}/api/exercises?limit=1&name=${req.query.exercise}`);
  const data = await apiResponse.json();

  return {
    data
  }
}

export { Single as default }
