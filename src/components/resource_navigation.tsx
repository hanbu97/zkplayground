// components/ResourceNavigation.tsx
import React, { useState } from 'react';
import * as Icons from 'lucide-react';

type NavigationItem = {
    name: string;
    link: string;
    icon: string;
    description: string;
    keywords: string[];
};

type Subcategory = {
    name: string;
    items: NavigationItem[];
};

type Category = {
    name: string;
    icon: string;
    subcategories: Subcategory[];
};

type ResourceNavigationProps = {
    categories: Category[];
    onSelectSubcategory: (categoryIndex: number, subcategoryIndex: number) => void;
};

const IconComponent: React.FC<{ name: string }> = ({ name }) => {
    const Icon = Icons[name as keyof typeof Icons] as React.ElementType;
    return Icon ? <Icon className="h-5 w-5" /> : <Icons.HelpCircle className="h-5 w-5" />;
};

// const ResourceNavigation: React.FC<ResourceNavigationProps> = ({ categories, onSelectSubcategory }) => {
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
//                             {category.subcategories.map((subcategory, subcategoryIndex) => (
//                                 <button
//                                     key={subcategoryIndex}
//                                     onClick={() => onSelectSubcategory(categoryIndex, subcategoryIndex)}
//                                     className="block w-full text-left px-6 py-2 hover:bg-gray-100 transition-colors"
//                                 >
//                                     {subcategory.name}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </nav>
//     );
// };
const ResourceNavigation: React.FC<ResourceNavigationProps> = ({ categories, onSelectSubcategory }) => {
    const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

    return (
        <nav className="w-64 h-screen overflow-y-auto border-r">
            {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                    <button
                        onClick={() => {
                            setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex);
                            // onSelectSubcategory(categoryIndex); // 默认展示第一个子分类
                            onSelectSubcategory(categoryIndex, 0); // 默认选择第一个子分类
                        }}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                        <IconComponent name={category.icon} />
                        <span className="ml-2 font-semibold">{category.name}</span>
                    </button>
                    {expandedCategory === categoryIndex && (
                        <div>
                            {category.subcategories.map((subcategory, subcategoryIndex) => (
                                <button
                                    key={subcategoryIndex}
                                    onClick={() => onSelectSubcategory(categoryIndex, subcategoryIndex)}
                                    className="block w-full text-left px-6 py-2 hover:bg-gray-100 transition-colors"
                                >
                                    {subcategory.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
};



export default ResourceNavigation;