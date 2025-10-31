'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'professional' | 'user' | 'institution') => {
    if (role === 'professional') {
      setEmail('dr.martinez@alkadami.com');
      setPassword('keto2024');
    } else if (role === 'institution') {
      setEmail('admin@centroketo.com');
      setPassword('centro2024');
    } else {
      setEmail('usuario@gmail.com');
      setPassword('user123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Navigation />
      
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🥑</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido
            </h1>
            <p className="text-gray-600">
              Inicia sesión para continuar con Alkadami Keto
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Demo Credentials Toggle */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {showDemoCredentials ? 'Ocultar' : 'Ver'} credenciales de prueba
            </button>
            
            {showDemoCredentials && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Credenciales de Demo:
                </p>
                
                <div className="space-y-3">
                  {/* Professional Account */}
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 mb-1">
                      👩‍⚕️ Cuenta Profesional
                    </p>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('professional')}
                      className="w-full text-left text-xs bg-white p-2 rounded border border-emerald-200 hover:bg-emerald-50 transition-colors"
                    >
                      <div className="font-mono">dr.martinez@alkadami.com</div>
                      <div className="font-mono text-gray-600">keto2024</div>
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Puede crear recetas, vender productos, gestionar citas
                    </p>
                  </div>

                  {/* Institution Account */}
                  <div>
                    <p className="text-xs font-semibold text-blue-700 mb-1">
                      🏥 Cuenta Institución
                    </p>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('institution')}
                      className="w-full text-left text-xs bg-white p-2 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-mono">admin@centroketo.com</div>
                      <div className="font-mono text-gray-600">centro2024</div>
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Gestiona profesionales, ofrece servicios, vende productos
                    </p>
                  </div>

                  {/* User Account */}
                  <div>
                    <p className="text-xs font-semibold text-teal-700 mb-1">
                      👤 Cuenta Usuario
                    </p>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('user')}
                      className="w-full text-left text-xs bg-white p-2 rounded border border-teal-200 hover:bg-teal-50 transition-colors"
                    >
                      <div className="font-mono">usuario@gmail.com</div>
                      <div className="font-mono text-gray-600">user123</div>
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Puede usar todos los servicios, participar en foro, comprar productos
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              🔒 Sistema de autenticación simulado con datos hardcoded
              <br />
              Listo para migración a sistema real
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
