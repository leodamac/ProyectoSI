/**
 * Contextual Cards Component
 * Displays rich cards for products, nutritionists, and forum posts
 * Triggered by AI responses
 */

'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Calendar, Star, MapPin, MessageCircle, ThumbsUp, ExternalLink } from 'lucide-react';
import { Nutritionist } from '@/types';

interface ProductCard {
  id: string;
  name: string;
  description: string;
  price: number;
  nutritionInfo: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
  category: string;
}

interface ForumPostCard {
  id: string;
  title: string;
  username: string;
  aiSummary?: string;
  upvotes: number;
  commentCount: number;
}

interface ContextualCardsProps {
  type: 'product' | 'nutritionist' | 'forum';
  data: unknown;
  onAction?: (action: string, data: unknown) => void;
}

export default function ContextualCards({ type, data, onAction }: ContextualCardsProps) {
  if (type === 'product') {
    const products = data as ProductCard[];
    return <ProductCards products={products} onAddToCart={(product) => onAction?.('add-to-cart', product)} />;
  }

  if (type === 'nutritionist') {
    const nutritionist = data as Nutritionist;
    return <NutritionistCard nutritionist={nutritionist} onSchedule={() => onAction?.('schedule', nutritionist)} />;
  }

  if (type === 'forum') {
    const posts = data as ForumPostCard[];
    return <ForumCards posts={posts} onView={(post) => onAction?.('view-post', post)} />;
  }

  return null;
}

// Product Cards Component
function ProductCards({ products, onAddToCart }: { products: ProductCard[]; onAddToCart?: (product: ProductCard) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex-shrink-0 w-64 snap-start"
        >
          <div className="bg-white rounded-xl border-2 border-emerald-200 p-4 hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-gray-900 mb-1 text-sm line-clamp-1">{product.name}</h4>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">{product.nutritionInfo.calories} cal</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{product.nutritionInfo.carbs}g carbs</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
              <button
                onClick={() => onAddToCart?.(product)}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-xs font-medium"
              >
                <ShoppingCart className="w-3 h-3" />
                <span>Agregar</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Nutritionist Card Component
function NutritionistCard({ nutritionist, onSchedule }: { nutritionist: Nutritionist; onSchedule?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-4"
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">{nutritionist.image}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 mb-1">{nutritionist.name}</h4>
          <p className="text-sm text-gray-700 mb-2">{nutritionist.specialty}</p>
          
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{nutritionist.rating}</span>
              <span>({nutritionist.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{nutritionist.experience} años</span>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">📜 Certificaciones:</p>
            <ul className="text-xs text-gray-700 space-y-0.5">
              {nutritionist.certifications.slice(0, 2).map((cert, i) => (
                <li key={i} className="line-clamp-1">• {cert}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-blue-600">${nutritionist.price} USD/sesión</span>
            <button
              onClick={onSchedule}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              <Calendar className="w-4 h-4" />
              Agendar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Forum Cards Component
function ForumCards({ posts, onView }: { posts: ForumPostCard[]; onView?: (post: ForumPostCard) => void }) {
  return (
    <div className="space-y-2">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onView?.(post)}
        >
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{post.title}</h4>
              {post.aiSummary && (
                <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                  🤖 <span className="font-medium">IA Resume:</span> {post.aiSummary}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="font-medium">{post.username}</span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{post.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{post.commentCount}</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Location Picker Component
export function LocationRequestCard({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4"
    >
      <div className="flex items-start gap-3">
        <MapPin className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2">Solicitud de Ubicación</h4>
          <p className="text-sm text-gray-700 mb-4">
            Para mostrarte nutricionistas cercanos, necesitamos acceso a tu ubicación. Tus datos son privados y solo se usan para esta función.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
            >
              Permitir
            </button>
            <button
              onClick={onDecline}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
