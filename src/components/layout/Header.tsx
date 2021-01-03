import Link from 'next/link';
import { GenderToggle } from './../GenderToggle';

const Header = () => (
  <header>
    <div className="container | relative | flex  md:justify-center  items-center | mx-auto | p-4">
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Gymshark" className="w-12" />
        </a>
      </Link>

      <GenderToggle />
    </div>
  </header>
);

export { Header }
