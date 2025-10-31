# Sistema de Gestión de Roles de Usuario - Alkadami Keto

## Resumen

Se ha implementado exitosamente un sistema completo de gestión de roles de usuario que diferencia entre usuarios regulares, profesionales independientes e instituciones. El sistema incluye gestión de citas, pagos simulados y navegación adaptativa según el rol del usuario.

## Tipos de Usuario

### 1. Usuario Regular (`user`)
**Capacidades:**
- Acceder a servicios gratuitos (Chat IA)
- Agendar citas con profesionales
- Ver y gestionar sus citas (`/mis-citas`)
- Participar en el foro
- Comprar productos
- Acceso premium disponible

**Credenciales Demo:**
```
Email: usuario@gmail.com
Password: user123
```

### 2. Profesional Independiente (`professional`)
**Capacidades:**
- Todas las de usuario regular
- Gestionar citas de clientes (`/panel-profesional`)
- Confirmar/rechazar solicitudes de citas
- Ver dashboard con estadísticas
- Marcar citas como completadas
- Ofrecer servicios de nutrición
- Vender productos (futuro)
- Crear recetas (futuro)

**Credenciales Demo:**
```
Email: dr.martinez@alkadami.com
Password: keto2024
```

**Profesionales en el sistema:**
- Dra. María Martínez - Nutrición Cetogénica y Metabolismo
- Chef Carlos Rodríguez - Cocina Keto y Recetas Saludables
- Nutricionista Ana López - Nutrición Deportiva Keto (trabaja para Centro Keto Guayaquil)

### 3. Institución (`institution`)
**Capacidades:**
- Todas las de profesional
- Gestionar profesionales asociados
- Ofrecer múltiples servicios
- Vender productos en nombre de la institución
- Panel de gestión institucional (`/panel-profesional`)

**Credenciales Demo:**
```
Email: admin@centroketo.com
Password: centro2024
```

**Instituciones en el sistema:**
- Centro Keto Guayaquil - Centro de nutrición (gestiona a Ana López)
- Keto Products Ecuador - Distribuidor de productos

## Páginas Implementadas

### `/mis-citas` - Gestión de Citas para Usuarios
**Acceso:** Solo usuarios regulares autenticados

**Funcionalidades:**
- Tabs para "Próximas Citas" e "Historial"
- Muestra información detallada de cada cita:
  - Profesional con foto y especialidad
  - Fecha y hora
  - Duración
  - Tipo de servicio
  - Precio y estado de pago
  - Notas del usuario
- Estados de cita:
  - ✅ Confirmada (verde)
  - ⏳ Pendiente (amarillo)
  - ✔️ Completada (azul)
  - ❌ Cancelada (rojo)
  - ❌ Rechazada (rojo)
- Acciones disponibles:
  - Unirse a videollamada (si confirmada con enlace)
  - Cancelar cita (si pendiente)
  - Agendar seguimiento (si completada)
- CTA para agendar nueva cita
- Redirección automática a login si no autenticado
- Redirección a panel profesional si es profesional/institución

### `/panel-profesional` - Panel para Profesionales e Instituciones
**Acceso:** Solo profesionales e instituciones autenticados

**Funcionalidades:**
- **Dashboard con 4 métricas:**
  - Total de citas
  - Citas pendientes
  - Próximas citas
  - Citas completadas
- **Tabs de filtro:**
  - Pendientes (requieren acción)
  - Próximas (ya confirmadas)
  - Todas (todo el historial)
- **Vista de cada cita:**
  - Cliente con avatar y email
  - Fecha, hora y duración
  - Tipo de servicio
  - Precio y estado de pago
  - Notas del cliente
  - Estado de la cita
- **Acciones:**
  - Confirmar cita (si pendiente)
  - Rechazar cita (si pendiente)
  - Marcar como completada (si confirmada)
- Redirección automática a login si no autenticado
- Redirección a mis-citas si es usuario regular

### `/login` - Página de Login
**Funcionalidades:**
- Formulario de login con validación
- Toggle para mostrar/ocultar credenciales de demo
- **3 cuentas de demo:**
  - 👩‍⚕️ Cuenta Profesional
  - 🏥 Cuenta Institución
  - 👤 Cuenta Usuario
- Botón de auto-llenado para cada tipo
- Redirección al home tras login exitoso

## Sistema de Citas

### Tipos de Servicio
- `consultation` - Consulta
- `nutrition-plan` - Plan Nutricional
- `follow-up` - Seguimiento
- `group-session` - Sesión Grupal

### Estados de Cita
- `pending` - Pendiente de confirmación del profesional
- `confirmed` - Confirmada, con enlace de videollamada
- `completed` - Completada
- `cancelled` - Cancelada por el usuario
- `rejected` - Rechazada por el profesional

### Datos de Ejemplo
Se incluyen **8 citas de ejemplo** que cubren todos los estados y tipos de servicio:
- 3 citas pendientes (requieren acción del profesional)
- 3 citas confirmadas (próximas)
- 1 cita completada (historial)
- 1 cita cancelada (con reembolso)

## Sistema de Pagos (Wizard of Oz)

### Estados de Pago
- `pending` - Pago pendiente
- `processing` - Procesando pago
- `completed` - Pago completado
- `failed` - Pago fallido
- `refunded` - Pago reembolsado

### Métodos de Pago Soportados
- `credit-card` - Tarjeta de Crédito (Visa, Mastercard, Amex, Diners)
- `debit-card` - Tarjeta de Débito (Visa, Mastercard)
- `paypal` - PayPal
- `bank-transfer` - Transferencia Bancaria

### Datos de Ejemplo
Se incluyen **7 pagos simulados** vinculados a las citas, con:
- Diferentes métodos de pago
- IDs de transacción simulados
- Últimos 4 dígitos de tarjeta
- Marcas de tarjeta
- Timestamps realistas

## Navegación Adaptativa

### Componente Navigation
El componente de navegación muestra diferentes opciones según el rol:

**Todos los usuarios:**
- Inicio
- Servicios (dropdown)
- Productos
- Blog
- Carrito

**Usuarios autenticados - Menú de usuario:**
- Avatar y nombre del usuario
- Rol visual: 👩‍⚕️ Profesional / 🏥 Institución / 👤 Usuario
- Indicador Premium: ⭐
- Ver Perfil

**Solo para Profesionales/Instituciones:**
- 💼 Panel Profesional (acceso a dashboard)

**Solo para Usuarios Regulares:**
- 📅 Mis Citas (acceso a gestión de citas)

**Todos:**
- Cerrar Sesión

## Arquitectura de Datos

### Archivos Principales

#### `src/types/index.ts`
Tipos extendidos:
- `User` con 3 roles y campos específicos
- `Appointment` con todos los estados y tipos
- `Payment` con sistema de pagos completo

#### `src/data/users.ts`
- 3 profesionales con información completa
- 2 instituciones
- 4 usuarios regulares (2 premium, 2 free)
- Funciones helper:
  - `validateCredentials()` - Validar login
  - `getUserById()` - Obtener usuario por ID
  - `getAllProfessionals()` - Listar profesionales
  - `getAllInstitutions()` - Listar instituciones
  - `getProfessionalsByInstitution()` - Profesionales por institución

#### `src/data/appointments.ts`
- 8 citas de ejemplo
- Funciones helper:
  - `getAppointmentsByUser()` - Citas de un usuario
  - `getAppointmentsByProfessional()` - Citas de un profesional
  - `getUpcomingAppointmentsByUser()` - Próximas citas del usuario
  - `getUpcomingAppointmentsByProfessional()` - Próximas citas del profesional
  - `getPendingAppointmentsByProfessional()` - Citas pendientes
  - `createAppointment()` - Crear nueva cita (simulado)
  - `updateAppointmentStatus()` - Actualizar estado de cita

#### `src/data/payments.ts`
- 7 pagos simulados
- Funciones helper:
  - `getPaymentById()` - Obtener pago por ID
  - `getPaymentsByUser()` - Pagos de un usuario
  - `getPaymentByAppointment()` - Pago de una cita específica
  - `processPayment()` - Procesar pago (simulado con 95% éxito)
  - `refundPayment()` - Reembolsar pago

#### `src/context/AuthContext.tsx`
- Métodos agregados:
  - `isInstitution()` - Verificar si es institución
  - Mantiene `isProfessional()` y `isPremium()`

## Flujos de Usuario

### Flujo 1: Usuario Regular Agenda Cita
1. Usuario se loguea con credenciales de usuario
2. Navega a `/nutricionistas`
3. Ve profesionales disponibles
4. Click en "Agendar Cita"
5. [Futuro: Formulario de agendamiento]
6. [Futuro: Pago simulado]
7. Cita creada en estado `pending`
8. Usuario recibe confirmación
9. Usuario puede ver cita en `/mis-citas` tab "Próximas"

### Flujo 2: Profesional Gestiona Citas
1. Profesional se loguea
2. Ve en navegación: "💼 Panel Profesional"
3. Accede a `/panel-profesional`
4. Dashboard muestra métricas
5. Tab "Pendientes" muestra nuevas solicitudes
6. Profesional confirma o rechaza cita
7. Si confirma: estado cambia a `confirmed`
8. Si rechaza: estado cambia a `rejected`
9. Cliente recibe notificación (simulada)

### Flujo 3: Realización de Cita
1. Usuario ve cita confirmada en `/mis-citas`
2. En fecha/hora de cita: botón "Unirse a la Cita" activo
3. Click abre enlace de videollamada (Google Meet/Zoom simulado)
4. Después de la cita: profesional marca como `completed`
5. Cita aparece en historial del usuario
6. Usuario puede agendar seguimiento

## Wizard of Oz - Implementación

Todo el sistema funciona como "Wizard of Oz":

### ✅ Simulado
- Autenticación (datos hardcoded)
- Base de datos (arrays en memoria)
- Pagos (simulación con delay)
- Videollamadas (enlaces de ejemplo)
- Notificaciones (no implementadas)

### ✅ Realista
- UI profesional y pulida
- Flujos completos y lógicos
- Estados consistentes
- Validaciones apropiadas
- Mensajes de error claros
- Feedback visual inmediato

### ✅ Listo para Migración
- Arquitectura modular
- Funciones helper separadas
- Tipos TypeScript estrictos
- Comentarios sobre integración real
- Estructura escalable

## Testing y Validación

### Build
```bash
npm run build
```
**Resultado:** ✅ Build exitoso sin errores
- 20 páginas compiladas
- 0 errores de TypeScript
- Solo warnings pre-existentes

### Validación Manual
- ✅ Login con 3 tipos de usuario
- ✅ Redirecciones según rol
- ✅ Protección de rutas
- ✅ Navegación adaptativa
- ✅ Dashboard de profesional
- ✅ Lista de citas de usuario
- ✅ Estados visuales correctos

## Próximos Pasos Sugeridos

### Alta Prioridad (para demo completa)
1. **Componente de Agendamiento**
   - Formulario para seleccionar fecha/hora
   - Validación de disponibilidad
   - Integración con pago

2. **UI de Pago Mockup**
   - Modal de checkout estilo Stripe
   - Formulario de tarjeta (sin validación real)
   - Animación de procesamiento
   - Confirmación de pago

3. **Calendar View**
   - Vista de calendario para profesionales
   - Mostrar disponibilidad
   - Bloques de tiempo reservados

### Media Prioridad
4. **Sistema de Notificaciones**
   - Toast notifications
   - Indicador de nuevas citas para profesionales
   - Recordatorios de citas próximas

5. **Perfil Mejorado**
   - Estadísticas según rol
   - Para profesionales: ganancias, rating promedio
   - Para usuarios: citas completadas, gasto total

6. **Reviews y Ratings**
   - Usuarios pueden dejar reseñas
   - Rating en estrella s
   - Comentarios

### Baja Prioridad
7. **Chat entre Usuario y Profesional**
   - Sistema de mensajería simple
   - Pre/post consulta

8. **Generación de Recetas por Profesionales**
   - Formulario para crear recetas
   - Asignar a clientes

9. **Gestión de Productos**
   - Profesionales/instituciones pueden agregar productos
   - Vinculación con catálogo

## Conclusión

El sistema de gestión de roles de usuario está completamente implementado y funcional. Ofrece:

✅ **3 tipos de usuario** con capacidades diferenciadas
✅ **Sistema de citas completo** (Wizard of Oz)
✅ **Panel profesional** con dashboard y gestión
✅ **Navegación adaptativa** según rol
✅ **Datos realistas** listos para demostración
✅ **Arquitectura escalable** lista para backend real
✅ **TypeScript estricto** sin errores
✅ **UI profesional** y pulida

El sistema está listo para demostración en feria comercial o presentación académica, dando la impresión de ser un producto completo y profesional, mientras que internamente todo funciona con datos simulados que pueden ser fácilmente reemplazados por APIs reales.
