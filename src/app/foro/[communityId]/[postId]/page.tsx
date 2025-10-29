'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { forumCommunities, getCommentsByPost } from '@/data/forum';
import { useForum } from '@/context/ForumContext';
import { ForumComment } from '@/types';
import { 
  ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, 
  Send, Sparkles, Clock, Share2 
} from 'lucide-react';

export default function PostPage() {
  const params = useParams();
  const communityId = params.communityId as string;
  const postId = params.postId as string;
  
  const { 
    posts, comments, upvotePost, downvotePost, 
    upvoteComment, downvoteComment, createComment, currentUser,
    generateAISummary 
  } = useForum();
  
  const community = forumCommunities.find(c => c.id === communityId);
  const post = posts.find(p => p.id === postId);
  const [postComments, setPostComments] = useState<ForumComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const [aiThreadSummary, setAiThreadSummary] = useState('');

  useEffect(() => {
    // Get comments for this post
    const filteredComments = comments.filter(c => c.postId === postId && !c.parentId);
    setPostComments(filteredComments);
  }, [comments, postId]);

  if (!community || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Publicación no encontrada</h1>
          <Link href="/foro" className="text-purple-600 hover:underline">
            Volver al foro
          </Link>
        </div>
      </div>
    );
  }

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment({
        postId: post.id,
        content: newComment
      });
      
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateThreadSummary = async () => {
    setShowAISummary(true);
    if (aiThreadSummary) return; // Already generated

    // Combine post and comments for summary
    const fullThread = `${post.title}\n\n${post.content}\n\nComentarios:\n${postComments.map(c => c.content).join('\n')}`;
    const summary = await generateAISummary(fullThread);
    setAiThreadSummary(summary);
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/foro" className="hover:text-purple-600">Foro</Link>
          <span>→</span>
          <Link href={`/foro/${communityId}`} className="hover:text-purple-600">{community.name}</Link>
          <span>→</span>
          <span className="text-gray-900 font-medium">Publicación</span>
        </div>

        {/* Community Header (compact) */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/foro/${communityId}`}>
            <div 
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
              style={{ backgroundColor: `${community.color}15` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-sm"
                  style={{ backgroundColor: community.color }}
                >
                  {community.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900">{community.name}</h2>
                  <p className="text-sm text-gray-600">{community.memberCount.toLocaleString()} miembros</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Post Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            backgroundImage: `linear-gradient(to bottom, ${community.color}08, white)`,
          }}
        >
          <div className="p-8">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{post.userAvatar}</span>
              <div>
                <p className="font-bold text-gray-900">{post.username}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(post.timestamp)}
                </p>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* AI Summary of Original Post */}
            {post.aiSummary && (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald-800 mb-1">Resumen IA de la publicación</p>
                    <p className="text-gray-700">{post.aiSummary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
              {/* Votes */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => upvotePost(post.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors group"
                >
                  <ThumbsUp className="w-5 h-5 text-gray-500 group-hover:text-emerald-600" />
                  <span className="font-semibold text-gray-700">{post.upvotes}</span>
                </button>
                <button
                  onClick={() => downvotePost(post.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors group"
                >
                  <ThumbsDown className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
                  <span className="font-semibold text-gray-700">{post.downvotes}</span>
                </button>
              </div>

              {/* Comments Count */}
              <div className="flex items-center gap-2 text-gray-600">
                <MessageSquare className="w-5 h-5" />
                <span className="font-semibold">{postComments.length} comentarios</span>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Compartir</span>
              </button>

              {/* AI Summary Button */}
              <button
                onClick={handleGenerateThreadSummary}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-emerald-700 font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                Resumir Conversación
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Thread Summary */}
        {showAISummary && (
          <motion.div
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-6 mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Resumen IA de la Conversación Completa
                </h3>
                {aiThreadSummary ? (
                  <p className="text-gray-700">{aiThreadSummary}</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                    <p className="text-gray-600">Generando resumen...</p>
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-3">
                  💡 Este resumen es generado por IA analizando la publicación y todos los comentarios.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Comments Section (Chat-style like reference image) */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-purple-600" />
              Comentarios ({postComments.length})
            </h2>
          </div>

          {/* Comments List (Chat-style) */}
          <div className="p-6 max-h-[600px] overflow-y-auto space-y-4">
            {postComments.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No hay comentarios todavía</p>
                <p className="text-sm text-gray-500">Sé el primero en comentar</p>
              </div>
            ) : (
              postComments.map((comment, index) => {
                const isOwnComment = comment.userId === currentUser.id;
                return (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, x: isOwnComment ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`flex gap-3 ${isOwnComment ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                        {comment.userAvatar}
                      </div>
                    </div>

                    {/* Comment Bubble */}
                    <div className={`flex-1 max-w-[80%] ${isOwnComment ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold text-sm ${isOwnComment ? 'text-right' : 'text-left'}`}>
                          {comment.username}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      
                      <div 
                        className={`rounded-2xl px-4 py-3 ${
                          isOwnComment 
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm md:text-base">{comment.content}</p>
                      </div>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => upvoteComment(comment.id)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          {comment.upvotes > 0 && <span>{comment.upvotes}</span>}
                        </button>
                        <button
                          onClick={() => downvoteComment(comment.id)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          {comment.downvotes > 0 && <span>{comment.downvotes}</span>}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* New Comment Form */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <form onSubmit={handleCreateComment} className="flex gap-3 items-end">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                  {currentUser.avatar}
                </div>
              </div>
              
              <div className="flex-1 flex gap-3">
                <textarea
                  placeholder="Escribe tu comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="flex-shrink-0 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-2 ml-13">
              💡 Los comentarios pueden ser resumidos por nuestra IA para ayudar a otros usuarios
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
