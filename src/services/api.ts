import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Get the base URL from environment variables or use default
const baseURL = typeof window !== 'undefined' && window.ENV?.NEXT_PUBLIC_API_URL 
  ? window.ENV.NEXT_PUBLIC_API_URL 
  : 'http://localhost:8000';

// Configure axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Define interfaces for API responses
export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: number;
  activeRequests: number;
  requestsPerMinute: number;
}

export interface ModelInfo {
  name: string;
  version: string;
  contextLength: number;
  memoryLimit: number;
  threads: number;
  buildDate: string;
}

export interface BenchmarkResults {
  humaneval: number;
  mbpp: number;
  codecontests: number;
  gsm8k: number;
}

export interface PerformanceStats {
  speed: number;
  accuracy: number;
  contextHandling: number;
  reasoningCapability: number;
}

export interface BenchmarkComparison {
  modelName: string;
  humaneval: number;
  mbpp: number;
  codecontests: number;
  gsm8k: number;
}

export interface Settings {
  modelVersion: string;
  contextLength: number;
  memoryLimit: number;
  threads: number;
  version: string;
  buildDate: string;
  benchmarks: BenchmarkResults;
}

// Determine if we're in development mode
const isDevelopment = typeof window !== 'undefined' && 
  (window.ENV?.NODE_ENV === 'development' || !window.ENV?.NODE_ENV);

// API endpoints
const api = {
  system: {
    // Get real-time system metrics
    getRealTimeMetrics: (): Promise<SystemMetrics> => {
      return apiClient.get('/api/system/metrics');
    },
    
    // Get system health status
    getHealthStatus: (): Promise<{ status: string; message: string }> => {
      return apiClient.get('/api/system/health');
    },
    
    // Get system settings
    getSettings: (): Promise<Settings> => {
      // If in development mode, return mock data
      if (isDevelopment) {
        return Promise.resolve({
          modelVersion: 'Standard',
          contextLength: 32768,
          memoryLimit: 128,
          threads: 8,
          version: '1.0.0',
          buildDate: '2025-06-13',
          benchmarks: {
            humaneval: 98.7,
            mbpp: 99.2,
            codecontests: 94.5,
            gsm8k: 97.8
          }
        });
      }
      return apiClient.get('/api/system/settings');
    },
    
    // Update system settings
    updateSettings: (settings: Partial<Settings>): Promise<Settings> => {
      return apiClient.post('/api/system/settings', settings);
    }
  },
  
  models: {
    // Get model information
    getModelInfo: (): Promise<ModelInfo> => {
      return apiClient.get('/api/models/info');
    },
    
    // Get model usage statistics
    getModelUsage: (): Promise<{ totalRequests: number; averageLatency: number }> => {
      return apiClient.get('/api/models/usage');
    }
  },
  
  benchmarks: {
    // Get benchmark data for models
    getBenchmarks: (): Promise<BenchmarkResults> => {
      // If in development mode, return mock data
      if (isDevelopment) {
        return Promise.resolve({
          humaneval: 98.7,
          mbpp: 99.2,
          codecontests: 94.5,
          gsm8k: 97.8
        });
      }
      return apiClient.get('/api/benchmarks/results');
    },
    
    // Get performance statistics
    getPerformanceStats: (): Promise<PerformanceStats> => {
      // If in development mode, return mock data
      if (isDevelopment) {
        return Promise.resolve({
          speed: 348,
          accuracy: 263,
          contextHandling: 512,
          reasoningCapability: 427
        });
      }
      return apiClient.get('/api/benchmarks/performance');
    },
    
    // Get benchmark comparison with other models
    getComparison: (): Promise<BenchmarkComparison[]> => {
      // If in development mode, return mock data
      if (isDevelopment) {
        return Promise.resolve([
          {
            modelName: 'june13525',
            humaneval: 98.7,
            mbpp: 99.2,
            codecontests: 94.5,
            gsm8k: 97.8
          },
          {
            modelName: 'GPT-4o',
            humaneval: 89.3,
            mbpp: 88.1,
            codecontests: 76.2,
            gsm8k: 92.3
          },
          {
            modelName: 'Claude 3 Opus',
            humaneval: 86.7,
            mbpp: 84.5,
            codecontests: 71.8,
            gsm8k: 90.1
          },
          {
            modelName: 'Gemini 1.5 Pro',
            humaneval: 84.2,
            mbpp: 83.7,
            codecontests: 69.5,
            gsm8k: 87.4
          },
          {
            modelName: 'CodeLlama',
            humaneval: 56.4,
            mbpp: 54.2,
            codecontests: 42.3,
            gsm8k: 41.8
          }
        ]);
      }
      return apiClient.get('/api/benchmarks/comparison');
    }
  },
  
  completions: {
    // Create a new code completion
    createCompletion: (data: { prompt: string; language: string; maxTokens?: number }): Promise<{ completion: string }> => {
      return apiClient.post('/api/completions', data);
    }
  },
  
  files: {
    // Get file list
    getFiles: (): Promise<{ name: string; path: string; size: number; type: string }[]> => {
      return apiClient.get('/api/files');
    },
    
    // Get file content
    getFileContent: (path: string): Promise<{ content: string }> => {
      return apiClient.get(`/api/files/content?path=${encodeURIComponent(path)}`);
    }
  },
  
  analytics: {
    // Get usage analytics
    getUsageAnalytics: (): Promise<{ date: string; requests: number; tokens: number }[]> => {
      return apiClient.get('/api/analytics/usage');
    }
  }
};

export default api;