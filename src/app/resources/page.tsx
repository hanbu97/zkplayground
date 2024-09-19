// app/resources/page.tsx
import ResourceNavigation from "@/components/resource_navigation"

import navigationData from '@/data/navigation.json'


export default function Resources() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">ZK Resources</h1>
            <ResourceNavigation categories={navigationData.categories} />
        </div>
    );
}
