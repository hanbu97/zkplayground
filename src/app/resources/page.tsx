// app/resources/page.tsx
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
    const contentRef = useRef<HTMLDivElement>(null);
    const subcategoryRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleSelectSubcategory = (categoryIndex: number, subcategoryIndex?: number) => {
        setSelectedCategory(categoryIndex);
        setSelectedSubcategory(subcategoryIndex ?? 0); // 如果不传递subcategoryIndex，默认选择第一个
    };

    useEffect(() => {
        if (subcategoryRefs.current[selectedSubcategory] && contentRef.current) {
            const subcategoryElement = subcategoryRefs.current[selectedSubcategory];
            const contentElement = contentRef.current;

            if (subcategoryElement) {
                const topOffset = subcategoryElement.offsetTop - contentElement.offsetTop;
                contentElement.scrollTo({
                    top: topOffset, // 滚动到相对的 top 位置
                    behavior: 'smooth' // 平滑滚动
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

            <main className="flex-1 flex flex-col overflow-hidden">
                <h1 className="text-3xl font-bold p-6">{category.name}</h1>
                <div ref={contentRef} className="flex-1 overflow-y-auto px-6 h-full"> {/* 添加 h-full 确保容器有固定高度 */}
                    {category.subcategories.map((subcategory: Subcategory, index: number) => (
                        <div
                            key={index}
                            ref={(el) => { subcategoryRefs.current[index] = el; }}
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