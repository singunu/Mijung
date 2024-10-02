import { TasteSuggest } from '@/features/tasteSuggest/ui/TasteSuggest';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

type RightSideLayoutProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const RightSideLayout = ({
  children,
  className,
  ...props
}: RightSideLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <aside className={`hidden lg:flex col-span-2 ${className}`} {...props}>
        <TasteSuggest />
        {children}
      </aside>
      {isMobile && <TasteSuggest />}
    </>
  );
};

export default RightSideLayout;
