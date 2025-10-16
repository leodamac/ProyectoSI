import { Nutritionist, NutritionistReview } from '@/types';

export const nutritionists: Nutritionist[] = [
  {
    id: 'n1',
    name: 'Dr. María Fernández',
    specialty: 'Nutrición Keto y Metabólica',
    description: 'Especialista en dietas cetogénicas con más de 10 años de experiencia ayudando a pacientes a transformar su salud metabólica.',
    image: '👩‍⚕️',
    experience: 10,
    rating: 4.9,
    reviewCount: 156,
    availability: [
      { day: 'Lunes', hours: '9:00 AM - 1:00 PM' },
      { day: 'Miércoles', hours: '2:00 PM - 6:00 PM' },
      { day: 'Viernes', hours: '9:00 AM - 5:00 PM' }
    ],
    languages: ['Español', 'Inglés'],
    certifications: [
      'Certificación en Nutrición Ketogénica',
      'Maestría en Nutrición Clínica',
      'Especialista en Salud Metabólica'
    ],
    isPremium: true,
    price: 50
  },
  {
    id: 'n2',
    name: 'Dr. Carlos Mendoza',
    specialty: 'Nutrición Deportiva Keto',
    description: 'Experto en optimizar el rendimiento atlético mediante la nutrición cetogénica. Trabaja con atletas de élite y deportistas recreativos.',
    image: '👨‍⚕️',
    experience: 8,
    rating: 4.8,
    reviewCount: 98,
    availability: [
      { day: 'Martes', hours: '8:00 AM - 12:00 PM' },
      { day: 'Jueves', hours: '3:00 PM - 7:00 PM' },
      { day: 'Sábado', hours: '10:00 AM - 2:00 PM' }
    ],
    languages: ['Español', 'Inglés', 'Portugués'],
    certifications: [
      'Nutrición Deportiva Avanzada',
      'Certificación Keto para Atletas',
      'Entrenador Personal Certificado'
    ],
    isPremium: true,
    price: 45
  },
  {
    id: 'n3',
    name: 'Lic. Ana Rodríguez',
    specialty: 'Pérdida de Peso Saludable',
    description: 'Apasionada por ayudar a las personas a alcanzar sus objetivos de peso de manera sostenible con enfoque keto.',
    image: '👩‍⚕️',
    experience: 6,
    rating: 4.7,
    reviewCount: 132,
    availability: [
      { day: 'Lunes', hours: '2:00 PM - 6:00 PM' },
      { day: 'Miércoles', hours: '9:00 AM - 1:00 PM' },
      { day: 'Viernes', hours: '3:00 PM - 7:00 PM' }
    ],
    languages: ['Español'],
    certifications: [
      'Licenciatura en Nutrición',
      'Certificación Keto Coach',
      'Nutrición para Control de Peso'
    ],
    isPremium: true,
    price: 40
  },
  {
    id: 'n4',
    name: 'Dr. Roberto Silva',
    specialty: 'Nutrición para Diabetes',
    description: 'Especialista en el manejo de diabetes tipo 2 mediante dieta cetogénica. Ayuda a pacientes a reducir medicación.',
    image: '👨‍⚕️',
    experience: 12,
    rating: 5.0,
    reviewCount: 87,
    availability: [
      { day: 'Lunes', hours: '10:00 AM - 2:00 PM' },
      { day: 'Jueves', hours: '9:00 AM - 1:00 PM' }
    ],
    languages: ['Español', 'Inglés'],
    certifications: [
      'Endocrinología y Nutrición',
      'Certificación en Manejo de Diabetes',
      'Experto en Nutrición Terapéutica'
    ],
    isPremium: true,
    price: 60
  }
];

export const nutritionistReviews: NutritionistReview[] = [
  {
    id: 'r1',
    nutritionistId: 'n1',
    userName: 'Laura Martínez',
    rating: 5,
    comment: 'La Dra. Fernández cambió mi vida. Perdí 15kg y mi energía está por las nubes. Muy profesional y empática.',
    date: new Date('2025-09-15'),
    verified: true
  },
  {
    id: 'r2',
    nutritionistId: 'n1',
    userName: 'Pedro García',
    rating: 5,
    comment: 'Excelente seguimiento personalizado. Me ayudó a entender la dieta keto y adaptarla a mi estilo de vida.',
    date: new Date('2025-08-22'),
    verified: true
  },
  {
    id: 'r3',
    nutritionistId: 'n2',
    userName: 'Juan Deportista',
    rating: 5,
    comment: 'Como atleta, el Dr. Mendoza me ayudó a optimizar mi rendimiento. Increíbles resultados en competencias.',
    date: new Date('2025-09-01'),
    verified: true
  },
  {
    id: 'r4',
    nutritionistId: 'n3',
    userName: 'Carmen López',
    rating: 5,
    comment: 'Muy amable y paciente. Me explicó todo paso a paso y los resultados han sido asombrosos.',
    date: new Date('2025-09-10'),
    verified: true
  },
  {
    id: 'r5',
    nutritionistId: 'n4',
    userName: 'Miguel Sánchez',
    rating: 5,
    comment: 'Controlé mi diabetes tipo 2 gracias al Dr. Silva. Ya reduje mi medicación bajo supervisión médica.',
    date: new Date('2025-08-28'),
    verified: true
  }
];
