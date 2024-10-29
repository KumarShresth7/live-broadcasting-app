// pages/stream/broadcaster.jsx
import StreamPlayer from "@/components/StreamPlayer";

export default function BroadcasterPage() {
    const streamId = 1; // Replace with actual stream ID logic

    return (
        <div>
            <h1 className="text-2xl">Broadcasting Stream</h1>
            {<StreamPlayer streamId={streamId} isBroadcaster={true}/>}
        </div>
    );
}
