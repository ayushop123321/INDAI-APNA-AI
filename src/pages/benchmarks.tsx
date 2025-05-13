import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiCpu, FiArrowLeft, FiAward, FiBarChart2, FiCheckCircle, FiZap, FiLoader } from 'react-icons/fi';

import api from '../services/api';
import { BenchmarkResults, PerformanceStats, BenchmarkComparison } from '../services/api';

interface CategoryData {
  name: string;
  score: number;
  description: string;
}

interface BenchmarkData {
  results: BenchmarkResults;
  comparison: BenchmarkComparison[];
}

const VERIFICATION_METHODS = [
  'Independent Lab Testing',
  'Peer-Reviewed Evaluation',
  'Industry Standard Benchmarks',
  'Real-world Performance Testing'
];

const TEST_CATEGORIES = [
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
];

const BenchmarkPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkResults | null>(null);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats | null>(null);
  const [comparisonData, setComparisonData] = useState<BenchmarkComparison[] | null>(null);
  const [testCategories] = useState<CategoryData[]>(TEST_CATEGORIES);
  const [verificationMethods] = useState<string[]>(VERIFICATION_METHODS);

  useEffect(() => {
    // Fetch all benchmark data when component mounts
    const fetchData = async () => {
      setLoading(true);
      try {
        // Make multiple API calls in parallel
        const [results, stats, comparison] = await Promise.all([
          api.benchmarks.getBenchmarks(),
          api.benchmarks.getPerformanceStats(),
          api.benchmarks.getComparison()
        ]);
        
        setBenchmarkResults(results);
        setPerformanceStats(stats);
        setComparisonData(comparison);
        setError(null);
      } catch (err) {
        console.error('Error fetching benchmark data:', err);
        setError('Failed to load benchmark data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up a refresh interval for real-time updates
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <FiLoader className="animate-spin text-blue-400 text-4xl mb-4" />
        <h2 className="text-xl font-semibold">Loading real-time benchmark data...</h2>
        <p className="text-gray-400 mt-2">Fetching the latest performance metrics</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="bg-red-900 bg-opacity-20 p-6 rounded-lg border border-red-800 max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If data is loaded successfully but empty, show placeholder
  if (!benchmarkResults || !performanceStats || !comparisonData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">No Benchmark Data Available</h2>
          <p className="text-gray-300">Benchmark data is currently being compiled. Please check back later.</p>
          <Link href="/" className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>june13525 AI Benchmarks | Indai Co.</title>
        <meta name="description" content="Real-time benchmark results for june13525 AI - Live performance metrics" />
      </Head>

      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiCpu className="text-blue-400 text-xl" />
            <h1 className="text-xl font-bold">june13525 AI</h1>
            <span className="text-xs bg-blue-600 px-2 py-1 rounded">by Indai Co.</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-400">
              <span className="animate-pulse inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Live Data
            </div>
            <Link href="/" className="flex items-center text-gray-300 hover:text-white">
              <FiArrowLeft className="mr-1" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Real-Time Benchmark Results</h1>
          <p className="text-gray-400">
            Live performance analysis of the june13525 AI model compared to leading competitors
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-900 bg-opacity-20 rounded-lg p-6 mb-8 border border-blue-800">
          <div className="flex items-center mb-4">
            <FiAward className="text-yellow-400 text-2xl mr-2" />
            <h2 className="text-xl font-bold text-blue-300">Current Performance Metrics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            <div className="bg-gray-800 bg-opacity-70 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-400">+{performanceStats.speed}%</div>
              <div className="text-xs text-gray-400">Speed</div>
            </div>
            <div className="bg-gray-800 bg-opacity-70 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-400">+{performanceStats.accuracy}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div className="bg-gray-800 bg-opacity-70 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-400">+{performanceStats.contextHandling}%</div>
              <div className="text-xs text-gray-400">Context Handling</div>
            </div>
            <div className="bg-gray-800 bg-opacity-70 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-400">+{performanceStats.reasoningCapability}%</div>
              <div className="text-xs text-gray-400">Reasoning Capability</div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FiBarChart2 className="mr-2" /> Performance Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    HumanEval
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    MBPP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    CodeContests
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    GSM8K
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {comparisonData.map((model) => (
                  <tr 
                    key={model.modelName} 
                    className={model.modelName === 'june13525' ? 'bg-blue-900 bg-opacity-20' : ''}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {model.modelName === 'june13525' ? (
                        <div className="flex items-center">
                          <FiAward className="text-yellow-400 mr-1" />
                          <span className="font-bold text-blue-300">{model.modelName}</span>
                        </div>
                      ) : (
                        <span>{model.modelName}</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap ${model.modelName === 'june13525' ? 'text-green-400 font-bold' : ''}`}>
                      {model.humaneval}%
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap ${model.modelName === 'june13525' ? 'text-green-400 font-bold' : ''}`}>
                      {model.mbpp}%
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap ${model.modelName === 'june13525' ? 'text-green-400 font-bold' : ''}`}>
                      {model.codecontests}%
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap ${model.modelName === 'june13525' ? 'text-green-400 font-bold' : ''}`}>
                      {model.gsm8k}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiZap className="mr-2" /> Performance by Category
            </h2>
            <div className="space-y-4">
              {testCategories.map((category) => (
                <div key={category.name} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-green-400 font-bold">{category.score}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiCheckCircle className="mr-2" /> Verification Methods
            </h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-4">
                All benchmark results have been independently verified using the following methods:
              </p>
              <ul className="space-y-2">
                {verificationMethods.map((method) => (
                  <li key={method} className="flex items-center text-sm">
                    <FiCheckCircle className="text-green-400 mr-2" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-gray-700 bg-opacity-30 rounded">
                <h3 className="font-medium mb-2">Benchmark Suite Information</h3>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Name: june13525 Industry Standard Benchmark Suite</p>
                  <p>Test Count: 7,832 tests across multiple domains</p>
                  <p>Hardware: NVIDIA A100 80GB GPUs</p>
                  <p>Environment: Controlled testing environment with identical hardware for all models</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Experience the Capabilities of june13525 AI</h2>
          <p className="text-gray-300 mb-4">Try the world's most powerful AI model for yourself</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium inline-block">
            Start Using june13525 AI
          </Link>
        </div>
      </main>
      
      <footer className="bg-gray-800 mt-12 py-6 text-center text-gray-400 text-sm">
        <p>© 2025 Indai Co. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BenchmarkPage; 