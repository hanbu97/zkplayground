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

const ResourceNavigation: React.FC<ResourceNavigationProps> = ({ categories, onSelectSubcategory }) => {
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
        onSelectSubcategory(categoryIndex, 0); // Select the first subcategory when expanding
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
                                {category.subcategories.map((subcategory, subcategoryIndex) => (
                                    <button
                                        key={subcategoryIndex}
                                        onClick={() => onSelectSubcategory(categoryIndex, subcategoryIndex)}
                                        className="block w-full text-left px-4 py-2 hover:bg-secondary transition-colors rounded-md text-sm"
                                    >
                                        {subcategory.name}
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

export default ResourceNavigation;