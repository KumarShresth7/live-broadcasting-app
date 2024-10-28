import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL);

export default function StreamPlayer({ streamId, isBroadcaster }) {
  const videoRef = useRef(null);
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    if (isBroadcaster) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          const newPeer = new SimplePeer({ initiator: true, stream });
          newPeer.on("signal", (signalData) => {
            socket.emit("broadcaster-signal", { streamId, signalData });
          });

          socket.on("viewer-signal", (viewerSignal) => {
            newPeer.signal(viewerSignal);
          });

          setPeer(newPeer);
        });
    } else {
      const newPeer = new SimplePeer();
      newPeer.on("signal", (signalData) => {
        socket.emit("viewer-signal", { streamId, signalData });
      });

      newPeer.on("stream", (remoteStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = remoteStream;
        }
      });

      socket.on("broadcaster-signal", (broadcasterSignal) => {
        newPeer.signal(broadcasterSignal);
      });

      setPeer(newPeer);
    }
    return()=>{
        if(peer) peer.destroy()
    }
  }, [isBroadcaster,streamId]);
  

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isBroadcaster}
        className="w-full h-auto"
      ></video>
    </div>
  );
}
