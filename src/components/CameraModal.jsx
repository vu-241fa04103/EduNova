import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Check, X, AlertCircle } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
      setCameraError(null);
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);
    setCapturedImage(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Webcam access is not supported by your browser environment.");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 640 },
          facingMode: "user"
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? "Camera permission was denied. Please allow camera access in your browser settings."
          : err.message || "Unable to access camera. Please check your webcam connection."
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleSnap = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    const size = Math.min(video.videoWidth || 480, video.videoHeight || 480);

    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext('2d');
    // Crop center square
    const startX = ((video.videoWidth || 480) - size) / 2;
    const startY = ((video.videoHeight || 480) - size) / 2;

    ctx.drawImage(video, startX, startY, size, size, 0, 0, 300, 300);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Camera className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Take Profile Picture</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Viewfinder / Preview */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden bg-slate-950 shadow-inner flex items-center justify-center border-4 border-indigo-100">
            {cameraError ? (
              <div className="p-4 text-center text-rose-300 space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-rose-400" />
                <p className="text-xs">{cameraError}</p>
              </div>
            ) : capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured Snapshot"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100" // mirror preview
                />
                {isInitializing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-white text-xs font-semibold">
                    Starting camera...
                  </div>
                )}
              </>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Action buttons */}
          <div className="mt-6 flex items-center gap-3 w-full justify-center">
            {capturedImage ? (
              <>
                <button
                  onClick={handleRetake}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Retake</span>
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition"
                >
                  <Check className="h-4 w-4" />
                  <span>Use This Photo</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleSnap}
                disabled={Boolean(cameraError) || isInitializing}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition"
              >
                <Camera className="h-4 w-4" />
                <span>Snap Photo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
