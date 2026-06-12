/** BRL currency formatter with tabular figures. */
export interface MoneyProps {
  /** Numeric value in reais */
  value: number;
  /** Colors positive green / negative red and prefixes "+" */
  signed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
