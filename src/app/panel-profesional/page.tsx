'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, User, DollarSign, TrendingUp, Users as UsersIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAppointmentsByProfessional, getPendingAppointmentsByProfessional, getUpcomingAppointmentsByProfessional, updateAppointmentStatus } from '@/data/appointments';
import { getUserById } from '@/data/users';
import { Appointment } from '@/types';

export default function PanelProfesionalPage() {
  const { user, isAuthenticated, isLoading, isProfessional, isInstitution } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'upcoming' | 'all'>('pending');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, upcoming: 0, completed: 0 });

  // Redirect if not authenticated or not a professional/institution
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && user && !isProfessional() && !isInstitution()) {
      router.push('/mis-citas');
    }
  }, [isAuthenticated, isLoading, user, isProfessional, isInstitution, router]);

  // Load appointments
  useEffect(() => {
    if (user && (isProfessional() || isInstitution())) {
      const professionalAppointments = getAppointmentsByProfessional(user.id);
      setAppointments(professionalAppointments);
      
      // Calculate stats
      const now = new Date();
      setStats({
        total: professionalAppointments.length,
        pending: professionalAppointments.filter(a => a.status === 'pending').length,
        upcoming: professionalAppointments.filter(a => a.date > now && a.status === 'confirmed').length,
        completed: professionalAppointments.filter(a => a.status === 'completed').length
      });
    }
  }, [user, isProfessional, isInstitution]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando panel...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const pendingAppointments = getPendingAppointmentsByProfessional(user.id);
  const upcomingAppointments = getUpcomingAppointmentsByProfessional(user.id);
  
  let displayedAppointments: Appointment[] = [];
  if (selectedTab === 'pending') {
    displayedAppointments = pendingAppointments;
  } else if (selectedTab === 'upcoming') {
    displayedAppointments = upcomingAppointments;
  } else {
    displayedAppointments = appointments.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  const handleConfirmAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'confirmed');
    // Refresh appointments
    const updated = getAppointmentsByProfessional(user.id);
    setAppointments(updated);
  };

  const handleRejectAppointment = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'rejected');
    // Refresh appointments
    const updated = getAppointmentsByProfessional(user.id);
    setAppointments(updated);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Confirmada
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            Pendiente
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Completada
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelada
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            <XCircle className="w-3 h-3" />
            Rechazada
          </span>
        );
    }
  };

  const getServiceTypeName = (type: Appointment['serviceType']) => {
    switch (type) {
      case 'consultation': return 'Consulta';
      case 'nutrition-plan': return 'Plan Nutricional';
      case 'follow-up': return 'Seguimiento';
      case 'group-session': return 'Sesión Grupal';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel Profesional</h1>
          <p className="text-gray-600">Gestiona tus citas y clientes</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <Calendar className="w-10 h-10 text-emerald-600" />
            </div>
            <p className="text-gray-600 font-medium">Total de Citas</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
              <AlertCircle className="w-10 h-10 text-yellow-600" />
            </div>
            <p className="text-gray-600 font-medium">Pendientes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-green-600">{stats.upcoming}</div>
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-gray-600 font-medium">Próximas</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium">Completadas</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('pending')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'pending'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Pendientes ({pendingAppointments.length})
          </button>
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'upcoming'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Próximas ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'all'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todas ({appointments.length})
          </button>
        </div>

        {/* Appointments List */}
        {displayedAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <UsersIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedTab === 'pending' ? 'No tienes citas pendientes' : 
               selectedTab === 'upcoming' ? 'No tienes citas próximas' : 'No tienes citas registradas'}
            </h3>
            <p className="text-gray-500">
              Las citas aparecerán aquí cuando los usuarios las agenden
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {displayedAppointments.map((appointment, index) => {
              const client = getUserById(appointment.userId);
              
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-5xl">{client?.avatar || '👤'}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{client?.name}</h3>
                            <p className="text-gray-600">{client?.email}</p>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm">
                              {new Date(appointment.date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm">
                              {new Date(appointment.date).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm">{getServiceTypeName(appointment.serviceType)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-semibold">${appointment.price}</span>
                            <span className="text-xs text-gray-500">
                              ({appointment.paymentStatus === 'paid' ? 'Pagado' : 
                                appointment.paymentStatus === 'pending' ? 'Pendiente' : 'Reembolsado'})
                            </span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Notas del cliente:</span> {appointment.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-56">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Confirmar Cita
                          </button>
                          <button
                            onClick={() => handleRejectAppointment(appointment.id)}
                            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            <XCircle className="w-4 h-4" />
                            Rechazar
                          </button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marcar Completada
                        </button>
                      )}

                      {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
                        <div className="text-center text-sm text-gray-500">
                          {appointment.status === 'completed' ? 'Cita completada' : 'Cita cancelada'}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
