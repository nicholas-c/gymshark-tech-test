import { Title } from './Title';
import Link from 'next/link';

const Button = ({href, text}) => (
  <Link href={href}>
    <a href={href} className="block  w-full  sm:w-auto | rounded | py-3  px-6  sm:mr-4  mb-4 | bg-green-800  hover:bg-green-700 | text-sm  sm:text-md  font-bold  uppercase  tracking-wider  text-center">
      {text}
    </a>
  </Link>
)

const Introduction = () => (
  <div className="container  mx-auto  px-4">
    <div className="py-12  md:py-28">
      <Title content="Exercise Finder" />

      <p className="md:w-1/2  text-gray-500">
        Browse our illustrated library of at-home, and gym exercises for beginners and beyond. Discover new exercises to use in your routines and reach your fitness goals. 
      </p>

      <div className="py-4">
        <h2 className="text-md  lg:text-xl  font-bold  uppercase  mb-4">
          Browse Exercises
        </h2>

        <div className="flex  flex-wrap">
          <Button href="/exercises?groups=arms" text="Arms" />
          <Button href="/exercises?groups=chest" text="Chest" />
          <Button href="/exercises?groups=back" text="Back" />
          <Button href="/exercises?groups=legs" text="Legs" />
          <Button href="/exercises?groups=cardio" text="Cardio" />
        </div>
      </div>
    </div>
  </div>
)

export { Introduction }
