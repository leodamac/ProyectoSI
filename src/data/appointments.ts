import { Appointment } from '@/types';

// Mock appointments for demonstration
// In a real application, these would be stored in a database
export const mockAppointments: Appointment[] = [
  // Appointments with Dra. María Martínez (prof-1)
  {
    id: 'apt-1',
    userId: 'user-1',
    professionalId: 'prof-1',
    serviceType: 'consultation',
    date: new Date('2025-11-05T10:00:00'),
    duration: 60,
    status: 'confirmed',
    notes: 'Primera consulta - evaluación inicial',
    price: 50,
    paymentStatus: 'paid',
    paymentId: 'pay-1',
    createdAt: new Date('2025-10-28T14:30:00'),
    meetingLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 'apt-2',
    userId: 'user-2',
    professionalId: 'prof-1',
    serviceType: 'follow-up',
    date: new Date('2025-11-06T15:00:00'),
    duration: 45,
    status: 'confirmed',
    notes: 'Seguimiento mensual',
    price: 40,
    paymentStatus: 'paid',
    paymentId: 'pay-2',
    createdAt: new Date('2025-10-29T09:15:00'),
    meetingLink: 'https://meet.google.com/xyz-uvwx-rst'
  },
  {
    id: 'apt-3',
    userId: 'user-4',
    professionalId: 'prof-1',
    serviceType: 'nutrition-plan',
    date: new Date('2025-11-08T11:00:00'),
    duration: 90,
    status: 'pending',
    notes: 'Plan nutricional personalizado para pérdida de peso',
    price: 75,
    paymentStatus: 'pending',
    createdAt: new Date('2025-10-30T16:45:00')
  },

  // Appointments with Chef Carlos Rodríguez (prof-2)
  {
    id: 'apt-4',
    userId: 'user-1',
    professionalId: 'prof-2',
    serviceType: 'consultation',
    date: new Date('2025-11-07T16:00:00'),
    duration: 60,
    status: 'confirmed',
    notes: 'Consulta sobre recetas keto para principiantes',
    price: 40,
    paymentStatus: 'paid',
    paymentId: 'pay-3',
    createdAt: new Date('2025-10-29T11:20:00'),
    meetingLink: 'https://zoom.us/j/123456789'
  },
  {
    id: 'apt-5',
    userId: 'user-3',
    professionalId: 'prof-2',
    serviceType: 'group-session',
    date: new Date('2025-11-09T14:00:00'),
    duration: 120,
    status: 'confirmed',
    notes: 'Taller grupal de cocina keto',
    price: 30,
    paymentStatus: 'paid',
    paymentId: 'pay-4',
    createdAt: new Date('2025-10-30T10:00:00'),
    meetingLink: 'https://zoom.us/j/987654321'
  },

  // Appointments with Nutricionista Ana López (prof-3) - from institution
  {
    id: 'apt-6',
    userId: 'user-2',
    professionalId: 'prof-3',
    serviceType: 'consultation',
    date: new Date('2025-11-10T17:00:00'),
    duration: 60,
    status: 'confirmed',
    notes: 'Nutrición deportiva para CrossFit',
    price: 45,
    paymentStatus: 'paid',
    paymentId: 'pay-5',
    createdAt: new Date('2025-10-30T13:30:00'),
    meetingLink: 'https://meet.google.com/sport-keto-123'
  },

  // Past appointments (completed)
  {
    id: 'apt-7',
    userId: 'user-1',
    professionalId: 'prof-1',
    serviceType: 'consultation',
    date: new Date('2025-10-20T10:00:00'),
    duration: 60,
    status: 'completed',
    notes: 'Consulta inicial completada exitosamente',
    price: 50,
    paymentStatus: 'paid',
    paymentId: 'pay-6',
    createdAt: new Date('2025-10-15T09:00:00'),
    updatedAt: new Date('2025-10-20T11:00:00')
  },

  // Cancelled appointment
  {
    id: 'apt-8',
    userId: 'user-3',
    professionalId: 'prof-1',
    serviceType: 'consultation',
    date: new Date('2025-11-02T14:00:00'),
    duration: 60,
    status: 'cancelled',
    notes: 'Cancelada por el usuario',
    price: 50,
    paymentStatus: 'refunded',
    paymentId: 'pay-7',
    createdAt: new Date('2025-10-25T15:00:00'),
    updatedAt: new Date('2025-10-28T10:00:00')
  },

  // Leonardo's consultation request to Dra. María Martínez (SIMULATION)
  // The request goes through Centro Keto (her institution) for approval
  {
    id: 'apt-9',
    userId: 'user-5', // Leonardo
    professionalId: 'prof-1', // Dra. María Martínez - Requested professional
    institutionId: 'inst-1', // Centro Keto Guayaquil - Manages the request
    // assignedProfessionalId will be set when center approves/assigns
    serviceType: 'consultation',
    date: new Date('2025-11-15T10:00:00'), // Future date
    duration: 60,
    status: 'pending', // Waiting for center approval
    notes: 'Primera consulta - Deseo comenzar con dieta cetogénica para pérdida de peso y mejorar mi control de glucosa',
    price: 50,
    paymentStatus: 'pending',
    createdAt: new Date('2025-11-12T14:30:00'), // Recent request
    medicalHistory: {
      conditions: ['Prediabetes', 'Sobrepeso'],
      medications: ['Metformina 500mg'],
      surgeries: [],
      familyHistory: ['Diabetes tipo 2 (padre)', 'Hipertensión (madre)'],
      lifestyle: {
        smokingStatus: 'never',
        alcoholConsumption: 'occasional',
        exerciseFrequency: 'moderate',
        sleepHours: 6.5,
        stressLevel: 'moderate'
      },
      vitalSigns: {
        bloodPressure: '135/85',
        heartRate: 78,
        bloodGlucose: 115,
        cholesterol: {
          total: 215,
          ldl: 145,
          hdl: 42,
          triglycerides: 180
        }
      },
      previousDiets: ['Dieta baja en grasas', 'Dieta mediterránea', 'Ayuno intermitente'],
      reasonForConsultation: 'Quiero comenzar una dieta cetogénica para perder peso (objetivo: 80kg desde 95kg actual) y mejorar mi control de glucosa. He escuchado buenos resultados sobre la dieta keto para casos de prediabetes y me gustaría un plan profesional adaptado a mis necesidades.'
    }
  }
];

/**
 * Get appointments for a specific user
 */
export function getAppointmentsByUser(userId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.userId === userId);
}

/**
 * Get appointments for a specific professional (including assigned ones)
 */
export function getAppointmentsByProfessional(professionalId: string): Appointment[] {
  return mockAppointments.filter(apt => 
    apt.professionalId === professionalId || apt.assignedProfessionalId === professionalId
  );
}

/**
 * Get appointments for an institution
 */
export function getAppointmentsByInstitution(institutionId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.institutionId === institutionId);
}

/**
 * Get pending appointments for an institution (not yet assigned)
 */
export function getPendingInstitutionAppointments(institutionId: string): Appointment[] {
  return mockAppointments.filter(
    apt => apt.institutionId === institutionId && 
           apt.status === 'pending' && 
           apt.professionalId === institutionId
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/**
 * Get assigned appointments for a professional from their institution
 */
export function getAssignedAppointments(professionalId: string): Appointment[] {
  return mockAppointments.filter(
    apt => apt.assignedProfessionalId === professionalId
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/**
 * Get appointment by ID
 */
export function getAppointmentById(id: string): Appointment | null {
  return mockAppointments.find(apt => apt.id === id) || null;
}

/**
 * Get upcoming appointments for a user
 */
export function getUpcomingAppointmentsByUser(userId: string): Appointment[] {
  const now = new Date();
  return mockAppointments.filter(
    apt => apt.userId === userId && 
           apt.date > now && 
           (apt.status === 'confirmed' || apt.status === 'pending')
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Get upcoming appointments for a professional
 */
export function getUpcomingAppointmentsByProfessional(professionalId: string): Appointment[] {
  const now = new Date();
  return mockAppointments.filter(
    apt => apt.professionalId === professionalId && 
           apt.date > now && 
           (apt.status === 'confirmed' || apt.status === 'pending')
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Get pending appointments (waiting for professional confirmation)
 */
export function getPendingAppointmentsByProfessional(professionalId: string): Appointment[] {
  return mockAppointments.filter(
    apt => (apt.professionalId === professionalId || apt.assignedProfessionalId === professionalId) && 
           apt.status === 'pending'
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Simulate booking an appointment
 * In a real app, this would make an API call to create the appointment
 */
export function createAppointment(
  userId: string,
  professionalId: string,
  serviceType: Appointment['serviceType'],
  date: Date,
  duration: number,
  notes: string,
  price: number
): Appointment {
  const newAppointment: Appointment = {
    id: `apt-${mockAppointments.length + 1}`,
    userId,
    professionalId,
    serviceType,
    date,
    duration,
    status: 'pending',
    notes,
    price,
    paymentStatus: 'pending',
    createdAt: new Date()
  };

  mockAppointments.push(newAppointment);
  return newAppointment;
}

/**
 * Update appointment status
 */
export function updateAppointmentStatus(
  appointmentId: string,
  status: Appointment['status']
): Appointment | null {
  const appointment = mockAppointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    appointment.status = status;
    appointment.updatedAt = new Date();
    return appointment;
  }
  return null;
}

/**
 * Assign an appointment to a professional (for institutions)
 * This approves the request and assigns it to the professional
 */
export function assignAppointmentToProfessional(
  appointmentId: string,
  professionalId: string
): Appointment | null {
  const appointment = mockAppointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    appointment.assignedProfessionalId = professionalId;
    appointment.status = 'pending'; // Still pending professional confirmation
    appointment.updatedAt = new Date();
    return appointment;
  }
  return null;
}

/**
 * Request more information from patient (for institutions)
 */
export function requestMoreInformation(
  appointmentId: string,
  informationRequested: string,
  institutionNotes?: string
): Appointment | null {
  const appointment = mockAppointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    appointment.status = 'info-requested';
    appointment.infoRequested = informationRequested;
    if (institutionNotes) {
      appointment.institutionNotes = institutionNotes;
    }
    appointment.updatedAt = new Date();
    return appointment;
  }
  return null;
}

/**
 * Approve and keep same professional (institution approves original request)
 */
export function approveAppointment(
  appointmentId: string
): Appointment | null {
  const appointment = mockAppointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    // Assign to the originally requested professional
    appointment.assignedProfessionalId = appointment.professionalId;
    appointment.status = 'pending'; // Pending professional confirmation
    appointment.updatedAt = new Date();
    return appointment;
  }
  return null;
}
