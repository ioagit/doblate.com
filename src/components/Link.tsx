import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useRouter } from '../hooks/useRouter';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
  /** Side effects (sound, progress) that run only on in-app navigation. */
  onActivate?: () => void;
}

/**
 * A real anchor: crawlers and «open in new tab» get a plain link, while normal
 * clicks stay in the app through the History API.
 */
export const Link = ({ to, children, onActivate, onClick, ...rest }: LinkProps) => {
  const { navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    onActivate?.();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
