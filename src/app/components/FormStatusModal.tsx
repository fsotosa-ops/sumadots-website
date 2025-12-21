'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
};

export default function FormStatusModal({ isOpen, onClose, type }: Props) {
  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Overlay oscuro con blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          />
          
          {/* Contenedor del Mensaje */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{ 
              backgroundColor: 'var(--cta-card-bg)', 
              borderColor: 'var(--cta-card-border)',
              boxShadow: 'var(--cta-shadow)'
            }}
            className="relative w-full max-w-sm overflow-hidden border p-8 rounded-[40px] backdrop-blur-3xl text-center"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-6 mt-4">
              {/* Icono dinámico con gradientes del sitio */}
              <div className={cn(
                "p-4 rounded-3xl",
                isSuccess ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              )}>
                {isSuccess ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {isSuccess ? '¡Enviado con éxito!' : 'Algo salió mal'}
                </h3>
                <p className="text-muted-foreground">
                  {isSuccess 
                    ? 'Hemos recibido tus datos correctamente. Te contactaremos en menos de 24 horas.' 
                    : 'No pudimos procesar tu solicitud. Por favor, intenta nuevamente.'}
                </p>
              </div>

              <Button 
                onClick={onClose}
                className={cn(
                  "w-full h-12 rounded-2xl font-bold transition-all",
                  isSuccess 
                    ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white" 
                    : "bg-zinc-200 dark:bg-zinc-800 text-foreground"
                )}
              >
                {isSuccess ? 'Entendido' : 'Cerrar'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Función auxiliar para clases (puedes importarla de tu lib/utils si prefieres)
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}