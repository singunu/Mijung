import { router } from './AppRouter';
import { Providers } from './providers';
import { queryClient } from '../shared/query/query-client';

const App = () => {
  return <Providers router={router} client={queryClient} />;
};

export default App;
