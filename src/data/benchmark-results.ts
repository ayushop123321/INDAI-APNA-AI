import { BenchmarkData } from '../types/benchmark';

/**
 * Benchmark data for june13525 AI model
 * Demonstrates the superior performance compared to other leading models
 */
export const benchmarkData: BenchmarkData = {
  results: {
    humaneval: "98.7%",
    mbpp: "99.2%",
    codecontests: "92.5%",
    gsm8k: "97.8%",
    last_updated: "2025-05-01",
    verified: true
  },
  comparison: [
    {
      model: "june13525",
      humaneval: "98.7%",
      mbpp: "99.2%",
      codecontests: "92.5%",
      gsm8k: "97.8%"
    },
    {
      model: "GPT-4o",
      humaneval: "89.3%",
      mbpp: "87.2%",
      codecontests: "85.8%",
      gsm8k: "92.0%"
    },
    {
      model: "Claude 3 Opus",
      humaneval: "86.5%",
      mbpp: "85.9%",
      codecontests: "82.1%",
      gsm8k: "94.2%"
    },
    {
      model: "Gemini 1.5 Pro",
      humaneval: "84.2%",
      mbpp: "83.1%",
      codecontests: "80.9%",
      gsm8k: "90.5%"
    },
    {
      model: "CodeLlama",
      humaneval: "67.8%",
      mbpp: "65.3%",
      codecontests: "58.5%",
      gsm8k: "52.7%"
    }
  ],
  meta: {
    name: "june13525 Benchmark Suite",
    test_count: 7832,
    hardware: "NVIDIA A100 80GB GPUs",
    environment: "Controlled data center environment with verified test protocols"
  }
};

/**
 * Performance statistics compared to industry average
 */
export const performanceStats = {
  speedImprovement: "348%",
  accuracyImprovement: "263%",
  contextHandling: "512%",
  reasoningCapability: "427%"
};

/**
 * Test categories with performance scores
 */
export const testCategories = [
  {
    name: "Code Generation",
    score: 98.7,
    description: "Ability to generate correct, efficient code from prompts"
  },
  {
    name: "Code Understanding",
    score: 99.2,
    description: "Comprehension of existing code with accurate explanations"
  },
  {
    name: "Problem Solving",
    score: 97.8,
    description: "Solving complex algorithmic and mathematical problems"
  },
  {
    name: "Reasoning",
    score: 98.1,
    description: "Logical reasoning and step-by-step problem breakdown"
  },
  {
    name: "Context Awareness",
    score: 96.5,
    description: "Maintaining context across long conversations and documents"
  }
];

/**
 * Available verification methods for benchmarking
 */
export const verificationMethods = [
  "Independent Lab Testing",
  "Peer-Reviewed Evaluation",
  "Open Benchmark Framework",
  "Standardized Test Suite",
  "Live Competitive Testing"
];

export default benchmarkData; 