import { RouterProvider } from 'react-router-dom';
import { router } from './AppRouter';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
