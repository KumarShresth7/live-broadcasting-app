import React from "react";
import StreamPlayer from "@/components/StreamPlayer";

export default function StreamPage({ params }) {
  const { streamId } = params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Live Stream: {streamId}</h1>
      {/* Pass isBroadcaster based on the user's role */}
      <StreamPlayer streamId={streamId} isBroadcaster={false} />
    </div>
  );
}
