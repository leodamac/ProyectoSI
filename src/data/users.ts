import { User } from '@/types';

// Mock users with hardcoded credentials
// In a real application, these would be stored in a database with hashed passwords
export const mockUsers: (User & { password: string })[] = [
  // Professional users (independent - can create recipes, sell products, manage appointments)
  {
    id: 'prof-1',
    email: 'dr.martinez@alkadami.com',
    password: 'keto2024',
    name: 'Dra. María Martínez',
    role: 'professional',
    avatar: '👩‍⚕️',
    isPremium: true,
    phone: '+593 99 123 4567',
    bio: 'Nutricionista especializada en dietas cetogénicas con 12 años de experiencia',
    address: {
      street: 'Av. Principal 123',
      city: 'Guayaquil',
      state: 'Guayas',
      zipCode: '090150',
      country: 'Ecuador'
    },
    professionalInfo: {
      specialty: 'Nutrición Cetogénica y Metabolismo',
      certifications: ['Nutricionista Certificada', 'Especialista Keto', 'Coach Metabólico'],
      experience: 12,
      rating: 4.9,
      reviewCount: 156,
      hourlyRate: 50,
      availability: [
        { day: 'Lunes - Viernes', hours: '9:00 AM - 5:00 PM' },
        { day: 'Sábado', hours: '10:00 AM - 2:00 PM' }
      ],
      languages: ['Español', 'Inglés']
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
    phone: '+593 98 765 4321',
    bio: 'Chef especializado en cocina keto saludable y recetas innovadoras',
    professionalInfo: {
      specialty: 'Cocina Keto y Recetas Saludables',
      certifications: ['Chef Profesional', 'Nutrición Culinaria'],
      experience: 8,
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 40,
      availability: [
        { day: 'Martes - Jueves', hours: '2:00 PM - 8:00 PM' },
        { day: 'Sábado', hours: '10:00 AM - 4:00 PM' }
      ],
      languages: ['Español']
    }
  },
  {
    id: 'prof-3',
    email: 'nut.lopez@alkadami.com',
    password: 'nutri2024',
    name: 'Nutricionista Ana López',
    role: 'professional',
    avatar: '🥗',
    isPremium: true,
    phone: '+593 97 654 3210',
    bio: 'Nutricionista deportiva especializada en rendimiento atlético con dieta keto',
    institutionId: 'inst-1', // Works for Centro Keto Guayaquil
    professionalInfo: {
      specialty: 'Nutrición Deportiva Keto',
      certifications: ['Nutricionista Deportiva', 'Certificación Keto'],
      experience: 5,
      rating: 4.7,
      reviewCount: 62,
      hourlyRate: 45,
      availability: [
        { day: 'Lunes - Miércoles', hours: '3:00 PM - 7:00 PM' },
        { day: 'Viernes', hours: '4:00 PM - 8:00 PM' }
      ],
      languages: ['Español', 'Inglés'],
      institutionId: 'inst-1'
    }
  },

  // Institution users (can manage professionals, sell products, offer services)
  {
    id: 'inst-1',
    email: 'admin@centroketo.com',
    password: 'centro2024',
    name: 'Centro Keto Guayaquil',
    role: 'institution',
    avatar: '🏥',
    isPremium: true,
    phone: '+593 99 888 9999',
    bio: 'Centro especializado en nutrición cetogénica con equipo multidisciplinario',
    address: {
      street: 'Av. 9 de Octubre 456',
      city: 'Guayaquil',
      state: 'Guayas',
      zipCode: '090151',
      country: 'Ecuador'
    },
    institutionInfo: {
      type: 'nutrition-center',
      description: 'Centro integral de nutrición keto con 5 profesionales certificados',
      professionalIds: ['prof-3', 'prof-4'], // Professionals working here
      servicesOffered: ['Consultas nutricionales', 'Planes personalizados', 'Seguimiento mensual', 'Talleres grupales']
    }
  },
  {
    id: 'inst-2',
    email: 'ventas@ketoproducts.ec',
    password: 'products2024',
    name: 'Keto Products Ecuador',
    role: 'institution',
    avatar: '🏪',
    isPremium: true,
    phone: '+593 98 777 8888',
    bio: 'Distribuidor oficial de productos keto importados y nacionales',
    address: {
      street: 'Av. Las Américas 789',
      city: 'Quito',
      state: 'Pichincha',
      zipCode: '170501',
      country: 'Ecuador'
    },
    institutionInfo: {
      type: 'distributor',
      description: 'Distribuidor autorizado de las mejores marcas keto a nivel nacional',
      servicesOffered: ['Venta de productos keto', 'Envíos a todo el país', 'Asesoría de productos']
    }
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
    phone: '+593 99 888 7777',
    bio: 'Entusiasta del estilo de vida keto'
  },
  {
    id: 'user-2',
    email: 'maria.garcia@gmail.com',
    password: 'maria123',
    name: 'María García',
    role: 'user',
    avatar: '👩',
    isPremium: true, // Premium subscriber
    phone: '+593 98 777 6666',
    bio: 'Mamá keto buscando recetas saludables para toda la familia'
  },
  {
    id: 'user-3',
    email: 'pedro.sanchez@hotmail.com',
    password: 'pedro123',
    name: 'Pedro Sánchez',
    role: 'user',
    avatar: '👨',
    isPremium: false,
    bio: 'Nuevo en keto, aprendiendo cada día'
  },
  {
    id: 'user-4',
    email: 'laura.torres@yahoo.com',
    password: 'laura123',
    name: 'Laura Torres',
    role: 'user',
    avatar: '👩‍💼',
    isPremium: true, // Premium subscriber
    bio: 'Profesional ocupada que busca mantener un estilo de vida saludable'
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

/**
 * Get all professionals (independent or from institutions)
 */
export function getAllProfessionals(): User[] {
  return mockUsers
    .filter(u => u.role === 'professional')
    .map(({ password: _, ...user }) => user);
}

/**
 * Get all institutions
 */
export function getAllInstitutions(): User[] {
  return mockUsers
    .filter(u => u.role === 'institution')
    .map(({ password: _, ...user }) => user);
}

/**
 * Get professionals by institution ID
 */
export function getProfessionalsByInstitution(institutionId: string): User[] {
  return mockUsers
    .filter(u => u.role === 'professional' && u.professionalInfo?.institutionId === institutionId)
    .map(({ password: _, ...user }) => user);
}
