/**
 * Benchmark result types for june13525 AI
 */

export interface BenchmarkResults {
  /**
   * HumanEval benchmark score (0-100%)
   */
  humaneval: string;
  
  /**
   * MBPP (Mostly Basic Programming Problems) score (0-100%)
   */
  mbpp: string;
  
  /**
   * CodeContests benchmark score (0-100%)
   */
  codecontests: string;
  
  /**
   * GSM8K (Grade School Math 8K) score (0-100%)
   */
  gsm8k: string;
  
  /**
   * Date when benchmarks were last run
   */
  last_updated?: string;
  
  /**
   * Verification status of the benchmarks
   */
  verified?: boolean;
}

/**
 * Comparison of benchmark results against other models
 */
export interface BenchmarkComparison {
  /**
   * Model name
   */
  model: string;
  
  /**
   * HumanEval benchmark score (0-100%)
   */
  humaneval: string;
  
  /**
   * MBPP score (0-100%)
   */
  mbpp: string;
  
  /**
   * CodeContests score (0-100%)
   */
  codecontests: string;
  
  /**
   * GSM8K score (0-100%)
   */
  gsm8k: string;
}

/**
 * Benchmark test metadata
 */
export interface BenchmarkMeta {
  /**
   * Name of the benchmark suite
   */
  name: string;
  
  /**
   * Number of tests in the benchmark
   */
  test_count: number;
  
  /**
   * Hardware used for benchmarking
   */
  hardware?: string;
  
  /**
   * Software environment details
   */
  environment?: string;
}

/**
 * Complete benchmark data
 */
export interface BenchmarkData {
  /**
   * Results for the current model
   */
  results: BenchmarkResults;
  
  /**
   * Comparison with other models
   */
  comparison?: BenchmarkComparison[];
  
  /**
   * Metadata about the benchmark tests
   */
  meta?: BenchmarkMeta;
} 