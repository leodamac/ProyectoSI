'use client';

import React from 'react';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';

export function ChatShell() {
  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <div className="flex flex-col h-[calc(100vh-180px)] min-h-[500px] max-h-[800px] bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">
                Asistente Keto IA
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>En línea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window - Scrollable messages */}
        <ChatWindow />

        {/* Input Area */}
        <ChatInput />
      </div>

      {/* Placeholder for future cards carousel */}
      <div className="mt-6 text-center text-sm text-gray-500">
        {/* Future: Cards carousel will be added here */}
      </div>
    </div>
  );
}
