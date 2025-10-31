import { User } from '@/types';

// Mock users with hardcoded credentials
// In a real application, these would be stored in a database with hashed passwords
export const mockUsers: (User & { password: string })[] = [
  // Professional users (can create recipes, sell products, manage appointments)
  {
    id: 'prof-1',
    email: 'dr.martinez@alkadami.com',
    password: 'keto2024',
    name: 'Dra. María Martínez',
    role: 'professional',
    avatar: '👩‍⚕️',
    isPremium: true,
    phone: '+593 99 123 4567',
    address: {
      street: 'Av. Principal 123',
      city: 'Guayaquil',
      state: 'Guayas',
      zipCode: '090150',
      country: 'Ecuador'
    }
  },
  {
    id: 'prof-2',
    email: 'chef.rodriguez@alkadami.com',
    password: 'chef2024',
    name: 'Chef Carlos Rodríguez',
    role: 'professional',
    avatar: '👨‍🍳',
    isPremium: true,
    phone: '+593 98 765 4321'
  },
  {
    id: 'prof-3',
    email: 'nut.lopez@alkadami.com',
    password: 'nutri2024',
    name: 'Nutricionista Ana López',
    role: 'professional',
    avatar: '🥗',
    isPremium: true,
    phone: '+593 97 654 3210'
  },
  
  // Normal users (can use all services, participate in forum, purchase products)
  {
    id: 'user-1',
    email: 'usuario@gmail.com',
    password: 'user123',
    name: 'Juan Pérez',
    role: 'user',
    avatar: '👤',
    isPremium: false,
    phone: '+593 99 888 7777'
  },
  {
    id: 'user-2',
    email: 'maria.garcia@gmail.com',
    password: 'maria123',
    name: 'María García',
    role: 'user',
    avatar: '👩',
    isPremium: true, // Premium subscriber
    phone: '+593 98 777 6666'
  },
  {
    id: 'user-3',
    email: 'pedro.sanchez@hotmail.com',
    password: 'pedro123',
    name: 'Pedro Sánchez',
    role: 'user',
    avatar: '👨',
    isPremium: false
  },
  {
    id: 'user-4',
    email: 'laura.torres@yahoo.com',
    password: 'laura123',
    name: 'Laura Torres',
    role: 'user',
    avatar: '👩‍💼',
    isPremium: true // Premium subscriber
  }
];

/**
 * Simulate login validation
 * In a real application, this would make an API call to validate credentials
 */
export function validateCredentials(email: string, password: string): User | null {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return null;
  }
  
  // Return user without password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): User | null {
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    return null;
  }
  
  // Return user without password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Get user by ID
 */
export function getUserById(id: string): User | null {
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    return null;
  }
  
  // Return user without password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
