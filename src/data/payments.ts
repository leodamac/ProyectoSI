import { Payment } from '@/types';

// Mock payments for demonstration (Wizard of Oz approach)
// In a real application, these would be stored in a database
export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    userId: 'user-1',
    amount: 50,
    currency: 'USD',
    type: 'appointment',
    status: 'completed',
    method: 'credit-card',
    relatedId: 'apt-1',
    createdAt: new Date('2025-10-28T14:35:00'),
    completedAt: new Date('2025-10-28T14:35:30'),
    metadata: {
      cardLast4: '4242',
      cardBrand: 'Visa',
      transactionId: 'txn_1A2B3C4D5E6F'
    }
  },
  {
    id: 'pay-2',
    userId: 'user-2',
    amount: 40,
    currency: 'USD',
    type: 'appointment',
    status: 'completed',
    method: 'credit-card',
    relatedId: 'apt-2',
    createdAt: new Date('2025-10-29T09:20:00'),
    completedAt: new Date('2025-10-29T09:20:15'),
    metadata: {
      cardLast4: '5555',
      cardBrand: 'Mastercard',
      transactionId: 'txn_2B3C4D5E6F7G'
    }
  },
  {
    id: 'pay-3',
    userId: 'user-1',
    amount: 40,
    currency: 'USD',
    type: 'appointment',
    status: 'completed',
    method: 'paypal',
    relatedId: 'apt-4',
    createdAt: new Date('2025-10-29T11:25:00'),
    completedAt: new Date('2025-10-29T11:25:45'),
    metadata: {
      transactionId: 'pp_3C4D5E6F7G8H'
    }
  },
  {
    id: 'pay-4',
    userId: 'user-3',
    amount: 30,
    currency: 'USD',
    type: 'appointment',
    status: 'completed',
    method: 'debit-card',
    relatedId: 'apt-5',
    createdAt: new Date('2025-10-30T10:05:00'),
    completedAt: new Date('2025-10-30T10:05:20'),
    metadata: {
      cardLast4: '8888',
      cardBrand: 'Visa',
      transactionId: 'txn_4D5E6F7G8H9I'
    }
  },
  {
    id: 'pay-5',
    userId: 'user-2',
    amount: 45,
    currency: 'USD',
    type: 'appointment',
    status: 'completed',
    method: 'credit-card',
    relatedId: 'apt-6',
    createdAt: new Date('2025-10-30T13:35:00'),
    completedAt: new Date('2025-10-30T13:35:25'),
    metadata: {
      cardLast4: '1234',
      cardBrand: 'American Express',
      transactionId: 'txn_5E6F7G8H9I0J'
    }
  },
  {
    id: 'pay-6',
    userId: 'user-1',
    amount: 50,
    currency: 'USD',
    type: 'appointment',
    status: 'completed',
    method: 'credit-card',
    relatedId: 'apt-7',
    createdAt: new Date('2025-10-15T09:05:00'),
    completedAt: new Date('2025-10-15T09:05:15'),
    metadata: {
      cardLast4: '4242',
      cardBrand: 'Visa',
      transactionId: 'txn_6F7G8H9I0J1K'
    }
  },
  {
    id: 'pay-7',
    userId: 'user-3',
    amount: 50,
    currency: 'USD',
    type: 'appointment',
    status: 'refunded',
    method: 'credit-card',
    relatedId: 'apt-8',
    createdAt: new Date('2025-10-25T15:05:00'),
    completedAt: new Date('2025-10-28T10:05:00'),
    metadata: {
      cardLast4: '9999',
      cardBrand: 'Visa',
      transactionId: 'txn_7G8H9I0J1K2L'
    }
  }
];

/**
 * Get payment by ID
 */
export function getPaymentById(id: string): Payment | null {
  return mockPayments.find(payment => payment.id === id) || null;
}

/**
 * Get payments for a user
 */
export function getPaymentsByUser(userId: string): Payment[] {
  return mockPayments.filter(payment => payment.userId === userId);
}

/**
 * Get payment for a specific appointment
 */
export function getPaymentByAppointment(appointmentId: string): Payment | null {
  return mockPayments.find(payment => 
    payment.type === 'appointment' && payment.relatedId === appointmentId
  ) || null;
}

/**
 * Simulate processing a payment (Wizard of Oz)
 * In a real app, this would integrate with Stripe, PayPal, etc.
 */
export async function processPayment(
  userId: string,
  amount: number,
  currency: string,
  type: Payment['type'],
  method: Payment['method'],
  relatedId?: string,
  cardInfo?: { last4: string; brand: string }
): Promise<{ success: boolean; payment?: Payment; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate 95% success rate
  const shouldSucceed = Math.random() > 0.05;

  if (!shouldSucceed) {
    return {
      success: false,
      error: 'Pago rechazado. Por favor verifica los datos de tu tarjeta.'
    };
  }

  const payment: Payment = {
    id: `pay-${mockPayments.length + 1}`,
    userId,
    amount,
    currency,
    type,
    status: 'completed',
    method,
    relatedId,
    createdAt: new Date(),
    completedAt: new Date(),
    metadata: {
      cardLast4: cardInfo?.last4 || '****',
      cardBrand: cardInfo?.brand || 'Unknown',
      transactionId: `txn_${Math.random().toString(36).substring(7).toUpperCase()}`
    }
  };

  mockPayments.push(payment);

  return {
    success: true,
    payment
  };
}

/**
 * Simulate refunding a payment
 */
export async function refundPayment(paymentId: string): Promise<{ success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const payment = mockPayments.find(p => p.id === paymentId);
  
  if (!payment) {
    return {
      success: false,
      error: 'Pago no encontrado'
    };
  }

  if (payment.status === 'refunded') {
    return {
      success: false,
      error: 'Este pago ya fue reembolsado'
    };
  }

  payment.status = 'refunded';
  payment.completedAt = new Date();

  return { success: true };
}

/**
 * Get payment methods for display
 */
export const PAYMENT_METHODS = [
  {
    id: 'credit-card',
    name: 'Tarjeta de Crédito',
    icon: '💳',
    brands: ['Visa', 'Mastercard', 'American Express', 'Diners Club']
  },
  {
    id: 'debit-card',
    name: 'Tarjeta de Débito',
    icon: '💳',
    brands: ['Visa', 'Mastercard']
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    brands: []
  },
  {
    id: 'bank-transfer',
    name: 'Transferencia Bancaria',
    icon: '🏦',
    brands: []
  }
] as const;
