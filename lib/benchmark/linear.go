package benchmark

import (
	"context"
	"errors"
	"time"
)

// Linear generator will generate benchmarks between a
// lower and upper bound using a fixed step.
type Linear struct {
	LowerBound        int           `yaml:"LowerBound"`
	UpperBound        int           `yaml:"UpperBound"`
	Step              int           `yaml:"Step"`
	MinimumMeasurment int           `yaml:"MinimumMeasurments"`
	MinimumWindow     time.Duration `yaml:"MinimumWindow"`
	currentRPS        int
	config            Config
}

// Generate advances the Generator to the next generation.
// It returns false when the generator no longer has configurations to run.
func (l *Linear) Generate() bool {

	if l.currentRPS < l.LowerBound {
		l.currentRPS = l.LowerBound
		return true
	}
	
	l.currentRPS += l.Step

	if l.currentRPS > l.UpperBound {
		return false
	}
	return true
}

// GetBenchmark returns the benchmark for the current generation.
// If called after Generate() returns false, this will result in an error.
func (l *Linear) GetBenchmark() (context.Context, Config, error) {
	if l.currentRPS > l.UpperBound {
		return nil, Config{}, errors.New("No more generations")
	}
	var currentConfig Config
	currentConfig = l.config
	currentConfig.Rate = l.currentRPS

	return context.TODO(), currentConfig, nil
}

// SetBenchmarkResults  provides the results
// from the current generation to the generator, so that it may adapt future
// generations based on the latency profile of the current generation.
// Not all BenchmarkGenerators need this functionality, and may ignore the data if so.
func (l *Linear) SetBenchmarkResults(br Result) error {

	return nil
}
