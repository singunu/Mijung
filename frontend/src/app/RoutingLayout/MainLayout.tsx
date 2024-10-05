type MainLayoutProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  className?: string;
};

const MainLayout = ({ children, className, ...props }: MainLayoutProps) => {
  return (
    <main
      className={`col-span-10 m-5 lg:col-span-8 flex flex-col ${className}`}
      {...props}
    >
      {children}
    </main>
  );
};

export default MainLayout;
