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
  }
];

/**
 * Get appointments for a specific user
 */
export function getAppointmentsByUser(userId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.userId === userId);
}

/**
 * Get appointments for a specific professional
 */
export function getAppointmentsByProfessional(professionalId: string): Appointment[] {
  return mockAppointments.filter(apt => apt.professionalId === professionalId);
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
    apt => apt.professionalId === professionalId && apt.status === 'pending'
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
