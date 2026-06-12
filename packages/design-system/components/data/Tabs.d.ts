/** Underline tabs (e.g. "Dados" | "Preços especiais"). */
export interface TabsProps {
  /** Strings or {id,label} pairs */
  tabs: Array<string | { id: string; label: string }>;
  /** Active tab id */
  active: string;
  onChange?: (id: string) => void;
  className?: string;
}
