import { Outlet } from 'react-router-dom';
import Navbar from '../../widgets/Navbar/Navbar';

// 뷰포트의 스타일 지정
// Outlet에 페이지들이 렌더링
const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
