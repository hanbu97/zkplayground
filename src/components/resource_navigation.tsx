
// components/ResourceNavigation.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    icon: string;
    items: NavigationItem[];
};

type Category = {
    name: string;
    icon: string;
    subcategories: Subcategory[];
};

type ResourceNavigationProps = {
    categories: Category[];
};

const IconComponent: React.FC<{ name: string }> = ({ name }) => {
    const Icon = Icons[name as keyof typeof Icons] as React.ElementType;
    return Icon ? <Icon className="h-5 w-5" /> : <Icons.HelpCircle className="h-5 w-5" />;
};



const ResourceNavigation: React.FC<ResourceNavigationProps> = ({ categories }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {categories.map((category, categoryIndex) => (
                <AccordionItem value={`category-${categoryIndex}`} key={categoryIndex}>
                    <AccordionTrigger className="text-xl font-semibold">
                        <div className="flex items-center gap-2">
                            <IconComponent name={category.icon} />
                            {category.name}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {category.subcategories.map((subcategory, subcategoryIndex) => (
                            <Accordion type="single" collapsible className="w-full ml-4" key={subcategoryIndex}>
                                <AccordionItem value={`subcategory-${categoryIndex}-${subcategoryIndex}`}>
                                    <AccordionTrigger className="text-lg font-medium">
                                        <div className="flex items-center gap-2">
                                            <IconComponent name={subcategory.icon} />
                                            {subcategory.name}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid gap-4 ml-4">
                                            {subcategory.items.map((item, itemIndex) => (
                                                <Card key={itemIndex}>
                                                    <CardHeader>
                                                        <div className="flex items-center gap-2">
                                                            <IconComponent name={item.icon} />
                                                            <CardTitle>{item.name}</CardTitle>
                                                        </div>
                                                        <CardDescription>{item.description}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {item.keywords.map((keyword, kidx) => (
                                                                <Badge key={kidx} variant="secondary">{keyword}</Badge>
                                                            ))}
                                                        </div>
                                                        <Link href={item.link} className="text-blue-500 hover:underline">
                                                            Learn more
                                                        </Link>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default ResourceNavigation;
