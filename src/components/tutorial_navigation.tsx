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

// const TutorialNavigation: React.FC<TutorialNavigationProps> = ({ categories, onSelectTutorial }) => {
//     const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

//     return (
//         <nav className="w-64 h-screen overflow-y-auto border-r">
//             {categories.map((category, categoryIndex) => (
//                 <div key={categoryIndex}>
//                     <button
//                         onClick={() => setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex)}
//                         className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                     >
//                         <IconComponent name={category.icon} />
//                         <span className="ml-2 font-semibold">{category.name}</span>
//                     </button>
//                     {expandedCategory === categoryIndex && (
//                         <div>
//                             {category.items.map((item, itemIndex) => (
//                                 <button
//                                     key={itemIndex}
//                                     onClick={() => onSelectTutorial(categoryIndex, itemIndex)}
//                                     className="block w-full text-left px-6 py-2 hover:bg-gray-100 transition-colors"
//                                 >
//                                     {item.name}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </nav>
//     );
// };

// export default TutorialNavigation;


const TutorialNavigation: React.FC<TutorialNavigationProps> = ({ categories, onSelectTutorial }) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]));

    const toggleCategory = (categoryIndex: number) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryIndex)) {
                newSet.delete(categoryIndex);
            } else {
                newSet.add(categoryIndex);
            }
            return newSet;
        });
    };

    // return (
    //     <nav className="w-64 h-screen overflow-y-auto border-r bg-gray-50">
    //         <div className="p-4">
    //             {categories.map((category, categoryIndex) => (
    //                 <div key={categoryIndex} className="mb-2">
    //                     <button
    //                         onClick={() => toggleCategory(categoryIndex)}
    //                         className="flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
    //                     >
    //                         <IconComponent name={category.icon} />
    //                         <span className="ml-2 font-semibold">{category.name}</span>
    //                     </button>
    //                     {expandedCategories.has(categoryIndex) && (
    //                         <div className="mt-1 ml-4 border-l-2 border-gray-300">
    //                             {category.items.map((item, itemIndex) => (
    //                                 <button
    //                                     key={itemIndex}
    //                                     onClick={() => onSelectTutorial(categoryIndex, itemIndex)}
    //                                     className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors rounded-md text-sm"
    //                                 >
    //                                     {item.name}
    //                                 </button>
    //                             ))}
    //                         </div>
    //                     )}
    //                 </div>
    //             ))}
    //         </div>
    //     </nav>
    // );
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
                                        onClick={() => onSelectTutorial(categoryIndex, itemIndex)}
                                        className="block w-full text-left px-4 py-2 hover:bg-secondary transition-colors rounded-md text-sm"
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