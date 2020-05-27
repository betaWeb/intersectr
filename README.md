# intersectr
An esay-to-use wrapper class over intersection observer API.

You can find a simple demo [here](https://codepen.io/betaweb/pen/eYpaLLB).

<br>
<br>

## Getting started

### Installation
You just have to import `Intersectr.js` class into your HTML page :
```html
<script type="text/javascript" src="/path/to/Intersectr.js" defer></script>
```

<br>

And you can use Intersectr class like so :
```javascript
document.addEventListener('DOMContentLoaded', _ => {

	const intersectr = new Intersectr()

	intersectr.intersect('.my-item', (intersecting, entry) => {
		if (intersecting) {
			entry.target.classList.add('intersected')
			entry.unobserve(true)
		}
	})

})
```
And.. That's it ! Easy, isn't it ? :)

<br>

### Basic usage

```javascript
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
intersectr.intersectBetween('.my-item', [.3, .8], (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```