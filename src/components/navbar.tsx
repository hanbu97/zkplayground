// components/Navbar.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <nav className="border-b">
            <div className="container mx-auto flex justify-between items-center py-4">
                <Link href="/" className="text-2xl font-bold">
                    ZKPlayground
                </Link>
                <ul className="flex space-x-4">
                    <li>
                        <Button variant="ghost" asChild>
                            <Link href="/">Home</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" asChild>
                            <Link href="/resources">Resources</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" asChild>
                            <Link href="/tutorials">Tutorials</Link>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar