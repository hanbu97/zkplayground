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
    const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

    return (
        <nav className="w-64 h-screen overflow-y-auto border-r">
            {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                    <button
                        onClick={() => setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex)}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                        <IconComponent name={category.icon} />
                        <span className="ml-2 font-semibold">{category.name}</span>
                    </button>
                    {expandedCategory === categoryIndex && (
                        <div>
                            {category.items.map((item, itemIndex) => (
                                <button
                                    key={itemIndex}
                                    onClick={() => onSelectTutorial(categoryIndex, itemIndex)}
                                    className="block w-full text-left px-6 py-2 hover:bg-gray-100 transition-colors"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default TutorialNavigation;