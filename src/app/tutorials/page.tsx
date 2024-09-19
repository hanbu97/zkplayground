// app/tutorials/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Tutorials() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">ZK Tutorials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>ZKP Basics</CardTitle>
                        <CardDescription>Learn the fundamentals of Zero-Knowledge Proofs</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Implementing ZKP</CardTitle>
                        <CardDescription>Step-by-step guide to implementing ZKP</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>ZKP in Blockchain</CardTitle>
                        <CardDescription>Explore how ZKP is used in blockchain technology</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}