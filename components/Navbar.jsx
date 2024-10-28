// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold">Live Broadcasting App</Link>
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/profile/testuser" className="mr-4">Profile</Link>
      </div>
    </nav>
  );
}
