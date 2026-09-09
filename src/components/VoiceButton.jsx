import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export default function VoiceButton({ onTranscript, isListening: externalListening, className = "" }) {
  const [internalListening, setInternalListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [recognition, setRecognition] = useState(null);

  const isListening = externalListening !== undefined ? externalListening : internalListening;

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const reco = new SpeechRecognition();
    reco.continuous = false;
    reco.interimResults = false;
    reco.lang = 'en-US'; // or telugu/hindi depending on context

    reco.onstart = () => {
      setInternalListening(true);
    };

    reco.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscript) {
        onTranscript(transcript);
      }
      setInternalListening(false);
    };

    reco.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      setInternalListening(false);
    };

    reco.onend = () => {
      setInternalListening(false);
    };

    setRecognition(reco);

    return () => {
      if (reco) reco.abort();
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!supported) {
      alert("Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      if (recognition) recognition.stop();
      setInternalListening(false);
    } else {
      try {
        recognition.start();
        setInternalListening(true);
      } catch (err) {
        console.warn("Could not start recognition:", err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative inline-flex items-center justify-center p-2.5 rounded-xl transition-all duration-200 ${
        isListening
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 animate-pulse'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-indigo-600'
      } ${className}`}
      title={isListening ? "Listening... click to stop" : "Speak your question (Voice Input)"}
    >
      {isListening ? (
        <>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <Mic className="h-5 w-5 animate-bounce" />
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
}
