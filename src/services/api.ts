import axios from 'axios';

// Configure base URL from environment variables or use default
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// API service with organized endpoints
const api = {
  // System-related endpoints
  system: {
    getHealth: () => apiClient.get('/system/health'),
    getRealTimeMetrics: () => apiClient.get('/system/metrics'),
    getSettings: () => apiClient.get('/system/settings'),
    updateSettings: (settings: any) => apiClient.post('/system/settings', settings),
  },
  
  // Model-related endpoints
  models: {
    getInfo: () => apiClient.get('/models/info'),
    loadModel: (modelId: string) => apiClient.post(`/models/load/${modelId}`),
    getBenchmarks: () => apiClient.get('/models/benchmarks'),
    getPerformanceStats: () => apiClient.get('/models/performance'),
    compare: (modelIds: string[]) => apiClient.post('/models/compare', { modelIds }),
  },
  
  // Completions/generation endpoints
  completions: {
    generate: (prompt: string, options = {}) => 
      apiClient.post('/completions/generate', { prompt, ...options }),
    stream: (prompt: string, options = {}) => 
      apiClient.post('/completions/stream', { prompt, ...options }, { responseType: 'stream' }),
    stop: (requestId: string) => 
      apiClient.post('/completions/stop', { requestId }),
  },
  
  // File operations
  files: {
    upload: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return apiClient.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    list: () => apiClient.get('/files/list'),
    download: (fileId: string) => apiClient.get(`/files/download/${fileId}`, { responseType: 'blob' }),
    delete: (fileId: string) => apiClient.delete(`/files/${fileId}`),
  },
  
  // Analytics endpoints
  analytics: {
    getUsageStats: () => apiClient.get('/analytics/usage'),
    getTokenUsage: () => apiClient.get('/analytics/tokens'),
    getBenchmarkComparisons: () => apiClient.get('/analytics/benchmarks/compare'),
    getTrainingData: () => apiClient.get('/analytics/training'),
  },

  // Mock API endpoints for development without a backend
  // These simulate real API responses for testing the UI
  mock: {
    system: {
      getRealTimeMetrics: () => {
        // Return mock system metrics
        return Promise.resolve({
          status: 'operational',
          cpuUsage: Math.floor(Math.random() * 60) + 10,
          memoryUsage: Math.floor(Math.random() * 70) + 20,
          diskSpace: {
            total: '512GB',
            used: '128GB',
            free: '384GB'
          },
          gpuAvailable: true,
          gpuInfo: {
            name: 'NVIDIA RTX 4090',
            memoryTotal: '24GB',
            temperature: Math.floor(Math.random() * 30) + 40
          },
          modelInfo: {
            name: process.env.NEXT_PUBLIC_MODEL_NAME || 'june13525',
            version: process.env.NEXT_PUBLIC_MODEL_VERSION || 'Standard',
            contextWindow: 32768,
            parameters: '175B'
          },
          benchmarks: {
            humaneval: 98.7,
            mbpp: 99.2,
            codecontests: 92.5,
            gsm8k: 97.8
          }
        });
      },
      getSettings: () => {
        // Return mock settings
        return Promise.resolve({
          modelVersion: process.env.NEXT_PUBLIC_MODEL_VERSION || 'Standard',
          contextLength: 32768,
          memoryLimit: 128,
          threads: 8,
          version: '1.0.0',
          buildDate: '2025-06-13',
          benchmarks: {
            humaneval: 98.7,
            mbpp: 99.2, 
            codecontests: 92.5,
            gsm8k: 97.8
          }
        });
      },
      updateSettings: (settings: any) => {
        console.log('Mock updating settings:', settings);
        return Promise.resolve({ success: true });
      }
    },
    models: {
      getBenchmarks: () => {
        // Return mock benchmark data
        return Promise.resolve({
          results: {
            humaneval: 98.7,
            mbpp: 99.2,
            codecontests: 92.5,
            gsm8k: 97.8,
            last_updated: '2025-06-13'
          },
          comparison: [
            {
              model: process.env.NEXT_PUBLIC_MODEL_NAME || 'june13525',
              humaneval: 98.7,
              mbpp: 99.2,
              codecontests: 92.5,
              gsm8k: 97.8
            },
            {
              model: 'GPT-4o',
              humaneval: 89.2,
              mbpp: 88.7,
              codecontests: 79.3,
              gsm8k: 94.2
            },
            {
              model: 'Claude 3 Opus',
              humaneval: 87.5,
              mbpp: 86.9,
              codecontests: 77.8,
              gsm8k: 93.7
            },
            {
              model: 'Gemini 1.5 Pro',
              humaneval: 86.1,
              mbpp: 85.4,
              codecontests: 75.2,
              gsm8k: 92.1
            }
          ],
          meta: {
            test_count: 7832,
            hardware: 'NVIDIA A100 80GB GPUs',
            environment: 'Controlled testing environment'
          }
        });
      },
      getPerformanceStats: () => {
        // Return mock performance stats
        return Promise.resolve({
          performanceStats: {
            Speed: '+348%',
            Accuracy: '+263%',
            ContextHandling: '+512%',
            ReasoningCapability: '+427%'  
          },
          testCategories: [
            {
              name: 'Code Generation',
              score: 98.7,
              description: 'Ability to generate correct, efficient, and optimized code from prompts'
            },
            {
              name: 'Code Understanding',
              score: 97.9,
              description: 'Comprehension of complex code structures and algorithms'
            },
            {
              name: 'Problem Solving',
              score: 96.8,
              description: 'Ability to solve complex programming challenges'
            },
            {
              name: 'Reasoning',
              score: 97.5,
              description: 'Logical reasoning and inference capabilities'
            },
            {
              name: 'Context Awareness',
              score: 99.3,
              description: 'Maintaining context and applying relevant knowledge'
            }
          ],
          verificationMethods: [
            'Independent Lab Testing',
            'Peer-Reviewed Evaluation',
            'Industry Standard Benchmarks',
            'Real-world Performance Testing'
          ]
        });
      }
    },
    analytics: {
      getBenchmarkComparisons: () => {
        // Return mock benchmark comparisons for analytics
        return Promise.resolve({
          dailyComparisons: [
            { date: '2025-06-01', june13525: 98.2, competitor: 88.5 },
            { date: '2025-06-07', june13525: 98.5, competitor: 88.7 },
            { date: '2025-06-13', june13525: 98.7, competitor: 89.2 }
          ],
          improvementTrend: '+9.5% average improvement'
        });
      }
    }
  }
};

// Determine if we should use mock API in development
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || !BASE_URL;

// Create a proxy that will use mock API in development or real API in production
const apiProxy = new Proxy(api, {
  get: (target, prop) => {
    // In development without a backend or when explicitly enabled, use mock API
    if (useMockApi && prop in target.mock) {
      return target.mock[prop as keyof typeof target.mock];
    }
    return target[prop as keyof typeof target];
  }
});

export default apiProxy;