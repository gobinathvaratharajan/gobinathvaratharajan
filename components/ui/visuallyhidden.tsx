import clsx from 'clsx';

export function VisuallyHidden({
  as: Element = 'span',
  className,
  children,
  ...delegated
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Element
      className={clsx(
        'absolute overflow-hidden whitespace-nowrap',
        'w-px h-px -m-px p-0 border-0',
        '[clip:rect(0,0,0,0)]',
        className
      )}
      {...delegated}
    >
      {children}
    </Element>
  );
}
