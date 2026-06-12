/** Initials avatar for clients/drivers (no photos in DistriAll). */
export interface AvatarProps {
  /** Full name; first two initials are shown */
  name: string;
  /** Default "md" (32px). sm=24, lg=44 */
  size?: 'sm' | 'md' | 'lg';
  /** Force a palette index (0-5) instead of name hash */
  tone?: number;
  className?: string;
}
