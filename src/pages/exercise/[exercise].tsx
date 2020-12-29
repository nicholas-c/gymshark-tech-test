import Head from 'next/head'
import Link from 'next/link';
import { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { GenderContext } from './../../components/providers/GenderProvider';
import { CaretLeft } from "phosphor-react";


const Single = ({ exercise }) => {
  // @ts-ignore
  const { gender } = useContext(GenderContext);

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
          <img src={exercise[gender].image} alt={exercise.name} className="block  rounded-lg  mr-8  mb-8  w-full  md:w-1/3 | object-cover  object-center" />

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
  const url = new URL('/api/exercises', process.env.API_HOST);

  url.searchParams.append('limit', '1');
  url.searchParams.append('name', req.query.exercise);

  const apiResponse = await fetch(url.href);
  const data = await apiResponse.json();

  return {
    exercise: data.exercises[0]
  }
}

export { Single as default }
