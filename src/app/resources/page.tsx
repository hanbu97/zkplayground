// app/resources/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Resources() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">ZK Resources</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Introduction to ZKP</CardTitle>
                        <CardDescription>A beginner&aposs guide to Zero-Knowledge Proofs</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>ZKP Applications</CardTitle>
                        <CardDescription>Explore real-world applications of ZKP</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced ZKP Concepts</CardTitle>
                        <CardDescription>Dive deep into advanced ZKP topics</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}