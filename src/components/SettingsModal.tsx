import React, { useState, useEffect } from 'react';
import { FiX, FiSettings, FiCpu, FiInfo, FiSliders } from 'react-icons/fi';
import api from '../services/api';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [modelVersion, setModelVersion] = useState('Standard');
  const [contextLength, setContextLength] = useState(32768);
  const [memoryLimit, setMemoryLimit] = useState(128);
  const [threads, setThreads] = useState(8);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  
  // Default values
  const [modelName, setModelName] = useState<string>('june13525');
  const [developerName, setDeveloperName] = useState<string>('Indai Co.');

  useEffect(() => {
    // Load environment variables or defaults
    const envModelName = process.env.NEXT_PUBLIC_MODEL_NAME || 'june13525';
    const envCompanyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Indai Co.';
    
    setModelName(envModelName);
    setDeveloperName(envCompanyName);
    
    // Fetch current settings
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.system.getSettings();
      
      if (response) {
        setSettings(response);
        setModelVersion(response.modelVersion || 'Standard');
        setContextLength(response.contextLength || 32768);
        setMemoryLimit(response.memoryLimit || 128);
        setThreads(response.threads || 8);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaved(false);
      await api.system.updateSettings({
        modelVersion,
        contextLength,
        memoryLimit,
        threads
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <FiSettings className="mr-2" /> {modelName} AI Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Model Version */}
              <div>
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FiCpu className="mr-2" /> Model Selection
                </h3>
                <div className="bg-gray-700 bg-opacity-50 rounded p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Model Version
                    </label>
                    <select
                      value={modelVersion}
                      onChange={(e) => setModelVersion(e.target.value)}
                      className="bg-gray-900 text-white w-full p-2 rounded border border-gray-600"
                    >
                      <option value="Standard">{modelName} Standard</option>
                      <option value="Pro">{modelName} Pro</option>
                      <option value="Ultra">{modelName} Ultra</option>
                      <option value="Benchmark">{modelName} Benchmark Edition</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                      All versions outperform existing AI models
                    </p>
                  </div>
                  
                  {/* Context Length */}
                  <div>
                    <label className="flex justify-between">
                      <span className="block text-sm font-medium text-gray-300">Context Length (tokens)</span>
                      <span className="text-sm text-gray-400">{contextLength.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min="8192"
                      max="32768"
                      step="1024"
                      value={contextLength}
                      onChange={(e) => setContextLength(parseInt(e.target.value))}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>8K</span>
                      <span>16K</span>
                      <span>32K</span>
                    </div>
                  </div>
                  
                  {/* Memory Limit */}
                  <div>
                    <label className="flex justify-between">
                      <span className="block text-sm font-medium text-gray-300">Memory Limit (GB)</span>
                      <span className="text-sm text-gray-400">{memoryLimit} GB</span>
                    </label>
                    <input
                      type="range"
                      min="16"
                      max="128"
                      step="16"
                      value={memoryLimit}
                      onChange={(e) => setMemoryLimit(parseInt(e.target.value))}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>16GB</span>
                      <span>64GB</span>
                      <span>128GB</span>
                    </div>
                  </div>
                  
                  {/* CPU Threads */}
                  <div>
                    <label className="flex justify-between">
                      <span className="block text-sm font-medium text-gray-300">CPU Threads</span>
                      <span className="text-sm text-gray-400">{threads}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="32"
                      value={threads}
                      onChange={(e) => setThreads(parseInt(e.target.value))}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>16</span>
                      <span>32</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benchmark Performance */}
              <div>
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FiSliders className="mr-2" /> Benchmark Performance
                </h3>
                <div className="bg-gray-700 bg-opacity-50 rounded p-4">
                  <p className="text-sm text-gray-300 mb-3">
                    {modelName} by {developerName} outperforms all existing AI models across every benchmark.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {settings?.benchmarks ? (
                      <>
                        <div>
                          <div className="text-xs font-medium text-gray-400">HumanEval</div>
                          <div className="flex items-center mt-1">
                            <div className="bg-gray-600 h-2 rounded-full flex-grow">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${settings.benchmarks.humaneval}%` }}
                              ></div>
                            </div>
                            <span className="text-green-400 text-xs ml-2">{settings.benchmarks.humaneval}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">MBPP</div>
                          <div className="flex items-center mt-1">
                            <div className="bg-gray-600 h-2 rounded-full flex-grow">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${settings.benchmarks.mbpp}%` }}
                              ></div>
                            </div>
                            <span className="text-green-400 text-xs ml-2">{settings.benchmarks.mbpp}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">CodeContests</div>
                          <div className="flex items-center mt-1">
                            <div className="bg-gray-600 h-2 rounded-full flex-grow">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${settings.benchmarks.codecontests}%` }}
                              ></div>
                            </div>
                            <span className="text-green-400 text-xs ml-2">{settings.benchmarks.codecontests}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">GSM8K</div>
                          <div className="flex items-center mt-1">
                            <div className="bg-gray-600 h-2 rounded-full flex-grow">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${settings.benchmarks.gsm8k}%` }}
                              ></div>
                            </div>
                            <span className="text-green-400 text-xs ml-2">{settings.benchmarks.gsm8k}%</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="text-xs font-medium text-gray-400">HumanEval</div>
                          <div className="animate-pulse h-2 bg-gray-600 rounded-full w-full mt-1"></div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">MBPP</div>
                          <div className="animate-pulse h-2 bg-gray-600 rounded-full w-full mt-1"></div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">CodeContests</div>
                          <div className="animate-pulse h-2 bg-gray-600 rounded-full w-full mt-1"></div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-400">GSM8K</div>
                          <div className="animate-pulse h-2 bg-gray-600 rounded-full w-full mt-1"></div>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    Live benchmark data provided by {developerName} research
                  </p>
                </div>
              </div>
              
              {/* About */}
              <div>
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FiInfo className="mr-2" /> About
                </h3>
                <div className="bg-gray-700 bg-opacity-50 rounded p-4">
                  <p className="text-sm text-gray-300">
                    {modelName} AI is developed by {developerName}, setting new standards in AI performance across all benchmarks.
                  </p>
                  <div className="text-xs text-gray-400 mt-3">
                    <p>Version: {settings?.version || "1.0.0"}</p>
                    <p>Build Date: {settings?.buildDate || "2025-06-13"}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <div>
            {saved && (
              <span className="text-green-400 text-sm">
                Settings saved successfully!
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={saveSettings}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 