'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { forumCommunities } from '@/data/forum';
import { useForum } from '@/context/ForumContext';
import { ForumPost } from '@/types';
import { 
  ArrowLeft, Users, MessageSquare, TrendingUp, ThumbsUp, 
  ThumbsDown, Send, Sparkles, Clock, PlusCircle 
} from 'lucide-react';

export default function CommunityPage() {
  const params = useParams();
  const communityId = params.communityId as string;
  const { posts, upvotePost, downvotePost, createPost, currentUser } = useForum();
  
  const community = forumCommunities.find(c => c.id === communityId);
  const [communityPosts, setCommunityPosts] = useState<ForumPost[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get posts for this community
    const filteredPosts = posts.filter(p => p.communityId === communityId);
    setCommunityPosts(filteredPosts);
  }, [posts, communityId]);

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Comunidad no encontrada</h1>
          <Link href="/foro" className="text-purple-600 hover:underline">
            Volver al foro
          </Link>
        </div>
      </div>
    );
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    setIsSubmitting(true);
    try {
      await createPost({
        communityId: community.id,
        title: newPostTitle,
        content: newPostContent,
        tags: []
      });
      
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    return `hace ${diffDays}d`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Community Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/foro"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a comunidades
          </Link>

          <div 
            className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8"
            style={{ 
              backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect fill="${encodeURIComponent(community.color)}" width="100" height="100" opacity="0.1"/></svg>')`,
              backgroundSize: 'cover'
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shadow-md"
                  style={{ backgroundColor: community.color }}
                >
                  {community.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {community.name}
                  </h1>
                  <p className="text-lg text-gray-600">{community.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {community.memberCount.toLocaleString()} miembros
                </span>
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {communityPosts.length} publicaciones
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top {community.category}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Summary Banner */}
        <motion.div
          className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">IA Asistente del Foro</h3>
              <p className="text-sm text-gray-700">
                Pregunta al chatbot sobre temas discutidos en esta comunidad. La IA puede resumir conversaciones y responder basándose en las experiencias compartidas aquí.
              </p>
            </div>
            <Link 
              href={`/chat-ia?context=foro-${communityId}`}
              className="flex-shrink-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Preguntar
            </Link>
          </div>
        </motion.div>

        {/* New Post Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {!showNewPost ? (
            <button
              onClick={() => setShowNewPost(true)}
              className="w-full bg-white border-2 border-dashed border-purple-300 rounded-xl p-4 text-left hover:border-purple-400 hover:bg-purple-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{currentUser.avatar}</div>
                <div className="flex-1">
                  <p className="text-gray-500 group-hover:text-purple-600">
                    ¿Qué quieres compartir con {community.name}?
                  </p>
                </div>
                <PlusCircle className="w-6 h-6 text-purple-400 group-hover:text-purple-600" />
              </div>
            </button>
          ) : (
            <form onSubmit={handleCreatePost} className="bg-white border-2 border-purple-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{currentUser.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900">{currentUser.username}</p>
                  <p className="text-sm text-gray-500">Publicando en {community.name}</p>
                </div>
              </div>
              
              <input
                type="text"
                placeholder="Título de tu publicación"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                required
              />
              
              <textarea
                placeholder="¿Qué quieres compartir?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] resize-y"
                required
              />
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewPost(false);
                    setNewPostTitle('');
                    setNewPostContent('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Posts List */}
        <div className="space-y-4">
          {communityPosts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aún no hay publicaciones
              </h3>
              <p className="text-gray-600 mb-6">
                Sé el primero en compartir algo con esta comunidad
              </p>
              <button
                onClick={() => setShowNewPost(true)}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <PlusCircle className="w-5 h-5" />
                Crear primera publicación
              </button>
            </div>
          ) : (
            communityPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              >
                <Link href={`/foro/${communityId}/${post.id}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-purple-200 cursor-pointer group">
                    <div className="flex gap-4">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            upvotePost(post.id);
                          }}
                          className="text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          <ThumbsUp className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-lg text-gray-700">
                          {post.upvotes - post.downvotes}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            downvotePost(post.id);
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <ThumbsDown className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{post.userAvatar}</span>
                          <span className="font-semibold text-gray-900">{post.username}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(post.timestamp)}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-gray-700 mb-3 line-clamp-3">
                          {post.content}
                        </p>

                        {/* AI Summary */}
                        {post.aiSummary && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-emerald-800 mb-1">Resumen IA</p>
                                <p className="text-sm text-gray-700">{post.aiSummary}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {post.commentCount} comentarios
                          </span>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
