interface IconProps {
  size?: number;
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const ArrowRightIcon = ({ size = 16 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ size = 11 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="m5 13 4.5 4.5L19 7" />
  </svg>
);

export const StarIcon = ({ size = 11 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
    <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" />
  </svg>
);

export const BoltIcon = ({ size = 13 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
    <path d="M13.5 2 4 13.5h5.5L8.5 22 20 10h-6z" />
  </svg>
);

export const FlameIcon = ({ size = 13 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
    <path d="M12.8 2c.4 3.2-1.6 4.4-2.8 5.9-1.5 1.9-2.4 3.4-2.4 5.4A6.4 6.4 0 0 0 18 14.6c0-4.4-3-6.6-5.2-12.6z" />
    <path d="M11 13c.2 1.7-1.4 2.3-1.4 3.9A2.6 2.6 0 0 0 14 18c0-1.9-1.6-2.8-3-5z" fill="#fff7ed" />
  </svg>
);

export const LockIcon = ({ size = 17 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
);

export const ChartIcon = ({ size = 16 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="M4 16.5 9 11l3.5 3.5L20 7" />
    <path d="M15.5 7H20v4.5" />
  </svg>
);

export const RefreshIcon = ({ size = 14 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 4v4.5h-4.5" />
  </svg>
);

export const HomeIcon = ({ size = 16 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="M4 10.5 12 4l8 6.5V20H4z" />
  </svg>
);

export const SoundOnIcon = ({ size = 17 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
    <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" />
  </svg>
);

export const SoundOffIcon = ({ size = 17 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...base}>
    <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
    <path d="m16 10 5 4M21 10l-5 4" />
  </svg>
);
