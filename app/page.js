import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-3">
      <h1 className="text-2xl font-bold mb-4">Welcome to Live Broadcasting App</h1>
      <p>Explore live streams and channels</p>
      {/* Stream previews will go here */}
    </div>
  );
}
