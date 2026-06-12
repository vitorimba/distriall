interface SheetItem {
  label: string;
  icon?: string;
  danger?: boolean;
  onClick?: () => void;
}

/**
 * Bottom sheet mobile: menu de ações ancorado na base (spec 2.14).
 * Passe `items` para lista de ações, ou children para conteúdo livre.
 */
export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  items?: SheetItem[];
  children?: React.ReactNode;
}
