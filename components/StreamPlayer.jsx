// components/StreamPlayer.jsx
'use client'
import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Ensure backend CORS setup allows frontend origin

export default function StreamPlayer({ streamId, isBroadcaster }) {
    const videoRef = useRef(null);
    const [peer, setPeer] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check socket connection status
        socket.on('connect', () => {
            console.log('Connected to signaling server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from signaling server');
        });

        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err);
            setError('Failed to connect to signaling server');
        });
    }, []);

    useEffect(() => {
        if (isBroadcaster) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    
                    const newPeer = new SimplePeer({ initiator: true, stream });

                    newPeer.on('signal', (signalData) => {
                        console.log('Sending broadcaster signal:', signalData);
                        socket.emit('broadcaster-signal', { streamId, signalData });
                    });

                    newPeer.on('connect', () => {
                        console.log('Broadcaster connected to viewer');
                        setIsConnected(true);
                    });

                    newPeer.on('error', (err) => {
                        console.error('Error in broadcaster peer:', err);
                        setError(err.message);
                        setIsConnected(false);
                    });

                    socket.on('viewer-signal', (viewerSignal) => {
                        console.log('Received viewer signal, responding...');
                        newPeer.signal(viewerSignal);
                    });

                    setPeer(newPeer);
                })
                .catch((err) => {
                    console.error('Error accessing media devices:', err);
                    setError(err.message);
                });
        } else {
            const newPeer = new SimplePeer();

            newPeer.on('signal', (signalData) => {
                console.log('Sending viewer signal:', signalData);
                socket.emit('viewer-signal', { streamId, signalData });
            });

            newPeer.on('stream', (remoteStream) => {
                console.log('Received remote stream');
                if (videoRef.current) {
                    videoRef.current.srcObject = remoteStream;
                }
            });

            newPeer.on('connect', () => {
                console.log('Viewer connected to broadcaster');
                setIsConnected(true);
            });

            newPeer.on('error', (err) => {
                console.error('Error in viewer peer:', err);
                setError(err.message);
                setIsConnected(false);
            });

            socket.on('broadcaster-signal', (broadcasterSignal) => {
                console.log('Received broadcaster signal, responding...');
                newPeer.signal(broadcasterSignal);
            });

            setPeer(newPeer);
        }

        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, [isBroadcaster, streamId]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted={isBroadcaster} className="w-full h-auto"></video>
            <div className="connection-status">
                {isConnected ? (
                    <p className="text-green-500">Connected to stream</p>
                ) : (
                    <p className="text-red-500">Not connected</p>
                )}
            </div>
            {error && <p className="text-red-500">Error: {error}</p>}
        </div>
    );
}
