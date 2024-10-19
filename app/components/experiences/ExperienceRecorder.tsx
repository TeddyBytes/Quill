// components/experiences/ExperienceRecorder.tsx
"use client";
import React, { useState } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from '@/components/ui/button';

interface ExperienceRecorderProps {
  accessToken: string;
  configurationId?: string; // Make configurationId optional
}

const categories = [
  { id: 'technical', name: 'Technical Skills & Achievements', 
    basePrompt: "Tell me about a technical achievement you're proud of." },
  { id: 'problem-solving', name: 'Problem Solving & Critical Thinking',
    basePrompt: "Describe a complex problem you solved recently." },
  // Add other categories as needed
];

export const ExperienceRecorder: React.FC<ExperienceRecorderProps> = ({ accessToken, configurationId }) => {
  const { connect, disconnect, readyState, messages } = useVoice();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleStart = () => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        connect()
          .then(() => {
            console.log("Session started");
            // Optionally set the user message or handle other setup here
          })
          .catch((error) => {
            console.error("Failed to start session", error);
          });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Record Your Experience</h2>
      
      <select 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        value={selectedCategory || ''}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      {readyState === VoiceReadyState.OPEN ? (
        <Button onClick={disconnect}>End Recording</Button>
      ) : (
        <Button onClick={handleStart} disabled={!selectedCategory}>
          Start Recording
        </Button>
      )}

      <div className="space-y-4 mt-6">
        {messages.map((msg, index) => {
          if (msg.type === "user_message" || msg.type === "assistant_message") {
            return (
              <div key={msg.type + index} className="p-4 bg-gray-100 rounded-lg">
                <div className="font-bold">{msg.message.role}</div>
                <div>{msg.message.content}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
