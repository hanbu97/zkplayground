'use client';

import { useState, useRef, useEffect } from 'react';
import ResourceNavigation from '@/components/resource_navigation';
import ResourceCard from '@/components/resource_card';
import navigationData from '@/data/navigation.json';

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

export default function Resources() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedSubcategory, setSelectedSubcategory] = useState(0);
    const [lastSubcategoryStyle, setLastSubcategoryStyle] = useState<React.CSSProperties>({});
    const contentRef = useRef<HTMLDivElement>(null);
    const subcategoryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mainRef = useRef<HTMLElement>(null);

    const handleSelectSubcategory = (categoryIndex: number, subcategoryIndex: number) => {
        setSelectedCategory(categoryIndex);
        setSelectedSubcategory(subcategoryIndex);
    };

    useEffect(() => {
        const calculateLastSubcategoryHeight = () => {
            if (mainRef.current && contentRef.current && subcategoryRefs.current.length > 0) {
                const mainHeight = mainRef.current.clientHeight;
                const lastSubcategoryTop = subcategoryRefs.current[subcategoryRefs.current.length - 1]?.offsetTop || 0;
                const lastSubcategoryHeight = subcategoryRefs.current[subcategoryRefs.current.length - 1]?.clientHeight || 0;
                const availableHeight = mainHeight - (lastSubcategoryTop - contentRef.current.offsetTop);

                // Remove the +200 to prevent extra space
                const minHeight = Math.max(availableHeight, lastSubcategoryHeight);

                setLastSubcategoryStyle({
                    minHeight: `${minHeight}px`,
                    paddingBottom: '6rem', // Adjust this value as needed
                });
            }
        };

        calculateLastSubcategoryHeight();
        window.addEventListener('resize', calculateLastSubcategoryHeight);

        return () => {
            window.removeEventListener('resize', calculateLastSubcategoryHeight);
        };
    }, [selectedCategory]);

    useEffect(() => {
        if (subcategoryRefs.current[selectedSubcategory] && contentRef.current) {
            const subcategoryElement = subcategoryRefs.current[selectedSubcategory];
            const contentElement = contentRef.current;

            if (subcategoryElement) {
                const topOffset = subcategoryElement.offsetTop - contentElement.offsetTop;

                contentElement.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
        }
    }, [selectedSubcategory]);

    const category = navigationData.categories[selectedCategory];

    return (
        <div className="flex h-screen">
            <ResourceNavigation
                categories={navigationData.categories}
                onSelectSubcategory={handleSelectSubcategory}
            />

            <main ref={mainRef} className="flex-1 flex flex-col overflow-hidden">
                <h1 className="text-3xl font-bold p-6">{category.name}</h1>
                <div ref={contentRef} className="flex-1 overflow-y-auto px-6">
                    {category.subcategories.map((subcategory: Subcategory, index: number) => (
                        <div
                            key={index}
                            ref={(el) => { subcategoryRefs.current[index] = el; }}
                            style={index === category.subcategories.length - 1 ? lastSubcategoryStyle : {}}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-semibold mb-4 pt-4">{subcategory.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {subcategory.items.map((item: NavigationItem, itemIndex: number) => (
                                    <ResourceCard key={itemIndex} {...item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}