'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { Download, Smartphone, Monitor, CheckCircle, ArrowRight } from 'lucide-react';

export default function InstalarPage() {
  const [selectedDevice, setSelectedDevice] = useState<'android' | 'ios' | 'desktop'>('android');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <Download className="w-4 h-4 mr-2" />
              Instala la App en tu Dispositivo
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lleva <span className="text-emerald-600">Alkadami Keto</span> Siempre Contigo
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Instala nuestra app en tu teléfono, tablet o PC para acceder sin conexión a internet y tener una experiencia nativa optimizada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Device Selection */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Selecciona tu Dispositivo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedDevice('android')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedDevice === 'android'
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <Smartphone className={`w-10 h-10 mx-auto mb-3 ${
                selectedDevice === 'android' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              <h3 className="font-semibold text-gray-900">Android</h3>
              <p className="text-sm text-gray-600 mt-1">Teléfono o Tablet</p>
            </button>
            <button
              onClick={() => setSelectedDevice('ios')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedDevice === 'ios'
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <Smartphone className={`w-10 h-10 mx-auto mb-3 ${
                selectedDevice === 'ios' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              <h3 className="font-semibold text-gray-900">iOS</h3>
              <p className="text-sm text-gray-600 mt-1">iPhone o iPad</p>
            </button>
            <button
              onClick={() => setSelectedDevice('desktop')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedDevice === 'desktop'
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              <Monitor className={`w-10 h-10 mx-auto mb-3 ${
                selectedDevice === 'desktop' ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              <h3 className="font-semibold text-gray-900">PC/Mac</h3>
              <p className="text-sm text-gray-600 mt-1">Computadora</p>
            </button>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={selectedDevice}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
          >
            {selectedDevice === 'android' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Smartphone className="w-7 h-7 mr-3 text-emerald-600" />
                  Instalar en Android
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Abre Chrome en tu Android</h4>
                      <p className="text-gray-700">
                        Navega a <span className="font-mono bg-gray-100 px-2 py-1 rounded">alkadamiketo.com</span> usando el navegador Chrome.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Toca el menú (⋮)</h4>
                      <p className="text-gray-700">
                        En la esquina superior derecha de Chrome, toca los tres puntos verticales.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Selecciona &quot;Agregar a la pantalla de inicio&quot;</h4>
                      <p className="text-gray-700">
                        O &quot;Instalar aplicación&quot; si aparece esa opción. Se abrirá un diálogo de confirmación.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Confirma la instalación</h4>
                      <p className="text-gray-700">
                        Toca &quot;Instalar&quot; o &quot;Agregar&quot;. ¡Listo! El icono aparecerá en tu pantalla de inicio.
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-emerald-900 mb-1">Ventajas en Android</h5>
                        <ul className="text-sm text-emerald-800 space-y-1">
                          <li>• Acceso sin conexión a internet</li>
                          <li>• Notificaciones push para nuevas recetas</li>
                          <li>• Experiencia de app nativa</li>
                          <li>• Carga más rápida</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedDevice === 'ios' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Smartphone className="w-7 h-7 mr-3 text-emerald-600" />
                  Instalar en iOS (iPhone/iPad)
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Abre Safari en tu iPhone/iPad</h4>
                      <p className="text-gray-700">
                        Navega a <span className="font-mono bg-gray-100 px-2 py-1 rounded">alkadamiketo.com</span> usando Safari (no Chrome).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Toca el botón de Compartir</h4>
                      <p className="text-gray-700">
                        En la parte inferior, toca el icono de compartir (cuadrado con flecha hacia arriba).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Desplázate y selecciona &quot;Agregar a pantalla de inicio&quot;</h4>
                      <p className="text-gray-700">
                        Busca la opción en el menú que aparece. Tiene un icono de un &quot;+&quot; dentro de un cuadrado.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Personaliza y confirma</h4>
                      <p className="text-gray-700">
                        Puedes cambiar el nombre si quieres, luego toca &quot;Agregar&quot; en la esquina superior derecha.
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-1">Ventajas en iOS</h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Acceso sin conexión a internet</li>
                          <li>• Integración con pantalla de inicio</li>
                          <li>• Experiencia como app nativa</li>
                          <li>• Sin ocupar espacio de App Store</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedDevice === 'desktop' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Monitor className="w-7 h-7 mr-3 text-emerald-600" />
                  Instalar en PC/Mac
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Abre Chrome o Edge</h4>
                      <p className="text-gray-700">
                        Navega a <span className="font-mono bg-gray-100 px-2 py-1 rounded">alkadamiketo.com</span> usando Chrome, Edge u otro navegador compatible.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Busca el icono de instalación</h4>
                      <p className="text-gray-700">
                        En la barra de direcciones (derecha), verás un icono de computadora o un símbolo &quot;+&quot;. Haz clic en él.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Haz clic en &quot;Instalar&quot;</h4>
                      <p className="text-gray-700">
                        Aparecerá un diálogo preguntando si quieres instalar la aplicación. Confirma haciendo clic en &quot;Instalar&quot;.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Accede desde tu escritorio</h4>
                      <p className="text-gray-700">
                        La app se instalará y podrás abrirla desde el menú de inicio de Windows o el Launchpad de Mac.
                      </p>
                    </div>
                  </div>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-purple-900 mb-1">Ventajas en PC/Mac</h5>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• Ventana dedicada sin pestañas del navegador</li>
                          <li>• Acceso sin conexión a internet</li>
                          <li>• Integración con el sistema operativo</li>
                          <li>• Atajos de teclado optimizados</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            ¿Por qué Instalar la App?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin Conexión a Internet</h3>
              <p className="text-gray-700">
                Accede a tus recetas favoritas, chatbot y planes nutricionales incluso sin internet.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiencia Nativa</h3>
              <p className="text-gray-700">
                Interfaz optimizada que se siente como una app real descargada de la tienda.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Carga Rápida</h3>
              <p className="text-gray-700">
                Abre la app instantáneamente sin esperar a que cargue el navegador.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Siempre Actualizada</h3>
              <p className="text-gray-700">
                Recibes actualizaciones automáticas sin necesidad de descargar desde una tienda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
