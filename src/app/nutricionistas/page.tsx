'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { Star, Clock, Award, Languages, Calendar, CheckCircle } from 'lucide-react';
import { nutritionists, nutritionistReviews } from '@/data/nutritionists';
import Link from 'next/link';

export default function NutritionistsPage() {
  const [selectedNutritionist, setSelectedNutritionist] = useState<string | null>(null);

  const getNutritionistReviews = (nutritionistId: string) => {
    return nutritionistReviews.filter(r => r.nutritionistId === nutritionistId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Respaldados por Profesionales Certificados
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nuestros <span className="text-emerald-600">Nutricionistas</span> Keto
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Expertos certificados en nutrición cetogénica listos para transformar tu salud.
              Todos nuestros profesionales cuentan con años de experiencia y certificaciones internacionales.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-gray-700">
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Certificados</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Experiencia Comprobada</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">Seguimiento Personalizado</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nutritionists Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {nutritionists.map((nutritionist, index) => (
              <motion.div
                key={nutritionist.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-6xl">{nutritionist.image}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {nutritionist.name}
                      </h3>
                      <p className="text-emerald-600 font-semibold mb-3">
                        {nutritionist.specialty}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-amber-500 fill-current" />
                          <span className="font-bold text-gray-900">{nutritionist.rating}</span>
                          <span className="text-gray-500 text-sm">({nutritionist.reviewCount} reseñas)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-4 h-4" />
                        <span className="text-sm">{nutritionist.experience} años de experiencia</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {nutritionist.description}
                  </p>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      Certificaciones
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {nutritionist.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Languages className="w-5 h-5 text-emerald-600" />
                      Idiomas
                    </h4>
                    <div className="flex gap-2">
                      {nutritionist.languages.map((lang, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      Disponibilidad
                    </h4>
                    <div className="space-y-2">
                      {nutritionist.availability.map((schedule, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                        >
                          <span className="font-medium text-gray-700">{schedule.day}</span>
                          <span className="text-gray-600">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews Preview */}
                  {getNutritionistReviews(nutritionist.id).length > 0 && (
                    <div className="mb-6">
                      <button
                        onClick={() => setSelectedNutritionist(
                          selectedNutritionist === nutritionist.id ? null : nutritionist.id
                        )}
                        className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                      >
                        <Star className="w-5 h-5" />
                        {selectedNutritionist === nutritionist.id ? 'Ocultar' : 'Ver'} reseñas
                      </button>
                      
                      {selectedNutritionist === nutritionist.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-3"
                        >
                          {getNutritionistReviews(nutritionist.id).map(review => (
                            <div
                              key={review.id}
                              className="bg-gray-50 p-4 rounded-lg border-l-4 border-emerald-500"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                                  ))}
                                </div>
                                <span className="font-semibold text-gray-900">{review.userName}</span>
                                {review.verified && (
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <p className="text-gray-700 italic">&quot;{review.comment}&quot;</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href="/contacto"
                      className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Agendar Cita
                    </Link>
                    {nutritionist.isPremium && (
                      <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-3 rounded-xl font-semibold">
                        <span className="text-2xl">${nutritionist.price}</span>
                        <span className="text-sm">/ consulta</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para Transformar tu Salud?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Agenda tu primera consulta con uno de nuestros nutricionistas certificados
              y comienza tu viaje hacia una vida más saludable.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Contactar Ahora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
