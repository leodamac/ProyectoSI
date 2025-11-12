# Testing Guide: Professional Greeting Video Feature

## Feature Overview

This feature allows professionals to send a greeting video when accepting appointment requests. The video is pre-uploaded in the "Mago de Oz" (Wizard of Oz) simulation system and is played back when the professional "records" a video.

## Test Scenario

### Actors
- **Leonardo** (user-5): Patient with email `leonardo@gmail.com`, password `leo2024`
- **Dra. María Martínez** (prof-1): Professional with email `dr.martinez@alkadami.com`, password `keto2024`

### Pre-existing Data
Leonardo has already requested an appointment (apt-9) with Dra. María Martínez. This appointment is in "pending" status waiting for professional confirmation.

## Testing Steps

### Step 1: Upload Greeting Video (Mago de Oz)

1. Navigate to: `http://localhost:3000/mago-de-oz`
2. Scroll down to the "Video de Saludo" section
3. Click "Click para subir video" or drag and drop a video file (MP4, MOV, etc.)
4. Verify the video appears in the preview player
5. **Important**: This video is now stored in localStorage and will be used for simulation

**Expected Result**: 
- Green success message: "Video de saludo cargado exitosamente!"
- Video preview visible with play controls
- Delete button available

### Step 2: Login as Professional

1. Navigate to: `http://localhost:3000/login`
2. Enter credentials:
   - Email: `dr.martinez@alkadami.com`
   - Password: `keto2024`
3. Click "Iniciar Sesión"

**Expected Result**:
- Redirected to professional panel
- Bell icon in navigation shows notification badge (1)

### Step 3: View Pending Appointment

1. In the professional panel, you should see the "Pendientes" tab selected
2. Look for Leonardo's appointment (apt-9)
3. Verify the appointment details:
   - Patient: Leonardo
   - Status: Pendiente (yellow badge)
   - Service: Consulta
   - Date/Time displayed
   - Medical history and patient information visible

**Expected Result**:
- Leonardo's appointment is visible with full details
- "Confirmar Cita" button is available

### Step 4: Accept Appointment with Video Greeting

1. Click the "Confirmar Cita" button on Leonardo's appointment
2. A video recorder modal should appear

**Video Recorder Modal**:
- Title: "Grabar Video de Saludo"
- Video preview shows the uploaded video from Mago de Oz
- "Comenzar a Grabar" button (red)
- Instructions about the video being sent to the patient

3. Click "Comenzar a Grabar"
   - Recording indicator appears (red REC with timer)
   - The pre-uploaded video starts playing
   - Timer counts up

4. Click "Detener Grabación" or wait for video to finish
   - Video stops
   - "Recorded Video" state shows with options:
     - "Grabar Nuevamente" button
     - "Enviar Video" button (green)

5. Click "Enviar Video"

**Expected Result**:
- Modal closes
- Appointment status changes to "Confirmada" (green badge)
- Video is attached to the appointment
- Appointment moves to "Próximas" tab

### Step 5: Logout and Login as Patient (Leonardo)

1. Click user menu (top right) → "Cerrar Sesión"
2. Navigate to: `http://localhost:3000/login`
3. Enter Leonardo's credentials:
   - Email: `leonardo@gmail.com`
   - Password: `leo2024`
4. Click "Iniciar Sesión"

**Expected Result**:
- Redirected to home page or dashboard
- **Bell icon shows notification badge (1)** - THIS IS KEY!
- Red pulsing notification indicator

### Step 6: Check Notification

1. Click the bell icon in navigation
2. Notification panel should appear

**Expected Notification Content**:
- Title: "¡Tu cita fue aceptada! 🎉"
- Description: "El profesional te ha enviado un video de saludo"
- Link: "Ver mis citas →"

3. Click "Ver mis citas →"

**Expected Result**:
- Redirected to `/mis-citas` page
- Notification panel closes

### Step 7: View Greeting Video

1. In "Mis Citas" page, find the confirmed appointment with Dra. María Martínez
2. Scroll down to see the appointment details
3. Look for the "Video de Saludo del Profesional" section
   - Green/emerald background
   - Video player with controls
   - **"Nuevo" badge** (red, pulsing) indicating unviewed video
   - Message: "El profesional ha enviado un video de bienvenida..."

4. Click play on the video

**Expected Result**:
- Video plays the greeting message
- "Nuevo" badge disappears after video starts playing
- Video is marked as viewed
- Bell notification badge disappears (notification count becomes 0)

### Step 8: Verify Notification Cleared

1. Click the bell icon again

**Expected Result**:
- No badge on bell icon
- Notification panel shows: "No tienes notificaciones pendientes"

## Technical Details

### Data Flow

1. **Video Upload (Mago de Oz)**:
   - Video file → Blob URL → localStorage key: `mago-de-oz-greeting-video`

2. **Professional Accepts Appointment**:
   - Retrieves video from localStorage
   - Simulates recording by playing pre-uploaded video
   - On send: Updates appointment with `greetingVideoUrl` and status `confirmed`
   - Function: `updateAppointmentStatus(appointmentId, 'confirmed', videoUrl)`

3. **Patient Notification**:
   - Navigation component checks for appointments with:
     - `status === 'confirmed'`
     - `greetingVideoUrl` exists
     - `videoViewed !== true`
   - Count displayed in bell badge
   - Notification message customized for regular users

4. **Video Viewed**:
   - On video play event → `markVideoAsViewed(appointmentId)`
   - Sets `appointment.videoViewed = true`
   - Removes from notification count

### Files Modified

- `src/types/index.ts`: Added `greetingVideoUrl` and `videoViewed` fields
- `src/components/VideoRecorder.tsx`: New component for video recording simulation
- `src/app/mago-de-oz/page.tsx`: Added video upload section
- `src/app/panel-profesional/page.tsx`: Integrated VideoRecorder on appointment confirmation
- `src/data/appointments.ts`: Added `markVideoAsViewed()` function, updated `updateAppointmentStatus()`
- `src/components/Navigation.tsx`: Extended notification system for regular users
- `src/app/mis-citas/page.tsx`: Added video display with view tracking

### localStorage Keys Used

- `mago-de-oz-greeting-video`: Stores the blob URL of the uploaded greeting video
- `mago-de-oz-scripts`: Stores uploaded conversation scripts (existing)

## Edge Cases to Test

1. **No Video Uploaded**: If professional tries to record without video in Mago de Oz
   - Should show message: "No hay video cargado en Mago de Oz..."
   - Cannot start recording

2. **Multiple Appointments**: Leonardo has multiple confirmed appointments with videos
   - Notification count should reflect total unviewed videos
   - Each appointment shows its own video independently

3. **Video Already Viewed**: After viewing once
   - No "Nuevo" badge
   - No notification
   - Video still playable

4. **Professional Changes Video**: Upload new video in Mago de Oz
   - Old video replaced
   - Next confirmation uses new video

## Known Limitations

1. **Browser Compatibility**: Blob URLs work differently across browsers
2. **localStorage Limits**: Large videos may exceed localStorage quota (~5-10MB)
3. **Video Persistence**: Videos are lost if browser cache/localStorage is cleared
4. **Real Implementation**: In production, videos should be uploaded to cloud storage (S3, Cloudinary, etc.)

## Success Criteria

✅ Video can be uploaded in Mago de Oz page
✅ Professional sees video recorder when confirming appointment
✅ Video simulation works (plays pre-uploaded video)
✅ Appointment status updates to confirmed with video attached
✅ Leonardo receives notification (bell badge)
✅ Notification message is clear and specific
✅ Video displays in patient's appointments page
✅ "Nuevo" badge shows for unviewed videos
✅ Video marked as viewed when played
✅ Notification clears after viewing video

## Troubleshooting

### Video won't upload
- Check file format (should be video/*)
- Check file size (try <5MB)
- Check browser console for errors

### Video doesn't play in recorder
- Ensure video was uploaded in Mago de Oz first
- Check localStorage: `localStorage.getItem('mago-de-oz-greeting-video')`
- Refresh page and try again

### Notification doesn't appear
- Verify appointment has both:
  - `status === 'confirmed'`
  - `greetingVideoUrl` is set
  - `videoViewed !== true`
- Check Navigation component is checking user appointments correctly
- Refresh page to trigger notification count update

### Video doesn't mark as viewed
- Check `markVideoAsViewed()` is called in onPlay event
- Verify function updates appointment correctly
- Check browser console for errors

## Notes for Presentation/Demo

1. **Prepare video ahead**: Upload a short, professional greeting video in Mago de Oz before demo
2. **Clear state**: To reset demo, clear localStorage or use incognito window
3. **Emphasize simulation**: Explain this is Wizard of Oz - in production, would use real camera
4. **Show both perspectives**: Demo from both professional and patient viewpoints
5. **Highlight notification flow**: The bell system is key to user experience
