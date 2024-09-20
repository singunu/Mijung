import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError() as any;

  return (
    <div>
      <h1>에러 페이지</h1>
      <p> 고쳐라 개발자야! ㅠ_ㅠ</p>
      <p>에러 메시지: {error.message || '알 수 없는 오류'}</p>
      {error.stack && (
        <details>
          <summary>에러 스택</summary>
          <pre>{error.stack}</pre>
        </details>
      )}
    </div>
  );
};

export default Error;
