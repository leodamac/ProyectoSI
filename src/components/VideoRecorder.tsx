/**
 * VideoRecorder Component
 * Simulates video recording by playing a pre-uploaded video from Mago de Oz
 * This is part of the Wizard of Oz simulation system
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, StopCircle, Camera, X, CheckCircle } from 'lucide-react';

interface VideoRecorderProps {
  onVideoRecorded: (videoUrl: string) => void;
  onCancel: () => void;
}

export default function VideoRecorder({ onVideoRecorded, onCancel }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load pre-uploaded video from Mago de Oz localStorage
  const [preUploadedVideo, setPreUploadedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Get video from Mago de Oz storage
    const savedVideo = localStorage.getItem('mago-de-oz-greeting-video');
    if (savedVideo) {
      setPreUploadedVideo(savedVideo);
    }
  }, []);

  useEffect(() => {
    // Auto-play preview when video is loaded
    if (showPreview && preUploadedVideo && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
    }
  }, [showPreview, preUploadedVideo]);

  const startRecording = () => {
    if (!preUploadedVideo) {
      alert('No hay video cargado en Mago de Oz. Por favor, sube un video primero.');
      return;
    }

    setIsRecording(true);
    setShowPreview(false);
    setRecordingTime(0);

    // Play the pre-uploaded video to simulate recording
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Stop video
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // Set the recorded video (which is actually the pre-uploaded video)
    setRecordedVideoUrl(preUploadedVideo);
  };

  const handleSendVideo = () => {
    if (recordedVideoUrl) {
      onVideoRecorded(recordedVideoUrl);
    }
  };

  const handleRetake = () => {
    setRecordedVideoUrl(null);
    setRecordingTime(0);
    setShowPreview(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">
              {recordedVideoUrl ? 'Video Grabado' : isRecording ? 'Grabando...' : 'Grabar Video de Saludo'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Preview/Recording Area */}
        <div className="relative bg-gray-900 aspect-video">
          {!preUploadedVideo ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
              <Camera className="w-16 h-16 mb-4 text-gray-400" />
              <p className="text-lg mb-2">No hay video cargado</p>
              <p className="text-sm text-gray-400">
                Ve a la página de Mago de Oz y sube un video de saludo primero
              </p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={preUploadedVideo}
                className="w-full h-full object-cover"
                playsInline
                muted={showPreview}
                onEnded={stopRecording}
              />
              
              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="text-white font-semibold">REC</span>
                  <span className="text-white">{formatTime(recordingTime)}</span>
                </div>
              )}

              {/* Preview Overlay */}
              {showPreview && !isRecording && !recordedVideoUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Vista previa de la cámara</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4">
          {!recordedVideoUrl ? (
            <>
              {/* Recording Controls */}
              <div className="flex items-center justify-center gap-4">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startRecording}
                    disabled={!preUploadedVideo}
                    className="flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
                  >
                    <Camera className="w-6 h-6" />
                    Comenzar a Grabar
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopRecording}
                    className="flex items-center gap-2 bg-gray-800 text-white px-8 py-4 rounded-full hover:bg-gray-900 transition-colors font-semibold text-lg shadow-lg"
                  >
                    <StopCircle className="w-6 h-6" />
                    Detener Grabación
                  </motion.button>
                )}
              </div>

              {!isRecording && (
                <div className="text-center">
                  <button
                    onClick={onCancel}
                    className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Recorded Video Controls */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetake}
                  className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  <Camera className="w-5 h-5" />
                  Grabar Nuevamente
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendVideo}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  <CheckCircle className="w-5 h-5" />
                  Enviar Video
                </motion.button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Duración: {formatTime(recordingTime)}
                </p>
              </div>
            </>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Nota:</strong> Este video se enviará al paciente junto con la confirmación de la cita.
              Es una excelente manera de comenzar el tratamiento con un saludo personalizado.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
