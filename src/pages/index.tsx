import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSettings, FiTerminal, FiCpu, FiFolder, FiZap, FiBarChart2, FiCode, FiLoader } from 'react-icons/fi';

import CodeEditor from '../components/CodeEditor';
import SystemInfo from '../components/SystemInfo';
import SettingsModal, { Settings } from '../components/SettingsModal';
import api from '../services/api';

export default function Home() {
  // State
  const [prompt, setPrompt] = useState('');
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [editorLanguage, setEditorLanguage] = useState('javascript');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelName, setModelName] = useState<string>('june13525');
  const [developerName, setDeveloperName] = useState<string>('Indai Co.');
  
  // Default settings
  const [settings, setSettings] = useState<Settings>({
    model: {
      name: 'june13525',
      quantization: '4bit',
      contextLength: 4096,
      temperature: 0.7
    },
    system: {
      threads: 4,
      memoryLimit: 8
    }
  });

  // Check if model is loaded
  useEffect(() => {
    checkModelStatus();
    getSystemInfo();
    const intervalId = setInterval(checkModelStatus, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to check model status
  const checkModelStatus = async () => {
    try {
      const modelInfo = await api.models.getInfo();
      setIsModelLoaded(modelInfo.status === 'loaded');
    } catch (error) {
      console.error('Error checking model status:', error);
    }
  };

  // Function to get system info
  const getSystemInfo = async () => {
    try {
      const data = await api.system.getHealth();
      setSystemInfo(data);
    } catch (error) {
      console.error('Error getting system info:', error);
    }
  };

  // Function to load the model
  const loadModel = async () => {
    try {
      setIsLoading(true);
      toast.info('Loading june13525. This may take a few minutes...');
      await api.models.loadModel();
      toast.success('Model loading started. Please wait...');
      checkModelStatus();
    } catch (error) {
      console.error('Error loading model:', error);
      toast.error('Error loading model');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate completion
  const generateCompletion = async () => {
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.completions.generate({
        prompt,
        temperature: settings.model.temperature,
        top_p: 0.95,
        max_tokens: 1024
      });
      setCompletion(response.completion);
    } catch (error) {
      console.error('Error generating completion:', error);
      toast.error('Error generating completion');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditorLanguage(e.target.value);
  };
  
  // Function to handle settings changes
  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    toast.success('Settings updated successfully');
    // In a real app, we would send these settings to the backend
  };

  useEffect(() => {
    // Load environment variables or defaults
    const envModelName = process.env.NEXT_PUBLIC_MODEL_NAME || 'june13525';
    const envCompanyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Indai Co.';
    
    setModelName(envModelName);
    setDeveloperName(envCompanyName);
    
    // Fetch initial system data
    fetchSystemData();
    
    // Set up interval for real-time updates
    const intervalId = setInterval(() => {
      fetchSystemData();
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  const fetchSystemData = async () => {
    try {
      setLoading(true);
      const response = await api.system.getRealTimeMetrics();
      setSystemInfo(response);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch system data:', err);
      setError('Failed to load system information. Please check your connection to the API server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{modelName} AI - Advanced Code Generation by {developerName}</title>
        <meta name="description" content={`Experience ${modelName} AI, the revolutionary coding assistant by ${developerName}. Setting new standards in AI performance on all benchmarks.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer theme="dark" />
      
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />

      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FiCpu className="text-blue-400 text-xl" />
              <h1 className="text-xl font-bold">{modelName} AI</h1>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">by {developerName}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/benchmarks"
                className="flex items-center text-gray-300 hover:text-white"
              >
                <FiBarChart2 className="mr-1" /> Benchmarks
              </Link>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <FiSettings className="mr-1" /> Settings
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4">
          {loading && !systemInfo ? (
            <div className="flex flex-col items-center justify-center mt-12">
              <FiLoader className="animate-spin text-blue-400 text-4xl mb-4" />
              <h2 className="text-xl font-semibold">Connecting to {modelName} AI...</h2>
              <p className="text-gray-400 mt-2">Establishing connection to the server</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-20 rounded-lg p-6 border border-red-800 max-w-lg mx-auto mt-12 text-center">
              <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
              <p className="text-gray-300">{error}</p>
              <button 
                onClick={fetchSystemData} 
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FiCode className="text-blue-400 text-xl" />
                      <h2 className="text-xl font-bold">Code Generation</h2>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {modelName} AI delivers unparalleled code generation capabilities, understanding your requirements
                      and producing optimized, efficient code across multiple programming languages.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiTerminal className="text-green-400" />
                        <span className="text-green-400">Code Assistant</span>
                        <div className="ml-auto flex items-center">
                          <span className="animate-pulse inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          <span className="text-xs text-gray-500">Live</span>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        <p>// Input your code requirements</p>
                        <p>// {modelName} will generate high-quality solutions</p>
                        <p className="mt-2">function <span className="text-blue-400">example</span>() &#123;</p>
                        <p>&nbsp;&nbsp;// Advanced code generation</p>
                        <p>&nbsp;&nbsp;// Optimized for your specific needs</p>
                        <p>&nbsp;&nbsp;console.log("Hello from {modelName}!");</p>
                        <p>&#125;</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <SystemInfo systemInfo={systemInfo} />
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-20 rounded-lg p-6 mb-6 border border-blue-800">
                <h2 className="text-xl font-bold mb-3">Performance</h2>
                <p className="text-gray-300 mb-4">
                  {modelName} AI outperforms all existing AI models across every benchmark, setting
                  new standards in code generation, understanding, and problem-solving capabilities.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {systemInfo?.benchmarks ? (
                    <>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="text-xl font-bold text-green-400">{systemInfo.benchmarks.humaneval}%</div>
                        <div className="text-xs text-gray-400">HumanEval</div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="text-xl font-bold text-green-400">{systemInfo.benchmarks.mbpp}%</div>
                        <div className="text-xs text-gray-400">MBPP</div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="text-xl font-bold text-green-400">{systemInfo.benchmarks.codecontests}%</div>
                        <div className="text-xs text-gray-400">CodeContests</div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="text-xl font-bold text-green-400">{systemInfo.benchmarks.gsm8k}%</div>
                        <div className="text-xs text-gray-400">GSM8K</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="animate-pulse h-5 bg-gray-700 rounded w-1/2 mx-auto mb-1"></div>
                        <div className="text-xs text-gray-400">HumanEval</div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="animate-pulse h-5 bg-gray-700 rounded w-1/2 mx-auto mb-1"></div>
                        <div className="text-xs text-gray-400">MBPP</div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="animate-pulse h-5 bg-gray-700 rounded w-1/2 mx-auto mb-1"></div>
                        <div className="text-xs text-gray-400">CodeContests</div>
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded p-3 text-center">
                        <div className="animate-pulse h-5 bg-gray-700 rounded w-1/2 mx-auto mb-1"></div>
                        <div className="text-xs text-gray-400">GSM8K</div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <Link 
                    href="/benchmarks" 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm inline-flex items-center"
                  >
                    <FiBarChart2 className="mr-1" /> View Detailed Benchmarks
                  </Link>
                </div>
              </div>
            </>
          )}
        </main>

        <footer className="bg-gray-800 border-t border-gray-700 p-4 mt-auto">
          <div className="container mx-auto text-center text-gray-400 text-sm">
            <p>© 2025 {developerName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
} 