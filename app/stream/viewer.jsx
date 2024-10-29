// pages/stream/viewer.jsx
'use client';
import StreamPlayer from "../../components/StreamPlayer";

export default function ViewerPage() {
    const streamId = 1; // Replace with actual stream ID logic

    return (
        <div>
            <h1 className="text-2xl">Viewing Stream</h1>
            <StreamPlayer streamId={streamId} isBroadcaster={false} />
        </div>
    );
}
