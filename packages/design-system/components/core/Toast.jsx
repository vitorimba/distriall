import React from 'react';
import { Icon } from './Icon';

const ToastCtx = React.createContext(null);

const TONE_ICON = { success: 'check-circle-2', danger: 'alert-circle', info: 'info' };

/* Provider + host: envolva o app, dispare com useToast(). */
export function ToastProvider({ children }) {  const [toasts, setToasts] = React.useState([]);
  const push = React.useCallback((message, tone = 'success', duration = 3200) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="da-toaster" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="da-toast">
            <span className={`da-toast__icon--${t.tone}`} style={{ display: 'inline-flex' }}>
              <Icon name={TONE_ICON[t.tone] || TONE_ICON.info} size={15} />
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* Retorna push(message, tone?, duration?) — tones: success | danger | info */
export function useToast() {
  const push = React.useContext(ToastCtx);
  return push || (() => {});
}

/* Alias com o nome do arquivo — o contrato público é o ToastProvider. */
export const Toast = ToastProvider;
