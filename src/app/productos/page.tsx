'use client';

import { useState } from 'react';
import { sampleProducts, categories } from '@/data/products';
import { Product } from '@/types';
import Navigation from '@/components/Navigation';
import { useCart } from '@/components/CartContext';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<string>('name');
  const { addToCart } = useCart();

  const filteredProducts = sampleProducts.filter(product =>
    selectedCategory === 'todos' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Productos</h1>
          <p className="text-lg text-gray-600">
            Descubre nuestra deliciosa colección de postres saludables
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              <option value="todos">Todos los productos</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Nombre</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-green-100 to-pink-100 flex items-center justify-center text-6xl overflow-hidden">
        {typeof product.image === "string" && product.image.startsWith("/images/") ? (
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
          />
        ) : (
          product.image
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <div className="flex gap-1">
            {product.isVegan && <span className="text-green-600 text-sm">🌱</span>}
            {product.isGlutenFree && <span className="text-blue-600 text-sm">🚫🌾</span>}
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>

        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">
            {product.nutritionInfo.calories} cal | Proteína: {product.nutritionInfo.protein}g
          </div>
          <div className="flex flex-wrap gap-1">
            {product.ingredients.slice(0, 3).map((ingredient, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                {ingredient}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-gray-400 text-xs">+{product.ingredients.length - 3} más</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Agregar al carrito
          </button>
        </div>

        <div className="mt-2 text-right">
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  );
}