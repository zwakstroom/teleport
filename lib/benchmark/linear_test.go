package benchmark

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/google/go-cmp/cmp"
)

func TestGenerate(t *testing.T) {
	d, _ := time.ParseDuration("30s")

	initial := Config{
		Threads:            10,
		Rate:               0,
		Command:            []string{"ls"},
		Interactive:        false,
		MinimumWindow:      d,
		MinimumMeasurment: 0,
	}

	linearConfig := Linear{
		LowerBound:        10,
		UpperBound:        50,
		Step:              10,
		MinimumMeasurment: 1000,
		MinimumWindow:     d,
		config:            initial,
	}
	// First generation
	res := linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate first generation")
	}

	_, bm, err := linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}
	expected := initial
	expected.Rate = 10
	assert.Empty(t, cmp.Diff(expected, bm))
	// Second generation
	res = linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate #2 generation")
	}

	_, bm, err = linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}

	expected.Rate = 20
	assert.Empty(t, cmp.Diff(expected, bm))

	// Third generation
	res = linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate #3 generation")
	}

	_, bm, err = linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}
	expected.Rate = 30
	assert.Empty(t, cmp.Diff(expected, bm))

	// Fourth generation
	res = linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate #4 generation")
	}

	_, bm, err = linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}
	expected.Rate = 40
	assert.Empty(t, cmp.Diff(expected, bm))

	// Fifth generation
	res = linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate #5 generation")
	}

	_, bm, err = linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}
	expected.Rate = 50
	assert.Empty(t, cmp.Diff(expected, bm))

	// Sixth generation, should return false
	res = linearConfig.Generate()
	if res != false {
		t.Errorf("expected false, got true")
	}

	_, bm, err = linearConfig.GetBenchmark()
	if err == nil {
		t.Errorf("generating more benchmarks than expected")
	}
}

func TestGenerateNotEvenMultiple(t *testing.T) {

	d, _ := time.ParseDuration("30s")

	initial := Config{
		Threads:            10,
		Rate:               0,
		Command:            []string{"ls"},
		Interactive:        false,
		MinimumWindow:      d,
		MinimumMeasurment: 0,
	}

	linearConfig := Linear{
		LowerBound:        10,
		UpperBound:        20,
		Step:              7,
		MinimumMeasurment: 1000,
		MinimumWindow:     d,
		config:            initial,
	}
	expected := initial
	res := linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate first generation")
	}

	_, bm, err := linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}
	expected.Rate = 10
	assert.Empty(t, cmp.Diff(expected, bm))

	// Second generation, rate = 17
	res = linearConfig.Generate()
	if res != true {
		t.Errorf("failed to generate first generation")
	}

	_, bm, err = linearConfig.GetBenchmark()
	if err != nil {
		t.Errorf("failed to get current benchmark")
	}
	expected.Rate = 17
	assert.Empty(t, cmp.Diff(expected, bm))

	// Third generation, rate > upper bound
	res = linearConfig.Generate()
	if res != false {
		t.Errorf("expected false, exceeded upper bound")
	}

	_, _, err = linearConfig.GetBenchmark()
	if err == nil {
		t.Errorf("generating more benchmarks than expected")
	}
	expected.Rate = 17
	assert.Empty(t, cmp.Diff(expected, bm))
}
