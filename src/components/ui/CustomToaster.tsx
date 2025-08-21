import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { ToastItem } from '@/types/Toast';
export const Toaster = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 space-y-3 z-[1000]">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => dismiss(toast.id)}
        />
      ))}
    </div>
  );
};

function ToastItem({ toast, onDismiss }: ToastItem) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast.open) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    // Delay unmount slightly for exit animation
    setTimeout(() => {
      const timeout = setTimeout(() => onDismiss(), 300);
      return () => clearTimeout(timeout);
    }, 4000);
  }, [toast.open, onDismiss]);

  const toastBgColor = (type?: 'info' | 'error' | 'success') =>
    type === 'error'
      ? ' bg-red-500'
      : type === 'info'
      ? 'bg-blue-400'
      : type === 'success'
      ? 'bg-green-500'
      : 'bg-gray-900 dark:bg-gray-800'; // default value

  const toasttextColor = (type?: 'info' | 'error' | 'success') => {
    switch (type) {
      case 'error':
      case 'success':
      case 'info':
        return 'text-white';
      default:
        return 'text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div
      className={`relative transform transition-all duration-300 ease-in-out outline-none border-none shadow-2xl ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none'
      } ${toastBgColor(
        toast.type
      )} border border-gray-200 dark:border-gray-700 rounded shadow p-4 w-80 group`}
    >
      {toast.title && <div className="font-semibold">{toast.title}</div>}
      {toast.description && (
        <div className={`text-sm mt-1 ${toasttextColor(toast.type)}`}>
          {toast.description}
        </div>
      )}
      <button
        onClick={onDismiss}
        className="mt-2 text-xs text-blue-600 dark:text-blue-400 absolute right-2 top-0"
      >
        <X className="p-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
