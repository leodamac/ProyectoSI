'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, User, DollarSign, TrendingUp, Users as UsersIcon, Building2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  getAppointmentsByProfessional, 
  getPendingAppointmentsByProfessional, 
  getUpcomingAppointmentsByProfessional, 
  updateAppointmentStatus,
  getAppointmentsByInstitution,
  getPendingInstitutionAppointments,
  assignAppointmentToProfessional,
  getAssignedAppointments,
  approveAppointment,
  requestMoreInformation
} from '@/data/appointments';
import { getUserById, getProfessionalsByInstitution } from '@/data/users';
import { Appointment } from '@/types';

export default function PanelProfesionalPage() {
  const { user, isAuthenticated, isLoading, isProfessional, isInstitution } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'upcoming' | 'all' | 'requests' | 'professionals'>('pending');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, upcoming: 0, completed: 0, newRequests: 0 });
  const [selectedRequest, setSelectedRequest] = useState<Appointment | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newAssignments, setNewAssignments] = useState<string[]>([]); // Track new assignments for notifications
  const [newInstitutionRequests, setNewInstitutionRequests] = useState<string[]>([]); // Track new requests for institution

  // Set initial tab based on user role
  useEffect(() => {
    if (user) {
      if (isInstitution() && selectedTab === 'pending') {
        setSelectedTab('requests');
      }
    }
  }, [user, isInstitution, selectedTab]);

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
      let professionalAppointments: Appointment[] = [];
      
      if (isInstitution()) {
        professionalAppointments = getAppointmentsByInstitution(user.id);
        
        // Check for new unassigned requests
        const pendingRequests = getPendingInstitutionAppointments(user.id);
        const unassignedRequests = pendingRequests.filter(apt => !apt.assignedProfessionalId);
        if (unassignedRequests.length > 0) {
          const newRequestIds = unassignedRequests.map(apt => apt.id);
          setNewInstitutionRequests(newRequestIds);
        }
      } else {
        professionalAppointments = getAppointmentsByProfessional(user.id);
        
        // Check for new assigned appointments (for professionals)
        const assigned = getAssignedAppointments(user.id);
        const pendingAssigned = assigned.filter(apt => apt.status === 'pending');
        if (pendingAssigned.length > 0) {
          // Simulate notification check - in real app would compare with previous state
          const newOnes = pendingAssigned.map(apt => apt.id);
          setNewAssignments(newOnes);
        }
      }
      
      setAppointments(professionalAppointments);
      
      // Calculate stats
      const now = new Date();
      const pendingRequests = isInstitution() ? getPendingInstitutionAppointments(user.id).filter(apt => !apt.assignedProfessionalId) : [];
      
      setStats({
        total: professionalAppointments.length,
        pending: professionalAppointments.filter(a => a.status === 'pending').length,
        upcoming: professionalAppointments.filter(a => a.date > now && a.status === 'confirmed').length,
        completed: professionalAppointments.filter(a => a.status === 'completed').length,
        newRequests: pendingRequests.length
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

  // Get appropriate appointments based on user type
  const pendingAppointments = isInstitution() 
    ? getPendingInstitutionAppointments(user.id).filter(apt => apt.assignedProfessionalId) // Only assigned ones
    : getPendingAppointmentsByProfessional(user.id);
  
  const upcomingAppointments = isInstitution()
    ? getAppointmentsByInstitution(user.id).filter(apt => {
        const now = new Date();
        return apt.date > now && apt.status === 'confirmed';
      }).sort((a, b) => a.date.getTime() - b.date.getTime())
    : getUpcomingAppointmentsByProfessional(user.id);

  const institutionRequests = isInstitution() ? getPendingInstitutionAppointments(user.id).filter(apt => !apt.assignedProfessionalId) : [];
  const institutionProfessionals = isInstitution() ? getProfessionalsByInstitution(user.id) : [];
  
  let displayedAppointments: Appointment[] = [];
  if (selectedTab === 'requests' && isInstitution()) {
    displayedAppointments = institutionRequests; // Unassigned requests
  } else if (selectedTab === 'professionals' && isInstitution()) {
    displayedAppointments = []; // Will show professionals list instead
  } else if (selectedTab === 'pending') {
    displayedAppointments = pendingAppointments;
  } else if (selectedTab === 'upcoming') {
    displayedAppointments = upcomingAppointments;
  } else {
    displayedAppointments = appointments.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  const handleAssignRequest = (appointment: Appointment) => {
    setSelectedRequest(appointment);
    setShowAssignModal(true);
  };

  const handleApproveRequest = (appointmentId: string) => {
    approveAppointment(appointmentId);
    // Refresh appointments
    const updated = isInstitution() ? getAppointmentsByInstitution(user.id) : getAppointmentsByProfessional(user.id);
    setAppointments(updated);
  };

  const handleRequestInfo = (appointmentId: string) => {
    // In a real app, this would open a modal to enter the information request
    const infoNeeded = prompt('¿Qué información adicional necesitas del paciente?');
    if (infoNeeded) {
      requestMoreInformation(appointmentId, infoNeeded, 'El centro necesita más información antes de procesar tu solicitud.');
      const updated = getAppointmentsByInstitution(user.id);
      setAppointments(updated);
    }
  };

  const handleConfirmAssignment = (professionalId: string) => {
    if (selectedRequest) {
      assignAppointmentToProfessional(selectedRequest.id, professionalId);
      // Refresh appointments
      const updated = getAppointmentsByInstitution(user.id);
      setAppointments(updated);
      setShowAssignModal(false);
      setSelectedRequest(null);
    }
  };

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

        {/* Notification Banner for New Institution Requests */}
        {isInstitution() && newInstitutionRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-100 border-l-4 border-purple-600 p-4 mb-8 rounded-lg"
          >
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-purple-600 mr-3" />
              <div>
                <p className="font-semibold text-purple-900">
                  ¡Nueva solicitud de consulta!
                </p>
                <p className="text-sm text-purple-800">
                  Tienes {newInstitutionRequests.length} solicitud(es) nueva(s) de clientes esperando asignación. Revisa la sección de Solicitudes.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notification Banner for New Assignments */}
        {isProfessional() && newAssignments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-100 border-l-4 border-emerald-600 p-4 mb-8 rounded-lg"
          >
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-emerald-600 mr-3" />
              <div>
                <p className="font-semibold text-emerald-900">
                  ¡Nueva cita asignada!
                </p>
                <p className="text-sm text-emerald-800">
                  Tienes {newAssignments.length} cita(s) nueva(s) asignada(s) por tu centro. Revisa la sección de pendientes.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {isInstitution() && (
            <>
              <button
                onClick={() => setSelectedTab('requests')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedTab === 'requests'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Solicitudes ({institutionRequests.length})
                  {institutionRequests.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {institutionRequests.length}
                    </span>
                  )}
                </span>
              </button>
              <button
                onClick={() => setSelectedTab('professionals')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedTab === 'professionals'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" />
                  Profesionales ({institutionProfessionals.length})
                </span>
              </button>
            </>
          )}
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

        {/* Appointments List or Professionals List */}
        {selectedTab === 'professionals' && isInstitution() ? (
          /* Professional List for Institutions */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profesionales del Centro</h2>
            {institutionProfessionals.length === 0 ? (
              <div className="text-center py-16">
                <UsersIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No hay profesionales registrados
                </h3>
                <p className="text-gray-500">
                  Los profesionales del centro aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutionProfessionals.map((prof) => (
                  <motion.div
                    key={prof.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{prof.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{prof.name}</h3>
                        <p className="text-sm text-gray-600">{prof.professionalInfo?.specialty}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experiencia:</span>
                        <span className="font-medium">{prof.professionalInfo?.experience} años</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">⭐ {prof.professionalInfo?.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tarifa:</span>
                        <span className="font-medium">${prof.professionalInfo?.hourlyRate}/hora</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reseñas:</span>
                        <span className="font-medium">{prof.professionalInfo?.reviewCount}</span>
                      </div>
                    </div>
                    {prof.professionalInfo?.availability && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-600 font-semibold mb-2">Disponibilidad:</p>
                        {prof.professionalInfo.availability.map((avail, idx) => (
                          <p key={idx} className="text-xs text-gray-600">
                            {avail.day}: {avail.hours}
                          </p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : displayedAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <UsersIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {selectedTab === 'requests' ? 'No hay solicitudes pendientes' :
               selectedTab === 'pending' ? 'No tienes citas pendientes' : 
               selectedTab === 'upcoming' ? 'No tienes citas próximas' : 'No tienes citas registradas'}
            </h3>
            <p className="text-gray-500">
              {selectedTab === 'requests' ? 'Las nuevas solicitudes de clientes aparecerán aquí' : 'Las citas aparecerán aquí cuando los usuarios las agenden'}
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

                        {/* Medical History - Show for assigned appointments or institution view */}
                        {appointment.medicalHistory && (newAssignments.includes(appointment.id) || isInstitution()) && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Información del Paciente
                            </h4>
                            
                            {client?.ketoProfile && (
                              <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="font-medium text-blue-800">Peso:</span>{' '}
                                  <span className="text-gray-700">{client.ketoProfile.weight} kg</span>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">Altura:</span>{' '}
                                  <span className="text-gray-700">{client.ketoProfile.height} cm</span>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">Objetivo:</span>{' '}
                                  <span className="text-gray-700">{client.ketoProfile.targetWeight} kg</span>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">Actividad:</span>{' '}
                                  <span className="text-gray-700">{client.ketoProfile.activityLevel}</span>
                                </div>
                              </div>
                            )}
                            
                            {appointment.medicalHistory.conditions && appointment.medicalHistory.conditions.length > 0 && (
                              <div className="mb-2 text-sm">
                                <span className="font-medium text-blue-800">Condiciones:</span>{' '}
                                <span className="text-gray-700">{appointment.medicalHistory.conditions.join(', ')}</span>
                              </div>
                            )}
                            
                            {appointment.medicalHistory.medications && appointment.medicalHistory.medications.length > 0 && (
                              <div className="mb-2 text-sm">
                                <span className="font-medium text-blue-800">Medicamentos:</span>{' '}
                                <span className="text-gray-700">{appointment.medicalHistory.medications.join(', ')}</span>
                              </div>
                            )}
                            
                            {appointment.medicalHistory.vitalSigns && (
                              <div className="mb-2 text-sm">
                                <span className="font-medium text-blue-800">Signos Vitales:</span>{' '}
                                <span className="text-gray-700">
                                  PA: {appointment.medicalHistory.vitalSigns.bloodPressure}, 
                                  FC: {appointment.medicalHistory.vitalSigns.heartRate} bpm, 
                                  Glucosa: {appointment.medicalHistory.vitalSigns.bloodGlucose} mg/dL
                                </span>
                              </div>
                            )}
                            
                            {appointment.medicalHistory.reasonForConsultation && (
                              <div className="mt-3 text-sm">
                                <span className="font-medium text-blue-800">Motivo de Consulta:</span>
                                <p className="text-gray-700 mt-1">{appointment.medicalHistory.reasonForConsultation}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Show requested professional */}
                        {isInstitution() && appointment.professionalId && !appointment.assignedProfessionalId && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-800">
                              <span className="font-semibold">Solicitó cita con:</span>{' '}
                              {getUserById(appointment.professionalId)?.name}
                            </span>
                          </div>
                        )}

                        {/* Show assigned professional for institution view */}
                        {isInstitution() && appointment.assignedProfessionalId && (
                          <div className="mt-3 p-3 bg-emerald-50 rounded-lg flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-emerald-800">
                              <span className="font-semibold">Asignada a:</span>{' '}
                              {getUserById(appointment.assignedProfessionalId)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-64">
                      {/* Institution view - Action buttons for new requests */}
                      {isInstitution() && selectedTab === 'requests' && appointment.status === 'pending' && !appointment.assignedProfessionalId && (
                        <>
                          <button
                            onClick={() => handleApproveRequest(appointment.id)}
                            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Aprobar con {getUserById(appointment.professionalId)?.name?.split(' ')[0]}
                          </button>
                          <button
                            onClick={() => handleAssignRequest(appointment)}
                            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                          >
                            <UserCheck className="w-4 h-4" />
                            Reasignar a Otro Doctor
                          </button>
                          <button
                            onClick={() => handleRequestInfo(appointment.id)}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <AlertCircle className="w-4 h-4" />
                            Solicitar Más Información
                          </button>
                        </>
                      )}

                      {/* Professional view - Accept/Reject buttons */}
                      {!isInstitution() && appointment.status === 'pending' && (
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

      {/* Assignment Modal */}
      {showAssignModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Asignar Profesional</h2>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedRequest(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Request Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Detalles de la Solicitud</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Paciente:</span> {getUserById(selectedRequest.userId)?.name}</p>
                <p><span className="font-medium">Fecha:</span> {new Date(selectedRequest.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p><span className="font-medium">Servicio:</span> {getServiceTypeName(selectedRequest.serviceType)}</p>
                <p><span className="font-medium">Duración:</span> {selectedRequest.duration} minutos</p>
              </div>
            </div>

            {/* Professional Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Seleccionar Profesional</h3>
              {institutionProfessionals.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => handleConfirmAssignment(prof.id)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{prof.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{prof.name}</h4>
                      <p className="text-sm text-gray-600">{prof.professionalInfo?.specialty}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>⭐ {prof.professionalInfo?.rating}</span>
                        <span>{prof.professionalInfo?.experience} años exp.</span>
                        <span>${prof.professionalInfo?.hourlyRate}/h</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedRequest(null);
                }}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
