import React, { useEffect, useState } from 'react';
import { FiCpu, FiHardDrive, FiServer, FiInfo, FiAward } from 'react-icons/fi';
import api from '../services/api';
import { SystemMetrics, BenchmarkResults } from '../services/api';

interface SystemInfoProps {
  systemInfo?: SystemMetrics;
}

interface ModelDisplay {
  name: string;
  version: string;
  contextWindow: number;
  parameters: string;
}

interface ExtendedSystemMetrics extends SystemMetrics {
  status: string;
  diskSpace: {
    total: string;
    used: string;
    free: string;
  };
  gpuAvailable: boolean;
  gpuInfo?: {
    name: string;
    memoryTotal: string;
    temperature: number;
  };
  modelInfo: ModelDisplay;
}

export const SystemInfo: React.FC<SystemInfoProps> = ({ systemInfo: initialSystemInfo }) => {
  const [systemInfo, setSystemInfo] = useState<ExtendedSystemMetrics | undefined>(initialSystemInfo as ExtendedSystemMetrics);
  const [loading, setLoading] = useState(!initialSystemInfo);
  const [error, setError] = useState<string | null>(null);
  const [benchmarks, setBenchmarks] = useState<BenchmarkResults | null>(null);

  useEffect(() => {
    // If systemInfo is already provided as a prop, don't fetch again
    if (initialSystemInfo) {
      setSystemInfo(initialSystemInfo as ExtendedSystemMetrics);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch system metrics and benchmark data in parallel
        const [metricsResponse, benchmarksResponse] = await Promise.all([
          api.system.getRealTimeMetrics(),
          api.benchmarks.getBenchmarks()
        ]);
        
        // Transform metrics to match our component's expected structure
        const extendedMetrics: ExtendedSystemMetrics = {
          ...metricsResponse,
          status: 'Operational',
          diskSpace: {
            total: '512GB', 
            used: `${Math.round(metricsResponse.diskUsage * 512 / 100)}GB`, 
            free: `${Math.round((100 - metricsResponse.diskUsage) * 512 / 100)}GB`
          },
          gpuAvailable: true,
          gpuInfo: {
            name: 'NVIDIA A100 80GB',
            memoryTotal: '80GB',
            temperature: 45 + Math.round(Math.random() * 10) // Simulate temperature between 45-55°C
          },
          modelInfo: {
            name: typeof window !== 'undefined' && window.ENV?.NEXT_PUBLIC_MODEL_NAME || 'june13525',
            version: typeof window !== 'undefined' && window.ENV?.NEXT_PUBLIC_MODEL_VERSION || 'Standard',
            contextWindow: 32768,
            parameters: '175B'
          }
        };
        
        setSystemInfo(extendedMetrics);
        setBenchmarks(benchmarksResponse);
        setError(null);
      } catch (err) {
        console.error('Error fetching system info:', err);
        setError('Failed to load system information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up interval for real-time updates
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [initialSystemInfo]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-white animate-pulse">
        <div className="flex items-center space-x-2 mb-3">
          <FiServer className="text-blue-400" />
          <h3 className="text-lg font-semibold">Loading System Status...</h3>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 rounded-lg p-4 text-white border border-red-800">
        <div className="flex items-center space-x-2 mb-3">
          <FiInfo className="text-red-400" />
          <h3 className="text-lg font-semibold">System Status Unavailable</h3>
        </div>
        <p className="text-sm text-gray-300">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!systemInfo) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <FiInfo className="text-yellow-400" />
          <h3 className="text-lg font-semibold">No System Data Available</h3>
        </div>
        <p className="text-sm text-gray-300">
          System information is currently unavailable. Please check your connection to the API server.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <div className="flex items-center space-x-2 mb-3">
        <FiServer className="text-blue-400" />
        <h3 className="text-lg font-semibold">System Status: {systemInfo.status}</h3>
        <div className="text-xs text-gray-400 ml-auto">
          <span className="animate-pulse inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          Live
        </div>
      </div>

      <div className="space-y-4">
        {/* CPU & Memory */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <FiCpu className="text-gray-400" />
            <h4 className="font-medium">CPU & Memory</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm text-gray-400 mb-1">CPU Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    systemInfo.cpuUsage > 90 ? 'bg-red-600' : systemInfo.cpuUsage > 70 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${systemInfo.cpuUsage}%` }}
                ></div>
              </div>
              <div className="text-xs mt-1">{systemInfo.cpuUsage}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Memory Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    systemInfo.memoryUsage > 90 ? 'bg-red-600' : systemInfo.memoryUsage > 70 ? 'bg-yellow-600' : 'bg-blue-600'
                  }`}
                  style={{ width: `${systemInfo.memoryUsage}%` }}
                ></div>
              </div>
              <div className="text-xs mt-1">{systemInfo.memoryUsage}%</div>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <FiHardDrive className="text-gray-400" />
            <h4 className="font-medium">Storage</h4>
          </div>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-400">Total: {systemInfo.diskSpace.total}</span>
              <span className="text-gray-400">Used: {systemInfo.diskSpace.used}</span>
              <span className="text-gray-400">Free: {systemInfo.diskSpace.free}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${(parseInt(systemInfo.diskSpace.used) / parseInt(systemInfo.diskSpace.total)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* GPU (if available) */}
        {systemInfo.gpuAvailable && systemInfo.gpuInfo && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <FiServer className="text-gray-400" />
              <h4 className="font-medium">GPU</h4>
            </div>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">{systemInfo.gpuInfo.name}</span>
                <span className="text-gray-400">{systemInfo.gpuInfo.memoryTotal}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Temperature:</span>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      systemInfo.gpuInfo.temperature > 80 ? 'bg-red-600' : systemInfo.gpuInfo.temperature > 60 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${(systemInfo.gpuInfo.temperature / 100) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{systemInfo.gpuInfo.temperature}°C</span>
              </div>
            </div>
          </div>
        )}

        {/* Model Info */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <FiInfo className="text-gray-400" />
            <h4 className="font-medium">Model</h4>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center">
              <span className="text-gray-400 w-24">Name:</span>
              <span>{systemInfo.modelInfo.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-24">Version:</span>
              <span>{systemInfo.modelInfo.version}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-24">Parameters:</span>
              <span>{systemInfo.modelInfo.parameters}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-24">Context:</span>
              <span>{systemInfo.modelInfo.contextWindow.toLocaleString()} tokens</span>
            </div>
          </div>
        </div>

        {/* Benchmark results if available */}
        {benchmarks && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <FiAward className="text-yellow-400" />
              <h4 className="font-medium">Performance</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs font-medium text-gray-400">HumanEval</div>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-700 h-2 rounded-full flex-grow">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${benchmarks.humaneval}%` }}
                    ></div>
                  </div>
                  <span className="text-green-400 text-xs ml-2">{benchmarks.humaneval}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-400">MBPP</div>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-700 h-2 rounded-full flex-grow">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${benchmarks.mbpp}%` }}
                    ></div>
                  </div>
                  <span className="text-green-400 text-xs ml-2">{benchmarks.mbpp}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-400">CodeContests</div>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-700 h-2 rounded-full flex-grow">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${benchmarks.codecontests}%` }}
                    ></div>
                  </div>
                  <span className="text-green-400 text-xs ml-2">{benchmarks.codecontests}%</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-400">GSM8K</div>
                <div className="flex items-center mt-1">
                  <div className="bg-gray-700 h-2 rounded-full flex-grow">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${benchmarks.gsm8k}%` }}
                    ></div>
                  </div>
                  <span className="text-green-400 text-xs ml-2">{benchmarks.gsm8k}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 