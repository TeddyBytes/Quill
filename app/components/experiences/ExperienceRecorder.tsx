// components/experiences/ExperienceRecorder.tsx
"use client";
import React, { useState } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from '@/components/ui/button';

interface ExperienceRecorderProps {
  accessToken: string;
  configurationId?: string; // Make configurationId optional
}

// Categories and their follow-up prompts
const categories = [
  { 
    id: 'technical', 
    name: 'Technical Achievement 🔧', 
    basePrompt: "Tell me about a technical achievement you're proud of.",
    followUps: [
      "What technologies were involved?",
      "Was this part of a larger project?",
      "How many users/systems were affected?",
      "What was the outcome?"
    ]
  },
  { 
    id: 'collaboration', 
    name: 'Collaboration 👥', 
    basePrompt: "Describe a significant team collaboration experience.",
    followUps: [
      "How large was the team?",
      "What was your specific role?",
      "Who were the key stakeholders?",
      "How did you ensure everyone was aligned?"
    ]
  },
  { 
    id: 'personal-projects', 
    name: 'Personal Projects 🚀', 
    basePrompt: "Tell me about a significant personal project you worked on.",
    followUps: [
      "What inspired this project?",
      "What problem were you solving?",
      "Why did you choose these technologies?",
      "What did you achieve?"
    ]
  },
  { 
    id: 'problem-solving', 
    name: 'Problem Solving 🧩', 
    basePrompt: "Describe a complex problem you had to solve.",
    followUps: [
      "What made this problem complex?",
      "Who was affected?",
      "What were the constraints?",
      "What were the results?"
    ]
  },
  { 
    id: 'leadership', 
    name: 'Leadership 👑', 
    basePrompt: "Describe a situation where you demonstrated leadership.",
    followUps: [
      "What was the situation?",
      "Who did you lead?",
      "What challenges did you face?",
      "What was the outcome?"
    ]
  },
  { 
    id: 'conflict-resolution', 
    name: 'Conflict Resolution ⚖️', 
    basePrompt: "Describe a conflict situation you helped resolve.",
    followUps: [
      "What was the disagreement about?",
      "Who was involved?",
      "What methods did you use?",
      "How was it resolved?"
    ]
  },
  { 
    id: 'general-reflection', 
    name: 'General Reflection 📝', 
    basePrompt: "Reflect on a significant experience in your career.",
    followUps: [
      "What did you learn from this experience?",
      "How has it shaped your perspective?",
      "What would you do differently?",
      "How did it impact your future decisions?"
    ]
  }
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

      {selectedCategory && (
        <div className="mt-4">
          <h3 className="font-bold">Follow-Up Prompts:</h3>
          <ul className="list-disc pl-5">
            {categories.find(c => c.id === selectedCategory)?.followUps.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}

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
