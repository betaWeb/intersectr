# intersectr
An esay-to-use wrapper class over intersection observer API.


## Getting started
```javascript
const intersectr = new Intersectr()

intersectr.intersect('.my-item', (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})

// Intersecting from an intersection ratio
intersectr.intersectFrom('.my-item', .3, (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})

// Intersecting until an intersection ratio
intersectr.intersectUntil('.my-item', .8, (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})

// Intersecting between intersection ratios
intersectr.intersectUntil('.my-item', [.3, .8], (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```