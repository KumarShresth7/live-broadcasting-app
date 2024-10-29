'use client'
import Link from "next/link";
import { useRouter, } from "next/navigation";
import {useState} from 'react'

export default function Home() {
  const [isBroadcaster, setIsBroadcaster] = useState(null); // State to track role
  const router = useRouter(); // For navigation

  const handleRoleSelection = (role) =>{
    setIsBroadcaster(role === "broadcaster");
    // Redirect based on the role selected
    if (role === "broadcaster") {
      router.push("/stream/broadcaster"); // Redirect to broadcaster page
    } else {
      router.push("/stream/viewer"); // Redirect to viewer page
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-3">
      <h1 className="text-2xl font-bold mb-4">Welcome to Live Broadcasting App</h1>
      <p className="text-xl font-semibold mb-4">Explore live streams and channels</p>

      {/* Role selection buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className="px-4 py-2 border rounded bg-blue-500 text-white"
          onClick={() => handleRoleSelection("broadcaster")}
        >
          Enter as Broadcaster
        </button>
        <button
          className="px-4 py-2 border rounded bg-green-500 text-white"
          onClick={() => handleRoleSelection("viewer")}
        >
          Enter as Viewer
        </button>
      </div>

      {/* Stream previews can go here */}
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
