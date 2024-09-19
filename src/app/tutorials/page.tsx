// app/tutorials/page.tsx
'use client';

import { useState, useEffect } from 'react';
import TutorialNavigation from '@/components/tutorial_navigation';
import MarkdownRenderer from '@/components/markdown_renderer';

type TutorialItem = {
    name: string;
    description: string;
    keywords: string[];
    content: string;
};

type TutorialCategory = {
    name: string;
    icon: string;
    items: TutorialItem[];
};

export default function Tutorials() {
    const [categories, setCategories] = useState<TutorialCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedTutorial, setSelectedTutorial] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTutorials() {
            try {
                const response = await fetch('/api/tutorials');
                if (!response.ok) {
                    throw new Error('Failed to fetch tutorials');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // 添加日志
                if (data.length === 0) {
                    setError('No tutorials found');
                } else {
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error loading tutorials:', error);
                setError('Failed to load tutorials');
            }
        }

        loadTutorials();
    }, []);

    const handleSelectTutorial = (categoryIndex: number, tutorialIndex: number) => {
        setSelectedCategory(categoryIndex);
        setSelectedTutorial(tutorialIndex);
    };

    const currentTutorial = categories[selectedCategory]?.items[selectedTutorial];

    return (
        <div className="flex h-screen">
            <TutorialNavigation
                categories={categories}
                onSelectTutorial={handleSelectTutorial}
            />
            <main className="flex-1 p-6 overflow-y-auto">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : currentTutorial ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4">{currentTutorial.name}</h1>
                        <p className="text-gray-600 mb-2">{currentTutorial.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {currentTutorial.keywords.map((keyword, index) => (
                                <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                        <MarkdownRenderer content={currentTutorial.content} />
                    </>
                ) : (
                    <p>Loading tutorials...</p>
                )}
            </main>
        </div>
    );
}