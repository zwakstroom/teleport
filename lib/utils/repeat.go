package utils

import (
	"io"
)

// NewRepeatReader returns a repeat reader
func NewRepeatReader(repeat byte, count int) *RepeatReader {
	return &RepeatReader{
		repeat: repeat,
		count:  count,
	}
}

// RepeatReader repeats the same byte count times
// without allocating any data, the single instance
// of the repeat reader is not goroutine safe
type RepeatReader struct {
	repeat byte
	count  int
	read   int
}

// Read copies the same byte over and over to the data count times
func (r *RepeatReader) Read(data []byte) (int, error) {
	if r.read >= r.count {
		return 0, io.EOF
	}
	var copied int
	for i := 0; i < len(data); i++ {
		data[i] = r.repeat
		copied++
		r.read++
		if r.read >= r.count {
			break
		}
	}
	return copied, nil
}
