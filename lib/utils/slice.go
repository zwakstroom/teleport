package utils

import (
	"sync"
)

// SlicePool manages a pool of slices
// in attempts to manage memory in go more efficiently
// and avoid frequent allocations
type SlicePool interface {
	// Zero zeroes slice
	Zero(b []byte)
	// Get returns a new or already allocated slice
	Get() []byte
	// Put returns slice back to the pool
	Put(b []byte)
	// Size returns a slice size
	Size() int64
}

// NewSliceSyncPool returns a new slice pool, using sync.Pool
// of pre-allocated or newly allocated slices of the predefined size and capacity
func NewSliceSyncPool(sliceSize int64) *SliceSyncPool {
	s := &SliceSyncPool{
		sliceSize: sliceSize,
		zeroSlice: make([]byte, sliceSize),
	}
	s.New = func() interface{} {
		return make([]byte, s.sliceSize)
	}
	return s
}

// SliceSyncPool is a sync pool of slices (usually large)
// of the same size to optimize memory usage, see sync.Pool for more details
type SliceSyncPool struct {
	sync.Pool
	sliceSize int64
	zeroSlice []byte
}

// Zero zeroes slice of any length
func (s *SliceSyncPool) Zero(b []byte) {
	if len(b) <= len(s.zeroSlice) {
		// zero all bytes in the slice to avoid
		// data lingering in memory
		copy(b, s.zeroSlice[:len(b)])
	} else {
		// use working, but less optimal implementation
		for i := 0; i < len(b); i++ {
			b[i] = 0
		}
	}
}

// Get returns a new or already allocated slice
func (s *SliceSyncPool) Get() []byte {
	return s.Pool.Get().([]byte)
}

// Put returns slice back to the pool
func (s *SliceSyncPool) Put(b []byte) {
	s.Zero(b)
	s.Pool.Put(b)
}

// Size returns a slice size
func (s *SliceSyncPool) Size() int64 {
	return s.sliceSize
}
