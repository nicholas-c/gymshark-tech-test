import { Title } from './Title';

const Button = ({href, text}) => (
  <a href={href} className="block  w-full  sm:w-auto | rounded | py-3  px-6  mr-4  mb-4 | bg-green-800  hover:bg-green-700 | text-sm  sm:text-md  font-bold  uppercase  tracking-wider  text-center">
    {text}
  </a>
)

const Introduction = () => (
  <div className="container  mx-auto  px-4">
    <div className="py-12  md:py-28">
      <Title content="Exercise Finder" />

      <p className="md:w-1/2  text-gray-500">
        Browse our illustrated library of at-home and gym exercises for beginners and beyond. Discover new exercises to use in your routines and use our workout builder at Fit to build your own training plans and reach your fitness goals
      </p>

      <div className="py-4">
        <h2 className="text-md  lg:text-xl  font-bold  uppercase  mb-4">
          Browse Exercises
        </h2>

        <div className="flex  flex-wrap">
          <Button href="/single" text="Arms" />
          <Button href="/single" text="Chest" />
          <Button href="/single" text="Back" />
          <Button href="/single" text="Legs" />
          <Button href="/single" text="Cardio" />
        </div>
      </div>
    </div>
  </div>
)

export { Introduction }
