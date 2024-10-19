"use client";
import React, { useState } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from '@/components/ui/button';

interface ExperienceRecorderProps {
  accessToken: string;
  configurationId?: string; // Make configurationId optional
}

// Define the type for category
interface Category {
  configurationId: string; 
  name: string; 
}

// Define the type for categories object
interface Categories {
  [key: string]: Category;
}

// Categories and their configurations
const categories: Categories = {
  technical: {
    configurationId: '4f2784b0-9f0f-4ed2-af07-4305728106f2', 
    name: "Technical Experience" // Add names for categories
  },
  collaboration: {
    configurationId: 'ac106f87-78ca-47d5-8f46-99420e86678e',
    name: "Collaboration Experience" // Add names for categories
  },
  personalProjects: {
    configurationId: 'e3fec69c-b63e-49fe-9376-5f610f452cfb', 
    name: "Personal Projects"
  },
  problemSolving: {
    configurationId: 'e3fec69c-b63e-49fe-9376-5f610f452cfb', 
    name: "Problem Solving"
  },
  leadership: {
    configurationId: '65676331-4a88-41c8-9c77-296aedff0bef',
    name: "Leadership"
  },
  conflictResolution: {
    configurationId: '526532dc-2e2c-40de-a8e9-5723fc917c1d', 
    name: "Conflict Resolution"
  },
  generalReflection: {
    configurationId: '379b9aa1-070f-4fb1-a20b-bf1e34c6964d',
    name: "General Reflection" 
  },
};

export const ExperienceRecorder: React.FC<ExperienceRecorderProps> = ({ accessToken, configurationId }) => {
  const { connect, disconnect, readyState, messages } = useVoice();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasFinished, setHasFinished] = useState(false); // Track if the experience recording is finished
  const [botResponse, setBotResponse] = useState<string | null>(null); // State to store bot response

  const handleStart = async () => {
    if (selectedCategory) {
      const category = categories[selectedCategory]; // Use selectedCategory to get the category
      if (category) {
        // Prepare the full prompt to send to the model
        const basePrompt = `As a career planner, you have the opportunity to listen to your mentee explain a work-related experience in the category of "${category.name}". Your goal is to document this experience in a way that captures relevant details, especially for future interviews.`;

        try {
          await connect();
          console.log("Session started");

          // Send the full prompt to Hume AI API here
          const response = await sendPromptToHumeAI(basePrompt);
          console.log("Hume AI Response:", response);

          // Display the model's response
          setBotResponse(response.reply); // Assuming the model's reply structure
          setHasFinished(true);

        } catch (error) {
          console.error("Failed to start session", error);
        }
      }
    }
  };

  const sendPromptToHumeAI = async (prompt: string) => {
    const url = "https://api.hume.ai/v1/emotions"; // Example endpoint
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const data = {
      text: prompt,
      language: "en", // Specify the language if needed
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send prompt to Hume AI');
    }
    
    return response.json(); // Return the response JSON
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
        {Object.entries(categories).map(([key, category]) => ( // Change to Object.entries for mapping
          <option key={key} value={key}>{category.name}</option>
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

        {/* Displaying the bot's response */}
        {botResponse && (
          <div className="p-4 bg-blue-100 rounded-lg">
            <div className="font-bold">Bot Response</div>
            <div>{botResponse}</div>
          </div>
        )}
      </div>

      {hasFinished && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h3 className="font-bold">Thank you for sharing!</h3>
          <p>Your experience has been documented. If there's anything else you'd like to share, feel free to express it.</p>
        </div>
      )}
    </div>
  );
};
