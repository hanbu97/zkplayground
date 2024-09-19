// components/ResourceCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from 'lucide-react';

type ResourceCardProps = {
    name: string;
    link: string;
    icon: string;
    description: string;
    keywords: string[];
};

const IconComponent: React.FC<{ name: string }> = ({ name }) => {
    const Icon = Icons[name as keyof typeof Icons] as React.ElementType;
    return Icon ? <Icon className="h-6 w-6" /> : <Icons.HelpCircle className="h-6 w-6" />;
};

const ResourceCard: React.FC<ResourceCardProps> = ({ name, link, icon, description, keywords }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <IconComponent name={icon} />
                        <CardTitle>{name}</CardTitle>
                    </div>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, kidx) => (
                            <Badge key={kidx} variant="secondary">{keyword}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </a>
    );
};

export default ResourceCard;