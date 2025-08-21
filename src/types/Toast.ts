export type ToastType = 'error' | 'success' | 'info';
export interface Toaster {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: ToastType;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastItem {
  toast: Toaster;
  onDismiss: () => void;
}
