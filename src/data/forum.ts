import { ForumCommunity, ForumPost, ForumComment, ForumUser } from '@/types';

// Mock current user
export const currentUser: ForumUser = {
  id: 'user-1',
  username: 'KetoEnthusiast',
  avatar: '👤',
  joinDate: new Date('2024-01-15'),
  postCount: 23,
  karma: 156
};

// Mock users
export const forumUsers: ForumUser[] = [
  currentUser,
  {
    id: 'user-2',
    username: 'NutriExperta',
    avatar: '👩‍⚕️',
    joinDate: new Date('2023-11-20'),
    postCount: 87,
    karma: 542
  },
  {
    id: 'user-3',
    username: 'FitnessKeto',
    avatar: '💪',
    joinDate: new Date('2024-02-10'),
    postCount: 45,
    karma: 289
  },
  {
    id: 'user-4',
    username: 'ChefSaludable',
    avatar: '👨‍🍳',
    joinDate: new Date('2023-12-05'),
    postCount: 112,
    karma: 678
  },
  {
    id: 'user-5',
    username: 'MamáKeto',
    avatar: '👩‍👧',
    joinDate: new Date('2024-03-01'),
    postCount: 34,
    karma: 198
  }
];

// Forum communities inspired by the reference images
export const forumCommunities: ForumCommunity[] = [
  {
    id: 'healthy-foodies',
    name: 'Healthy Foodies',
    description: 'Comparte y descubre recetas keto deliciosas y saludables',
    icon: '🍎',
    color: '#86B049',
    memberCount: 2847,
    postCount: 1234,
    category: 'Recetas',
    rules: [
      'Comparte solo recetas keto-friendly',
      'Incluye información nutricional cuando sea posible',
      'Sé respetuoso con otros miembros'
    ],
    moderators: ['NutriExperta', 'ChefSaludable']
  },
  {
    id: 'fitness-tribe',
    name: 'Fitness Tribe',
    description: 'Ejercicio, entrenamiento y actividad física en la dieta keto',
    icon: '🏋️',
    color: '#7EA04B',
    memberCount: 1923,
    postCount: 892,
    category: 'Fitness',
    rules: [
      'Comparte rutinas y consejos de ejercicio',
      'Respeta todos los niveles de fitness',
      'No promuevas productos sin evidencia'
    ],
    moderators: ['FitnessKeto']
  },
  {
    id: 'healthy-mind',
    name: 'Healthy Mind',
    description: 'Salud mental, bienestar y motivación en tu viaje keto',
    icon: '🧠',
    color: '#6B8E4E',
    memberCount: 1456,
    postCount: 687,
    category: 'Bienestar',
    rules: [
      'Apoya a otros miembros',
      'Comparte experiencias positivas',
      'Busca ayuda profesional cuando sea necesario'
    ],
    moderators: ['NutriExperta']
  },
  {
    id: 'musica',
    name: 'Música',
    description: 'Música para cocinar, entrenar y disfrutar la vida keto',
    icon: '🎵',
    color: '#8AB24C',
    memberCount: 892,
    postCount: 234,
    category: 'Lifestyle',
    rules: [
      'Comparte listas de reproducción',
      'Respeta todos los gustos musicales',
      'Mantén el contenido apropiado'
    ],
    moderators: ['KetoEnthusiast']
  },
  {
    id: 'noticias',
    name: 'Noticias',
    description: 'Últimas noticias y estudios sobre nutrición y salud keto',
    icon: '📰',
    color: '#759447',
    memberCount: 1678,
    postCount: 445,
    category: 'Información',
    rules: [
      'Cita fuentes confiables',
      'No compartas información médica sin respaldo',
      'Debate de forma respetuosa'
    ],
    moderators: ['NutriExperta', 'KetoEnthusiast']
  }
];

// Mock forum posts
export const forumPosts: ForumPost[] = [
  {
    id: 'post-1',
    communityId: 'healthy-foodies',
    userId: 'user-2',
    username: 'NutriExperta',
    userAvatar: '👩‍⚕️',
    title: '¡Hola chicos! ¿Alguien ha preparado ensaladas exquisitas? Me gustaría sugerirle a mi clase y examenes, pero quiero comer algo bueno.',
    content: 'Estoy buscando ideas de ensaladas keto que sean nutritivas pero también deliciosas. Tengo una semana muy ocupada con clases y exámenes, y quiero asegurarme de comer bien sin gastar mucho tiempo cocinando. ¿Alguna sugerencia de ensaladas que se puedan preparar con anticipación?',
    timestamp: new Date('2024-06-15T10:30:00'),
    upvotes: 24,
    downvotes: 2,
    commentCount: 8,
    tags: ['recetas', 'ensaladas', 'meal-prep'],
    aiSummary: 'Usuario busca recetas de ensaladas keto nutritivas y fáciles de preparar para una semana ocupada. La comunidad sugiere ensaladas con pollo, aguacate, y vegetales de hoja verde que se pueden preparar con anticipación.'
  },
  {
    id: 'post-2',
    communityId: 'healthy-foodies',
    userId: 'user-3',
    username: 'FitnessKeto',
    userAvatar: '💪',
    title: '¡Sí, claro! Es muy buena, ¿me puedes dar un postre limón, sal, si, sal, eso tomaría algunos minutos.',
    content: 'Acabo de descubrir una receta increíble de postre keto de limón con sal del Himalaya. Es súper fácil y solo toma algunos minutos prepararlo. La combinación de limón y sal realza el sabor y elimina el retrogusto de los endulzantes keto. ¿Alguien más ha probado postres con esta combinación?',
    timestamp: new Date('2024-06-15T11:45:00'),
    upvotes: 18,
    downvotes: 1,
    commentCount: 5,
    tags: ['postres', 'recetas', 'limón'],
    aiSummary: 'Receta de postre keto de limón con sal del Himalaya. Preparación rápida que mejora el sabor de los endulzantes keto.'
  },
  {
    id: 'post-3',
    communityId: 'healthy-foodies',
    userId: 'user-5',
    username: 'MamáKeto',
    userAvatar: '👩‍👧',
    title: 'Es genial, también lo puedo recomendar un snack con tortillas integrales, muy bueno. súper fácil y delicioso.',
    content: 'Para los que buscan snacks rápidos, les recomiendo hacer chips de tortillas integrales bajas en carbohidratos. Son perfectas para cuando tienes antojo de algo crujiente. Las corto en triángulos, las rocío con aceite de aguacate y especias, y las hornear hasta que estén crujientes. ¡Mis hijos también las adoran!',
    timestamp: new Date('2024-06-14T16:20:00'),
    upvotes: 31,
    downvotes: 3,
    commentCount: 12,
    tags: ['snacks', 'fácil', 'familia'],
    aiSummary: 'Receta de chips keto hechos con tortillas integrales bajas en carbohidratos. Perfectos como snack crujiente y aprobados por toda la familia.'
  },
  {
    id: 'post-4',
    communityId: 'healthy-foodies',
    userId: 'user-4',
    username: 'ChefSaludable',
    userAvatar: '👨‍🍳',
    title: 'Te queda tiempo, acompaña con un te natural. Siempre se un plus.',
    content: 'Un consejo de chef: cualquier comida keto mejora con un buen té natural. El té verde o de hierbas no solo complementa los sabores, sino que también ayuda con la digestión y la hidratación. Mi favorito es el té de jengibre con limón después de una comida rica en grasas.',
    timestamp: new Date('2024-06-14T14:15:00'),
    upvotes: 27,
    downvotes: 1,
    commentCount: 9,
    tags: ['bebidas', 'té', 'digestión'],
    aiSummary: 'Recomendación de acompañar comidas keto con té natural para mejorar digestión. El té de jengibre con limón es especialmente bueno después de comidas ricas en grasas.'
  },
  {
    id: 'post-5',
    communityId: 'fitness-tribe',
    userId: 'user-3',
    username: 'FitnessKeto',
    userAvatar: '💪',
    title: 'Rutina de ejercicios en ayunas: Mi experiencia después de 3 meses',
    content: 'Llevo 3 meses entrenando en ayunas mientras hago keto y los resultados han sido increíbles. Mi energía es más estable, he perdido 8kg de grasa manteniendo músculo, y mi resistencia ha mejorado notablemente. Hago cardio moderado y pesas 5 días a la semana. ¿Alguien más entrena en ayunas?',
    timestamp: new Date('2024-06-13T08:00:00'),
    upvotes: 45,
    downvotes: 5,
    commentCount: 18,
    tags: ['ayuno', 'ejercicio', 'resultados'],
    aiSummary: 'Experiencia positiva de entrenar en ayunas con dieta keto durante 3 meses. Resultados incluyen pérdida de grasa, mantenimiento muscular y mejor resistencia.'
  },
  {
    id: 'post-6',
    communityId: 'fitness-tribe',
    userId: 'user-2',
    username: 'NutriExperta',
    userAvatar: '👩‍⚕️',
    title: '¿Cómo calcular correctamente tus macros para gym y keto?',
    content: 'Muchos me preguntan sobre cómo ajustar macros cuando hacen ejercicio intenso en keto. La clave es: 1) Proteína: 1.6-2g por kg de peso corporal, 2) Grasas: 60-70% de calorías totales, 3) Carbos: <20g netos. Si haces mucho ejercicio, puedes ajustar proteína ligeramente. ¿Qué estrategia usan ustedes?',
    timestamp: new Date('2024-06-12T15:30:00'),
    upvotes: 62,
    downvotes: 3,
    commentCount: 24,
    tags: ['macros', 'nutrición', 'gym'],
    aiSummary: 'Guía para calcular macronutrientes en dieta keto con ejercicio intenso. Énfasis en proteína adecuada para mantenimiento muscular.'
  },
  {
    id: 'post-7',
    communityId: 'healthy-mind',
    userId: 'user-5',
    username: 'MamáKeto',
    userAvatar: '👩‍👧',
    title: 'Cómo mantener la motivación cuando no ves resultados inmediatos',
    content: 'Estoy en mi semana 4 de keto y aunque me siento mejor, la báscula no ha cambiado mucho. Me estaba desanimando hasta que medí mis centímetros y descubrí que he perdido 6cm de cintura. Recuerden: el peso no es todo. Tomen medidas, fotos, y enfóquense en cómo se sienten.',
    timestamp: new Date('2024-06-11T19:45:00'),
    upvotes: 78,
    downvotes: 2,
    commentCount: 31,
    tags: ['motivación', 'progreso', 'mindset'],
    aiSummary: 'Importante mensaje sobre medir progreso más allá del peso. Las medidas corporales y cómo te sientes son indicadores más confiables del éxito en keto.'
  },
  {
    id: 'post-8',
    communityId: 'noticias',
    userId: 'user-2',
    username: 'NutriExperta',
    userAvatar: '👩‍⚕️',
    title: 'Nuevo estudio: Keto y salud cardiovascular - Resultados sorprendentes',
    content: 'Acaba de publicarse un estudio en una revista médica reconocida mostrando que la dieta keto bien formulada puede mejorar marcadores cardiovasculares en personas con síndrome metabólico. Mejoras en triglicéridos, HDL y presión arterial. Link al estudio en los comentarios.',
    timestamp: new Date('2024-06-10T10:00:00'),
    upvotes: 94,
    downvotes: 8,
    commentCount: 42,
    tags: ['estudio', 'salud', 'cardiovascular'],
    aiSummary: 'Nuevo estudio científico muestra beneficios cardiovasculares de la dieta keto en personas con síndrome metabólico, incluyendo mejoras en lípidos y presión arterial.'
  }
];

// Mock forum comments (matching the reference image conversation style)
export const forumComments: ForumComment[] = [
  // Comments for post-1 (ensaladas)
  {
    id: 'comment-1',
    postId: 'post-1',
    userId: 'user-3',
    username: 'FitnessKeto',
    userAvatar: '💪',
    content: '¡Sí, claro! Es muy buena, ¿me puedes entregar un postre de limón? Sal, si, sal, eso tomaría algunos minutos.',
    timestamp: new Date('2024-06-15T10:45:00'),
    upvotes: 12,
    downvotes: 0
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    userId: 'user-5',
    username: 'MamáKeto',
    userAvatar: '👩‍👧',
    content: 'Es genial, también te puedo recomendar un snack con tortillas integrales, muy bueno. Súper fácil y delicioso.',
    timestamp: new Date('2024-06-15T11:00:00'),
    upvotes: 15,
    downvotes: 1
  },
  {
    id: 'comment-3',
    postId: 'post-1',
    userId: 'user-4',
    username: 'ChefSaludable',
    userAvatar: '👨‍🍳',
    content: 'Te queda tiempo, acompaña con un té natural. Siempre es un plus.',
    timestamp: new Date('2024-06-15T11:30:00'),
    upvotes: 9,
    downvotes: 0
  },
  // Comments for post-5 (fitness)
  {
    id: 'comment-4',
    postId: 'post-5',
    userId: 'user-2',
    username: 'NutriExperta',
    userAvatar: '👩‍⚕️',
    content: '¡Excelentes resultados! Es importante mencionar que el ayuno intermitente no es para todos. Escuchen a su cuerpo y consulten con un profesional si tienen dudas.',
    timestamp: new Date('2024-06-13T09:15:00'),
    upvotes: 18,
    downvotes: 1
  },
  {
    id: 'comment-5',
    postId: 'post-5',
    userId: 'user-4',
    username: 'ChefSaludable',
    userAvatar: '👨‍🍳',
    content: 'Yo también entreno en ayunas. Mi consejo: empieza gradualmente. Los primeros días pueden ser difíciles, pero tu cuerpo se adapta.',
    timestamp: new Date('2024-06-13T10:30:00'),
    upvotes: 14,
    downvotes: 0
  },
  // Comments for post-7 (motivación)
  {
    id: 'comment-6',
    postId: 'post-7',
    userId: 'user-3',
    username: 'FitnessKeto',
    userAvatar: '💪',
    content: '¡Exacto! Yo tardé 6 semanas en ver cambios en la báscula, pero mi ropa me quedaba diferente desde la semana 2. No se desanimen.',
    timestamp: new Date('2024-06-11T20:00:00'),
    upvotes: 22,
    downvotes: 0
  },
  {
    id: 'comment-7',
    postId: 'post-7',
    userId: 'user-2',
    username: 'NutriExperta',
    userAvatar: '👩‍⚕️',
    content: 'Como nutricionista, siempre digo: el peso es solo un número. La composición corporal, energía, y salud metabólica son mucho más importantes.',
    timestamp: new Date('2024-06-11T21:00:00'),
    upvotes: 35,
    downvotes: 1
  }
];

// Helper function to get posts by community
export function getPostsByCommunity(communityId: string): ForumPost[] {
  return forumPosts
    .filter(post => post.communityId === communityId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Helper function to get comments by post
export function getCommentsByPost(postId: string): ForumComment[] {
  return forumComments
    .filter(comment => comment.postId === postId && !comment.parentId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Helper function to get user
export function getUserById(userId: string): ForumUser | undefined {
  return forumUsers.find(user => user.id === userId);
}
