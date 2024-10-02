type LeftSideLayoutProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const LeftSideLayout = ({
  children,
  className,
  ...props
}: LeftSideLayoutProps) => {
  return (
    <aside className={`hidden lg:flex col-span-2 ${className}`} {...props}>
      {children}
    </aside>
  );
};

export default LeftSideLayout;
