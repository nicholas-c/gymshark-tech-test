import "tailwindcss/tailwind.css";
import { Layout } from '../components/layout/Layout';
import { ExerciseContextProvider } from '../components/providers/ExerciseProvider';
import { GenderContextProvider } from '../components/providers/GenderProvider';

const App = ({ Component, pageProps }) => (
  <ExerciseContextProvider>
    <GenderContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GenderContextProvider>
  </ExerciseContextProvider>
)

export { App as default }
