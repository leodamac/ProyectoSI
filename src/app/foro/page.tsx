'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { forumCommunities } from '@/data/forum';
import { useForum } from '@/context/ForumContext';
import { Users, MessageSquare, Plus, TrendingUp, Sparkles } from 'lucide-react';

export default function ForoPage() {
  const { currentUser, isLoggedIn } = useForum();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comunidad Keto
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Team <span className="text-purple-600">Conversations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Únete a la conversación con miles de personas en su viaje keto. Comparte experiencias, recetas y consejos.
          </p>
          
          {isLoggedIn && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-200 rounded-lg">
              <span className="text-3xl">{currentUser.avatar}</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{currentUser.username}</p>
                <p className="text-sm text-gray-500">{currentUser.karma} karma • {currentUser.postCount} posts</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* AI Assistant Callout */}
        <motion.div
          className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                IA Resumen Inteligente 🤖
              </h3>
              <p className="text-gray-700 mb-3">
                Nuestra IA analiza las conversaciones del foro y puede resumir temas, responder preguntas basadas en experiencias compartidas, y ayudarte a encontrar información relevante.
              </p>
              <Link 
                href="/chat-ia"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Pregunta al Asistente IA
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                {forumCommunities.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">Miembros</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              <span className="text-2xl font-bold text-gray-900">
                {forumCommunities.reduce((sum, c) => sum + c.postCount, 0).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">Publicaciones</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <span className="text-2xl font-bold text-gray-900">
                {forumCommunities.length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Comunidades</p>
          </div>
        </motion.div>

        {/* Communities List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {forumCommunities.map((community, index) => (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
            >
              <Link href={`/foro/${community.id}`}>
                <div
                  className="group bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 cursor-pointer"
                  style={{ backgroundColor: `${community.color}15` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: community.color }}
                    >
                      {community.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {community.name}
                      </h2>
                      <p className="text-gray-600 mb-2">{community.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {community.memberCount.toLocaleString()} miembros
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {community.postCount.toLocaleString()} posts
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600 font-bold">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Create Community Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
            onClick={() => alert('Función de crear comunidad próximamente. Por ahora, contacta a los moderadores.')}
          >
            <Plus className="w-5 h-5" />
            Crea una nueva comunidad
          </button>
        </motion.div>
      </div>
    </div>
  );
}
