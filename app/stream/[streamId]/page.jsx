// app/stream/[streamId]/page.jsx
import React from 'react';
import StreamPlayer from '@/components/StreamPlayer';

export default async function StreamPage({ params }) {
  const { streamId } = await params; // Extract streamId from params

  if (!streamId) {
    return <p>Loading stream...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream: {streamId}</h1>
      <StreamPlayer streamId={streamId} isBroadcaster={false} />
    </div>
  );
}
