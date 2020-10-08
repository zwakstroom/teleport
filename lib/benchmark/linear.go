package benchmark

import (
	"context"
)

// Generate advances the Generator to the next generation.
// It returns false when the generator no longer has configurations to run.
func (l *Linear) Generate() bool {

	

	// will need to create 5 benchmark structs, run them after another

	return false
}


// linear:
//   lowerBound: 10rps
//   upperBound: 50rps
//   step: 10rps
//   minimumMeasurements: 1000
//   minimumWindow: 30s


// GetBenchmark returns the benchmark for the current generation.
// If called after Generate() returns false, this will result in an error.
func (l *Linear) GetBenchmark() (context.Context, Config, error) {
	
	return nil, Config{}, nil
}

// SetBenchmarkResults  provides the results
// from the current generation to the generator, so that it may adapt future
// generations based on the latency profile of the current generation.
// Not all BenchmarkGenerators need this functionality, and may ignore the data if so.
func (l *Linear) SetBenchmarkResults(br Result) error {

	return nil
}
