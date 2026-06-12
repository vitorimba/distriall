/**
 * Provider de toasts efêmeros. Envolva o app; dispare com useToast():
 * `const toast = useToast(); toast('Pedido salvo', 'success')`.
 * Tones: success | danger | info. Some sozinho (padrão 3,2s).
 */
export interface ToastProviderProps {
  children: React.ReactNode;
}
