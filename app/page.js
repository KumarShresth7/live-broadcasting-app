import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-3">
      <h1 className="text-2xl font-bold mb-4">Welcome to Live Broadcasting App</h1>
      <p className="text-xl font-semibold mb-4">Explore live streams and channels</p>
      {/* Stream previews will go here */}
      <ul>
        <li>
          <Link href="/stream/1">Stream 1</Link>
        </li>
        <li>
          <Link href="/stream/2">Stream 2</Link>
        </li>
      </ul>
    </div>
  );
}
