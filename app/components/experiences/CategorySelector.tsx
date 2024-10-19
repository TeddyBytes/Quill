// components/experiences/CategorySelector.tsx
import React from 'react';

const categories = [
  { id: 'technical', name: 'Technical Skills & Achievements' },
  { id: 'problem-solving', name: 'Problem Solving & Critical Thinking' },
  { id: 'leadership', name: 'Leadership & Team Management' },
  { id: 'communication', name: 'Communication & Interpersonal Skills' },
  { id: 'project', name: 'Project Management' },
];

interface CategorySelectorProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

export default function CategorySelector({ selectedCategory, setSelectedCategory }: CategorySelectorProps) {
  return (
    <div className="w-full max-w-xs">
      <select
        className="w-full p-2 border border-gray-300 rounded-md bg-white"
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}