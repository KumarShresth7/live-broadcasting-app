// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">Live Broadcast</Link>
        <div>
          <Link href="/profile/your-username" className="mr-4">Profile</Link>
        </div>
      </nav>
    </header>
  );
}
