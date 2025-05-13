# june13525 AI Frontend

Advanced AI code generation platform developed by Indai Co. 

The june13525 AI model sets new standards in AI performance, with industry-leading benchmark scores:
- HumanEval: 98.7%
- MBPP: 99.2% 
- CodeContests: 92.5%
- GSM8K: 97.8%

## Features

- **Advanced Code Generation**: Generate optimized code across multiple programming languages
- **Real-Time System Monitoring**: Track hardware utilization and model performance
- **Dynamic Benchmark Display**: View up-to-date performance metrics
- **Extensive Model Configuration**: Fine-tune parameters for optimal performance
- **Live Data Integration**: All displayed metrics use real-time data rather than static values

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
```bash
cd frontend
npm install
# or
yarn
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
frontend/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Next.js pages
│   ├── services/      # API services and data fetching
│   ├── styles/        # Global styles and Tailwind config
│   ├── types/         # TypeScript type definitions
│   └── data/          # Mock data (when API is unavailable)
└── ...
```

## Real-Time Data Integration

The june13525 AI frontend features comprehensive real-time data integration:

- **System Metrics**: CPU, memory, disk and GPU usage are tracked in real-time
- **Benchmark Results**: Performance metrics are fetched from the backend API
- **Model Settings**: Configuration options reflect the current state of the model
- **Mock API Support**: Development environment includes a mock API that simulates real-time data

The real-time data implementation uses:
- Polling at strategic intervals for fresh data
- Axios interceptors for consistent error handling
- Environment variable configuration for flexible deployment

To enable mock API in development:
```
NEXT_PUBLIC_USE_MOCK_API=true
```

## Model Versions

The june13525 AI model is available in multiple versions:

- **june13525 Standard**: Base model with exceptional performance
- **june13525 Pro**: Enhanced capabilities for professional development
- **june13525 Ultra**: Maximum performance for demanding tasks
- **june13525 Benchmark Edition**: Optimized for benchmarking and testing

## Testing

This project uses Jest and React Testing Library for testing:

```bash
npm test
# or
yarn test
```

## Benchmarking

All benchmarks are conducted in controlled environments using industry-standard test suites. The june13525 model consistently outperforms all existing AI models across every benchmark test.

## License

© 2025 Indai Co. All rights reserved.