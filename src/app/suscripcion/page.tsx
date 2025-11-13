'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Shield, Heart, Users, Sparkles } from 'lucide-react';

export default function SuscripcionPage() {
  const { user, isAuthenticated, isLoading, isPremium, upgradeToPremium } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirect if not authenticated or if already premium
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== 'user') {
        // Only regular users can subscribe, not professionals or institutions
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'user') {
    return null;
  }

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing (Wizard of Oz)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Upgrade user to premium
    const success = await upgradeToPremium();
    
    if (success) {
      setShowSuccess(true);
      // Redirect to profile after showing success message
      setTimeout(() => {
        router.push('/perfil');
      }, 3000);
    }
    
    setIsProcessing(false);
  };

  const premiumFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Acceso a Nutricionistas Certificados',
      description: 'Consultas ilimitadas con profesionales especializados en nutrición keto'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Planes Nutricionales Personalizados',
      description: 'Recibe planes de alimentación diseñados específicamente para tus objetivos'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Seguimiento Profesional Continuo',
      description: 'Monitoreo regular de tu progreso y ajustes en tiempo real'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Recetas Exclusivas Premium',
      description: 'Accede a nuestra colección exclusiva de más de 500 recetas keto'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Soporte Prioritario',
      description: 'Respuestas rápidas de nuestro equipo de expertos'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Descuentos en Productos',
      description: 'Hasta 20% de descuento en productos seleccionados'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-white px-8 py-4 rounded-lg shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6" />
              <div>
                <p className="font-bold text-lg">¡Felicidades! 🎉</p>
                <p className="text-sm">Ahora eres miembro Premium</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-2 rounded-full mb-6">
            <Crown className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 font-semibold">Suscripción Premium</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mejora tu experiencia con
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
              Alkadami Keto Premium
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accede a nutricionistas certificados, planes personalizados y contenido exclusivo para alcanzar tus objetivos keto
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-400">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Plan Premium Anual</h2>
                  <p className="text-amber-100">El mejor valor para tu salud</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">$99</div>
                  <div className="text-amber-100">por año</div>
                  <div className="text-sm text-amber-200 mt-1">~$8.25/mes</div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {isPremium() ? (
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 text-center">
                  <Crown className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">
                    ¡Ya eres miembro Premium! ⭐
                  </h3>
                  <p className="text-emerald-700">
                    Disfruta de todos los beneficios exclusivos de tu suscripción
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={handleUpgrade}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Crown className="w-6 h-6" />
                        Activar Premium Ahora
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Pago seguro
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Cancela cuando quieras
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Sin cargos ocultos
                    </div>
                  </div>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Al activar Premium, aceptas nuestros términos y condiciones. El pago es procesado de forma segura.
                    Esta es una simulación educativa - no se realizará ningún cargo real.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compara los Planes
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Característica</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Gratuito</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold bg-amber-50 text-amber-900">Premium ⭐</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Chat con IA</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Recetas básicas</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Foro comunitario</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Nutricionistas certificados</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Planes nutricionales personalizados</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Seguimiento profesional</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Recetas exclusivas premium</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Soporte prioritario</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Descuentos en productos</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center bg-amber-50"><Check className="w-5 h-5 text-amber-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
