package benchmark

import (
	"context"
)

//Generator provides a standardized way to get successive benchmarks from a consistent interface
type Generator interface {
	Generator() bool
	GetBenchmark() (context.Context, BenchmarkConfig, error)
	SetBenchmarkResults(BenchmarkResult) error
}

// Linear generator will generate benchmarks between a
// lower and upper bound using a fixed step.
type Linear struct {
	LowerBound         int `yaml:"LowerBound"`
	UpperBound         int `yaml:"UpperBound"`
	Step               int `yaml:"Step"`
	MinimumMeasurments int `yaml:"MinimumMeasurments"`
	MiminumWindow      int `yaml:"MinimumWindow"`
}


