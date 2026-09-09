import React, { useState, useRef, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { multilingualTranslations } from '../data/mockData';
import VoiceButton from '../components/VoiceButton';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function AITutor() {
  const { messages, setMessages, language, user, setCurrentPage } = useLearning();
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);
  const messagesEndRef = useRef(null);

  const t = multilingualTranslations[language] || multilingualTranslations.en;

  const quickPrompts = [
    "Explain PCA in simple words",
    "Difference between Supervised & Unsupervised Learning",
    "How does Gradient Descent optimize weights?",
    "What is the Elbow Method in K-Means?",
    "Why is F1-score better than Accuracy for imbalanced data?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle Speech Synthesis
  const handleSpeak = (id, text) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel(); // stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate realistic smart pedagogical responses
  const getAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('pca') || q.includes('principal component') || q.includes('dimensionality')) {
      return {
        text: `### 🎯 Principal Component Analysis (PCA) in Simple Words\n\n**PCA stands for Principal Component Analysis.** It is an unsupervised machine learning technique used to **reduce the number of features (dimensions)** in a dataset while keeping as much essential information (variance) as possible.\n\n---\n\n#### 💡 Real-World Analogy:\nImagine you are taking a photograph of a 3D statue on your phone. The statue is 3D (3 dimensions), but your photo is flat (2 dimensions).\n- If you take the photo from an awkward angle, you lose all details.\n- But if you find the **best angle**, the 2D photo captures almost all the features of the 3D statue!\n\n**PCA mathematically finds that best angle!**\n\n---\n\n#### ⚙️ Step-by-Step Mechanism:\n1. **Standardize the Data:** Ensure all features have zero mean and unit variance.\n2. **Compute Covariance Matrix:** Understand how variables correlate with each other.\n3. **Eigen Decomposition:** Calculate **Eigenvectors** (the direction of maximum spread) and **Eigenvalues** (how much variance is in that direction).\n4. **Project Features:** Pick the top $k$ principal components and project data onto them.\n\n---\n\n#### 🚀 Recommended Practice:\nBased on your recent quiz, try our **Personalized Learning Path** module on PCA to practice eigenvalue calculations and Scikit-Learn code!`,
        actionPrompt: "Open Learning Path: PCA Module"
      };
    }

    if (q.includes('supervised') || q.includes('unsupervised')) {
      return {
        text: `### 🔍 Supervised vs. Unsupervised Learning\n\nHere is the clear distinction:\n\n| Feature | Supervised Learning | Unsupervised Learning |\n| :--- | :--- | :--- |\n| **Data Type** | Labeled Data (Input $X$ + Target $y$) | Unlabeled Data (Only Input $X$) |\n| **Goal** | Predict target output for new inputs | Discover hidden patterns/structures |\n| **Algorithms** | Linear Regression, Decision Trees, SVM | K-Means Clustering, PCA, Autoencoders |\n| **Evaluation** | Mean Squared Error, Accuracy, F1-Score | Silhouette Score, Inertia (WCSS) |\n\n💡 **Example:** Predicting house prices based on size is *Supervised*. Grouping online shoppers by browsing habits is *Unsupervised*!`,
        actionPrompt: "Take Quick Quiz on Machine Learning"
      };
    }

    if (q.includes('gradient descent') || q.includes('optimizer') || q.includes('backpropagation')) {
      return {
        text: `### 📉 Gradient Descent Explained\n\n**Gradient Descent** is the optimization engine behind training machine learning and deep learning models.\n\n- **Objective:** Find the model parameters (weights $W$ and bias $b$) that **minimize the Loss Function** $J(\\theta)$.\n- **Formula:** $\\theta_{new} = \\theta_{old} - \\alpha \\cdot \\nabla J(\\theta)$\n  - $\\alpha$ = Learning rate (step size)\n  - $\\nabla J(\\theta)$ = Slope (gradient) of the loss curve\n\n💡 **Analogy:** Imagine being blindfolded on a foggy mountain and wanting to reach the bottom of the valley. At every step, you feel the slope of the ground with your feet and step in the steepest downward direction!`,
        actionPrompt: "Ask AI for a Python Implementation"
      };
    }

    if (q.includes('elbow') || q.includes('k-means') || q.includes('clustering')) {
      return {
        text: `### 📊 The Elbow Method in K-Means\n\nIn K-Means clustering, how do you decide how many groups ($K$) to create?\n\n1. Run K-Means for various values of $K$ (e.g., $K = 1$ to $10$).\n2. For each $K$, calculate the **Within-Cluster Sum of Squares (WCSS)** or inertia.\n3. Plot $K$ vs. WCSS.\n4. As $K$ increases, WCSS naturally drops. Look for the "elbow point"—the point where the rate of decrease abruptly slows down. That elbow marks the optimal $K$!`,
        actionPrompt: "View Clustering Module"
      };
    }

    // General academic doubt answer
    return {
      text: `### 📚 EduNova AI Academic Breakdown\n\nThank you for asking: **"${query}"**\n\nHere is a clear educational breakdown:\n\n1. **Core Concept:** In AI and Computer Science, this concept focuses on structured abstraction, computational efficiency, and robust data representations.\n2. **Practical Significance:** Understanding this topic helps you write cleaner algorithmic implementations and perform well in technical interviews and hackathons.\n3. **Key Recommendation:** Combine theoretical intuition with hands-on Python practice to solidify your mastery.\n\n*Would you like a step-by-step code example or a quick practice question on this topic?*`,
      actionPrompt: null
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI inference delay
    setTimeout(() => {
      const response = getAIResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        actionPrompt: response.actionPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleVoiceTranscript = (transcript) => {
    setInputQuery(transcript);
    // Optionally auto-send or let user review
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-6.5rem)] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">AI Personal Tutor</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Instant doubt solving • Explains with analogies, formulas & code
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setMessages([messages[0]])}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            title="Clear conversation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="bg-indigo-50/50 border-b border-indigo-100/50 px-6 py-2.5 overflow-x-auto flex items-center gap-2">
        <span className="text-xs font-bold text-indigo-900 flex items-center gap-1 shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          Quick Doubts:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 border border-indigo-200/60 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`max-w-2xl ${isAI ? 'w-full' : ''}`}>
                <div
                  className={`rounded-2xl p-4 sm:p-5 shadow-sm ${
                    isAI
                      ? 'bg-white border border-slate-200/80 text-slate-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {/* Message body */}
                  <div className="prose prose-sm max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Optional Action recommendation button */}
                  {msg.actionPrompt && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentPage('learning-path')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{msg.actionPrompt}</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </button>
                    </div>
                  )}

                  {/* AI Message Footer Actions */}
                  {isAI && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>EduNova AI Tutor • {msg.timestamp}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className={`p-1.5 rounded-lg transition ${
                            speakingId === msg.id
                              ? 'text-indigo-600 bg-indigo-50 animate-pulse'
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                          }`}
                          title={speakingId === msg.id ? "Stop Reading" : "Read Aloud (Text to Speech)"}
                        >
                          {speakingId === msg.id ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {!isAI && (
                  <p className="mt-1 text-right text-[10px] text-slate-400 mr-1">
                    {msg.timestamp}
                  </p>
                )}
              </div>

              {!isAI && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-9 w-9 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                />
              )}
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              <span className="text-xs text-slate-400 font-medium ml-2">EduNova AI is formulating your answer...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t border-slate-200 bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input button */}
          <VoiceButton onTranscript={handleVoiceTranscript} />

          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t.askAiPlaceholder}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-4 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2 text-center text-[11px] text-slate-400">
          Tip: You can ask in English, Telugu, or Hindi. Tap the microphone icon for voice doubts.
        </p>
      </div>
    </div>
  );
}
