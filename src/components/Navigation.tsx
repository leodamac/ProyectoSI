'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Users, LayoutGrid, MessageSquare, Menu, X, Download, LogIn, LogOut, UserCircle, ChevronDown, ShoppingBag, BookOpen, Calendar, Briefcase, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPendingAppointmentsByProfessional, getAssignedAppointments, getPendingInstitutionAppointments, getAppointmentsByUser } from '@/data/appointments';

export default function Navigation() {
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout, isProfessional, isInstitution } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Check for pending appointments
  useEffect(() => {
    if (user) {
      if (isProfessional() || isInstitution()) {
        if (isInstitution()) {
          // For institutions: count unassigned pending requests
          const institutionRequests = getPendingInstitutionAppointments(user.id);
          const unassigned = institutionRequests.filter(apt => !apt.assignedProfessionalId);
          setPendingCount(unassigned.length);
        } else {
          // For professionals: count assigned pending appointments
          const assigned = getAssignedAppointments(user.id).filter(apt => apt.status === 'pending');
          setPendingCount(assigned.length);
        }
      } else {
        // For regular users: count newly confirmed appointments with videos
        const userAppointments = getAppointmentsByUser(user.id);
        const confirmedWithVideo = userAppointments.filter(
          apt => apt.status === 'confirmed' && apt.greetingVideoUrl && !apt.videoViewed
        );
        setPendingCount(confirmedWithVideo.length);
      }
    }
  }, [user, isProfessional, isInstitution]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-emerald-600">
            🥑 Alkadami Keto
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Inicio
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowServicesMenu(!showServicesMenu)}
                onMouseEnter={() => setShowServicesMenu(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
              >
                Servicios
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showServicesMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowServicesMenu(false)}
                  />
                  <div 
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    onMouseLeave={() => setShowServicesMenu(false)}
                  >
                    <Link 
                      href="/chat-ia" 
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      onClick={() => setShowServicesMenu(false)}
                    >
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-semibold">Chat IA</div>
                        <div className="text-xs text-gray-500">Asistente inteligente gratis</div>
                      </div>
                    </Link>
                    <Link 
                      href="/nutricionistas" 
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                      onClick={() => setShowServicesMenu(false)}
                    >
                      <Users className="w-5 h-5 text-teal-600" />
                      <div>
                        <div className="font-semibold">Nutricionistas</div>
                        <div className="text-xs text-gray-500">Consultas profesionales</div>
                      </div>
                    </Link>
                    <Link 
                      href="/personalizados" 
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={() => setShowServicesMenu(false)}
                    >
                      <LayoutGrid className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">Personalizados</div>
                        <div className="text-xs text-gray-500">Planes y recetas</div>
                      </div>
                    </Link>
                    <Link 
                      href="/foro" 
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      onClick={() => setShowServicesMenu(false)}
                    >
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-semibold">Foro</div>
                        <div className="text-xs text-gray-500">Comunidad keto</div>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
            
            <Link href="/productos" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Productos
            </Link>
            <Link href="/blog" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              <BookOpen className="w-4 h-4" />
              Blog
            </Link>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link 
              href="/carrito"
              className="bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
            >
              🛒 ({itemCount})
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Cart and User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/carrito"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              🛒 Carrito ({itemCount})
            </Link>
            
            {/* Notifications Bell for All Users */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  aria-label="Notificaciones"
                >
                  <Bell className="w-6 h-6" />
                  {pendingCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                      </div>
                      {pendingCount > 0 ? (
                        <div className="p-4">
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                            <div className="flex items-start">
                              <Bell className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                              <div>
                                <p className="text-sm font-semibold text-yellow-900">
                                  {isProfessional() || isInstitution() 
                                    ? `Tienes ${pendingCount} ${pendingCount === 1 ? 'solicitud pendiente' : 'solicitudes pendientes'}`
                                    : `¡Tu cita fue aceptada! 🎉`}
                                </p>
                                <p className="text-xs text-yellow-700 mt-1">
                                  {isProfessional() 
                                    ? 'Nuevas citas asignadas esperando tu confirmación'
                                    : isInstitution()
                                    ? 'Nuevas solicitudes de consulta de clientes'
                                    : 'El profesional te ha enviado un video de saludo'}
                                </p>
                                <Link
                                  href={isProfessional() || isInstitution() ? "/panel-profesional" : "/mis-citas"}
                                  onClick={() => setShowNotifications(false)}
                                  className="inline-block mt-2 text-xs font-medium text-yellow-800 hover:text-yellow-900 underline"
                                >
                                  {isProfessional() || isInstitution() ? 'Ver panel profesional →' : 'Ver mis citas →'}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No tienes notificaciones pendientes
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{user?.avatar || '👤'}</span>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-600">
                      {user?.role === 'professional' ? '👩‍⚕️ Profesional' : 
                       user?.role === 'institution' ? '🏥 Institución' : '👤 Usuario'}
                      {user?.isPremium && ' ⭐'}
                    </div>
                  </div>
                </button>
                
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                      <Link
                        href="/perfil"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <UserCircle className="w-4 h-4" />
                        Ver Perfil
                      </Link>
                      
                      {/* Professional/Institution specific menu items */}
                      {(isProfessional() || isInstitution()) && (
                        <>
                          <Link
                            href="/panel-profesional"
                            onClick={() => setShowUserMenu(false)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <Briefcase className="w-4 h-4" />
                            Panel Profesional
                          </Link>
                        </>
                      )}
                      
                      {/* Regular user menu items */}
                      {user?.role === 'user' && (
                        <Link
                          href="/mis-citas"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Mis Citas
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                href="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-colors font-medium"
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              
              {/* Services Section */}
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Servicios</p>
                <Link 
                  href="/chat-ia" 
                  className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  Chat IA
                </Link>
                <Link 
                  href="/nutricionistas" 
                  className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium px-4 py-3 rounded-lg transition-colors mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-5 h-5" />
                  Nutricionistas
                </Link>
                <Link 
                  href="/personalizados" 
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutGrid className="w-5 h-5" />
                  Personalizados
                </Link>
                <Link 
                  href="/foro" 
                  className="flex items-center gap-2 text-purple-700 hover:text-purple-800 font-medium px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageSquare className="w-5 h-5" />
                  Foro
                </Link>
              </div>
              
              {/* Other Links */}
              <div className="border-t border-gray-200 pt-3">
                <Link 
                  href="/productos" 
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Productos
                </Link>
                <Link 
                  href="/blog" 
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  Blog
                </Link>
                <Link 
                  href="/instalar" 
                  className="flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-semibold px-4 py-3 rounded-lg transition-colors mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download className="w-5 h-5" />
                  Instalar App
                </Link>
              </div>
              
              {/* User Section */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated ? (
                  <>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{user?.avatar || '👤'}</span>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                          <div className="text-xs text-gray-600">
                            {user?.role === 'professional' ? '👩‍⚕️ Profesional' : 
                             user?.role === 'institution' ? '🏥 Institución' : '👤 Usuario'}
                            {user?.isPremium && ' ⭐'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/perfil"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-2 text-gray-700 hover:bg-emerald-50 font-medium px-4 py-3 rounded-lg transition-colors mb-2"
                    >
                      <UserCircle className="w-5 h-5" />
                      Ver Perfil
                    </Link>
                    
                    {/* Professional/Institution menu items */}
                    {(isProfessional() || isInstitution()) && (
                      <Link
                        href="/panel-profesional"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center gap-2 text-gray-700 hover:bg-blue-50 font-medium px-4 py-3 rounded-lg transition-colors mb-2"
                      >
                        <Briefcase className="w-5 h-5" />
                        Panel Profesional
                      </Link>
                    )}
                    
                    {/* Regular user menu items */}
                    {user?.role === 'user' && (
                      <Link
                        href="/mis-citas"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center gap-2 text-gray-700 hover:bg-purple-50 font-medium px-4 py-3 rounded-lg transition-colors mb-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Mis Citas
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium px-4 py-3 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/login"
                    className="flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-semibold px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}