import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              InterviewPrep AI
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/practice" className="text-sm font-medium hover:text-primary">
                Practice Interviews
              </Link>
              <Link href="/questions" className="text-sm font-medium hover:text-primary">
                Question Bank
              </Link>
              <Link href="/feedback" className="text-sm font-medium hover:text-primary">
                Performance Analysis
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <Button variant="outline" asChild>
              <Link href="/profile">Profile</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
} 