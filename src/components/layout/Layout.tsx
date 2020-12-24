import Head from 'next/head'
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = ({ children }) => (
  <div className="bg-black  min-h-screen  text-white">
    <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto&display=swap" rel="stylesheet" />
    </Head>

    <Header />

    <main>
      {children}
    </main>

    <Footer />

    <style jsx global>{`
      body {
        font-family: 'Roboto' !important;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat' !important;
      }
    `}</style>
  </div>
);

export { Layout };
