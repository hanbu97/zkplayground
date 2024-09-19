// components/TutorialNavigation.tsx
import React, { useState } from 'react';
import * as Icons from 'lucide-react';

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

type TutorialNavigationProps = {
    categories: TutorialCategory[];
    onSelectTutorial: (categoryIndex: number, tutorialIndex: number) => void;
};

const IconComponent: React.FC<{ name: string }> = ({ name }) => {
    const Icon = Icons[name as keyof typeof Icons] as React.ElementType;
    return Icon ? <Icon className="h-5 w-5" /> : <Icons.HelpCircle className="h-5 w-5" />;
};

const TutorialNavigation: React.FC<TutorialNavigationProps> = ({ categories, onSelectTutorial }) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]));
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedTutorial, setSelectedTutorial] = useState(0);

    const toggleCategory = (categoryIndex: number) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryIndex)) {
                newSet.delete(categoryIndex);
            } else {
                newSet.add(categoryIndex);
                // Only select first tutorial if this category wasn't previously expanded
                if (!prev.has(categoryIndex)) {
                    setSelectedCategory(categoryIndex);
                    setSelectedTutorial(0);
                    onSelectTutorial(categoryIndex, 0);
                }
            }
            return newSet;
        });
    };

    const handleTutorialClick = (categoryIndex: number, tutorialIndex: number) => {
        setSelectedCategory(categoryIndex);
        setSelectedTutorial(tutorialIndex);
        onSelectTutorial(categoryIndex, tutorialIndex);
    };

    return (
        <nav className="w-64 h-screen overflow-y-auto border-r border-border bg-background text-foreground">
            <div className="p-4">
                {categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-2">
                        <button
                            onClick={() => toggleCategory(categoryIndex)}
                            className="flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                        >
                            <IconComponent name={category.icon} />
                            <span className="ml-2 font-semibold">{category.name}</span>
                        </button>
                        {expandedCategories.has(categoryIndex) && (
                            <div className="mt-1 ml-4 border-l-2 border-border">
                                {category.items.map((item, itemIndex) => (
                                    <button
                                        key={itemIndex}
                                        onClick={() => handleTutorialClick(categoryIndex, itemIndex)}
                                        className={`block w-full text-left px-4 py-2 hover:bg-secondary transition-colors rounded-md text-sm ${selectedCategory === categoryIndex && selectedTutorial === itemIndex
                                            ? 'bg-secondary'
                                            : ''
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default TutorialNavigation;