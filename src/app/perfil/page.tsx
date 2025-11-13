'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { User, Mail, MapPin, Settings, Save, Edit2, X, Award, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PerfilPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<typeof user>(user);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSave = () => {
    // In a real app, this would make an API call to save the changes
    // For now, we'll just show a success message
    setSuccessMessage('Perfil actualizado exitosamente');
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
              <p className="text-gray-600">Gestiona tu información personal y preferencias</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  <Edit2 className="w-5 h-5" />
                  Editar Perfil
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    Guardar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800"
            >
              ✓ {successMessage}
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center sticky top-24">
              <div className="mb-6">
                <div className="text-8xl mb-4">{user.avatar || '👤'}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    {user.role === 'professional' ? '👩‍⚕️ Profesional' : '👤 Usuario'}
                  </span>
                  {user.isPremium && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      ⭐ Premium
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>Miembro desde</span>
                  <span className="font-medium">{user.joinDate || '2025'}</span>
                </div>
                {user.role === 'professional' && (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 mt-4">
                    <Award className="w-5 h-5" />
                    <span className="font-semibold">Verificado</span>
                  </div>
                )}
                {/* Premium upgrade section for non-premium regular users */}
                {user.role === 'user' && !user.isPremium && (
                  <div className="mt-6">
                    <Link
                      href="/suscripcion"
                      className="block w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-3 rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-center"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="w-5 h-5" />
                        Activar Premium
                      </div>
                    </Link>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Accede a nutricionistas y más
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="space-y-6">
              {/* Información Personal */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Información Personal</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser?.name || ''}
                        onChange={(e) => editedUser && setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico
                    </label>
                    <p className="text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500 mt-1">El correo no se puede modificar</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedUser?.phone || ''}
                        onChange={(e) => editedUser && setEditedUser({ ...editedUser, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="+593 99 123 4567"
                      />
                    ) : (
                      <p className="text-gray-900">{user.phone || 'No especificado'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Género
                    </label>
                    {isEditing ? (
                      <select
                        value={editedUser?.gender || 'prefer-not-to-say'}
                        onChange={(e) => setEditedUser({ ...editedUser!, gender: e.target.value as 'male' | 'female' | 'other' | 'prefer-not-to-say' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                        <option value="prefer-not-to-say">Prefiero no decir</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {user.gender === 'male' ? 'Masculino' : 
                         user.gender === 'female' ? 'Femenino' : 
                         user.gender === 'other' ? 'Otro' : 
                         'Prefiero no decir'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedUser?.bio || ''}
                      onChange={(e) => setEditedUser({ ...editedUser!, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Cuéntanos un poco sobre ti..."
                    />
                  ) : (
                    <p className="text-gray-900">{user.bio || 'No especificado'}</p>
                  )}
                </div>
              </div>

              {/* Dirección */}
              {user.address && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Dirección</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calle
                      </label>
                      <p className="text-gray-900">{user.address.street}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad
                      </label>
                      <p className="text-gray-900">{user.address.city}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia
                      </label>
                      <p className="text-gray-900">{user.address.state}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal
                      </label>
                      <p className="text-gray-900">{user.address.zipCode}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        País
                      </label>
                      <p className="text-gray-900">{user.address.country}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Perfil Keto */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🥑</span>
                  <h3 className="text-2xl font-bold text-gray-900">Perfil Keto</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nivel de Actividad
                    </label>
                    {isEditing ? (
                      <select
                        value={editedUser?.ketoProfile?.activityLevel || 'moderate'}
                        onChange={(e) => {
                          const value = e.target.value as 'sedentary' | 'light' | 'moderate' | 'very-active' | 'extra-active';
                          if (editedUser) {
                            setEditedUser({
                              ...editedUser,
                              ketoProfile: { ...editedUser.ketoProfile, activityLevel: value }
                            });
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="sedentary">Sedentario</option>
                        <option value="light">Ligero</option>
                        <option value="moderate">Moderado</option>
                        <option value="very-active">Muy Activo</option>
                        <option value="extra-active">Extra Activo</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {user.ketoProfile?.activityLevel === 'sedentary' ? 'Sedentario' :
                         user.ketoProfile?.activityLevel === 'light' ? 'Ligero' :
                         user.ketoProfile?.activityLevel === 'moderate' ? 'Moderado' :
                         user.ketoProfile?.activityLevel === 'very-active' ? 'Muy Activo' :
                         user.ketoProfile?.activityLevel === 'extra-active' ? 'Extra Activo' :
                         'No especificado'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso Actual (kg)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedUser?.ketoProfile?.weight || ''}
                        onChange={(e) => editedUser && setEditedUser({
                          ...editedUser,
                          ketoProfile: { ...editedUser.ketoProfile, weight: parseFloat(e.target.value) || undefined }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="70"
                      />
                    ) : (
                      <p className="text-gray-900">{user.ketoProfile?.weight ? `${user.ketoProfile.weight} kg` : 'No especificado'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Altura (cm)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedUser?.ketoProfile?.height || ''}
                        onChange={(e) => editedUser && setEditedUser({
                          ...editedUser,
                          ketoProfile: { ...editedUser.ketoProfile, height: parseFloat(e.target.value) || undefined }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="170"
                      />
                    ) : (
                      <p className="text-gray-900">{user.ketoProfile?.height ? `${user.ketoProfile.height} cm` : 'No especificado'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso Objetivo (kg)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedUser?.ketoProfile?.targetWeight || ''}
                        onChange={(e) => editedUser && setEditedUser({
                          ...editedUser,
                          ketoProfile: { ...editedUser.ketoProfile, targetWeight: parseFloat(e.target.value) || undefined }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="65"
                      />
                    ) : (
                      <p className="text-gray-900">{user.ketoProfile?.targetWeight ? `${user.ketoProfile.targetWeight} kg` : 'No especificado'}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivos
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.ketoProfile?.goals && user.ketoProfile.goals.length > 0 ? (
                      user.ketoProfile.goals.map((goal, index) => (
                        <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                          {goal}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No hay objetivos especificados</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restricciones Dietéticas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.ketoProfile?.dietaryRestrictions && user.ketoProfile.dietaryRestrictions.length > 0 ? (
                      user.ketoProfile.dietaryRestrictions.map((restriction, index) => (
                        <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                          {restriction}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No hay restricciones especificadas</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alergias
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.ketoProfile?.allergies && user.ketoProfile.allergies.length > 0 ? (
                      user.ketoProfile.allergies.map((allergy, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No hay alergias especificadas</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preferencias */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Preferencias</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Notificaciones</p>
                      <p className="text-sm text-gray-600">Recibir notificaciones de la app</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedUser?.preferences?.notifications ?? true}
                      onChange={(e) => editedUser && setEditedUser({
                        ...editedUser,
                        preferences: { ...editedUser.preferences, notifications: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-600">Recibir newsletter semanal</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedUser?.preferences?.newsletter ?? true}
                      onChange={(e) => editedUser && setEditedUser({
                        ...editedUser,
                        preferences: { ...editedUser.preferences, newsletter: e.target.checked }
                      })}
                      disabled={!isEditing}
                      className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 Alkadami Keto. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
