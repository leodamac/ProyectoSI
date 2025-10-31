'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Video, DollarSign, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAppointmentsByUser } from '@/data/appointments';
import { getUserById } from '@/data/users';
import { Appointment } from '@/types';

export default function MisCitasPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Redirect if not authenticated or not a regular user
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && user && user.role !== 'user') {
      router.push('/panel-profesional');
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Load appointments
  useEffect(() => {
    if (user) {
      const userAppointments = getAppointmentsByUser(user.id);
      setAppointments(userAppointments);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Cargando citas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const now = new Date();
  const upcomingAppointments = appointments.filter(
    apt => apt.date > now && (apt.status === 'confirmed' || apt.status === 'pending')
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  const pastAppointments = appointments.filter(
    apt => apt.date <= now || apt.status === 'completed' || apt.status === 'cancelled'
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  const displayedAppointments = selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments;

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
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Citas</h1>
          <p className="text-gray-600">Gestiona tus consultas con profesionales</p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'upcoming'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Próximas Citas ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedTab === 'past'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Historial ({pastAppointments.length})
          </button>
        </div>

        {displayedAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedTab === 'upcoming' ? 'No tienes citas programadas' : 'No tienes citas pasadas'}
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedTab === 'upcoming' 
                ? 'Agenda una cita con uno de nuestros nutricionistas profesionales' 
                : 'Tus citas completadas aparecerán aquí'}
            </p>
            {selectedTab === 'upcoming' && (
              <a
                href="/nutricionistas"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Ver Nutricionistas
              </a>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {displayedAppointments.map((appointment, index) => {
              const professional = getUserById(appointment.professionalId);
              
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
                      <div className="text-5xl">{professional?.avatar || '👤'}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{professional?.name}</h3>
                            <p className="text-emerald-600 font-medium">{professional?.professionalInfo?.specialty}</p>
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
                              <span className="font-semibold">Notas:</span> {appointment.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-48">
                      {appointment.status === 'confirmed' && appointment.meetingLink && (
                        <a
                          href={appointment.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <Video className="w-4 h-4" />
                          Unirse a la Cita
                        </a>
                      )}
                      
                      {appointment.status === 'pending' && (
                        <button
                          className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                          Cancelar Cita
                        </button>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <button
                          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                        >
                          Agendar Seguimiento
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {displayedAppointments.length > 0 && selectedTab === 'upcoming' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a
              href="/nutricionistas"
              className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
            >
              Agendar Nueva Cita
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
