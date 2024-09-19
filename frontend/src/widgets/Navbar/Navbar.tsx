import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">로고</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/ingredients"
              className="py-4 px-2 text-white hover:text-blue-200 transition duration-300"
            >
              식재료 찾기
            </Link>
            <Link
              to="/recipes"
              className="py-4 px-2 text-white hover:text-blue-200 transition duration-300"
            >
              레시피 찾기
            </Link>
            <Link
              to="/recipes/jjim"
              className="py-4 px-2 text-white hover:text-blue-200 transition duration-300"
            >
              찜한 레시피
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
