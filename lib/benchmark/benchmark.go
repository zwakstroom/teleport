package benchmark

import (
	"context"
)

//Generator provides a standardized way to get successive benchmarks from a consistent interface
type Generator interface {
	Generator() bool
	GetBenchmark() (context.Context, Config, error)
	SetBenchmarkResults(Result) error
}

// Linear generator will generate benchmarks between a
// lower and upper bound using a fixed step.
type Linear struct {
	LowerBound         int `yaml:"LowerBound"`
	UpperBound         int `yaml:"UpperBound"`
	Step               int `yaml:"Step"`
	MinimumMeasurment int `yaml:"MinimumMeasurments"`
	MiminumWindow      int `yaml:"MinimumWindow"`
}


