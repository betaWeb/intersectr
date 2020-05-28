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

### Basic usage

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
<br>

### API

Intersectr comes with a very simple API.

#### observe

Unobserves the HTML element defined by the `target` parameter, and triggers the callback when its visible (depends on the global threshold ratio(s)).

```typescript
Intersectr.observe(
	target: Element|String, 
	callback: Function(entry: IntersectionObserverEntry)
): Intersectr
```

*Example :*
```javascript
intersectr.observe('.my-item', entry => {
	if (entry.isIntersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```

<br>

#### unobserve

Unobserves the HTML element defined by the `target` parameter. It deletes observables callbacks if `soft` parameter is false, does nothing otehrwise (useful with the `refresh()` method).

```typescript
Intersectr.unobserve(
	target: Element|String, 
	soft: Boolean = true
): Intersectr
```

*Example :*
```javascript
intersectr.unobserve('.my-item', true)
```

<br>


#### intersect

Observes the HTML element defined by the `target` parameter, and triggers the callback when its visible.
The main difference with the `observe()` method is that the callback function will expose `intersecting` parameter which is true if teh element is intersecting, false otherwise (depends on the global threshold ratio(s)).

```typescript
Intersectr.intersect(
	target: Element|String, 
	callback: Function(intersecting: Boolean, entry: IntersectionObserverEntry)
): Intersectr
```

*Example :*
```javascript
intersectr.intersect('.my-item', (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```

<br>

#### intersectFrom
Intersecting from an intersection ratio.

```typescript
Intersectr.intersectFrom(
	target: Element|String, 
	ratio: Number, 
	callback: Function(intersecting: Boolean, entry: IntersectionObserverEntry)
): Intersectr
```

*Example :*
```javascript
intersectr.intersectFrom('.my-item', .3, (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```

<br>

#### intersectUntil
Intersecting until an intersection ratio.

```typescript
Intersectr.intersectUntil(
	target: Element|String, 
	ratio: Number, 
	callback: Function(intersecting: Boolean, entry: IntersectionObserverEntry)
): Intersectr
```

*Example :*
```javascript
intersectr.intersectUntil('.my-item', .8, (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```

<br>

#### intersectBetween
Intersecting between intersection ratios.

```typescript
Intersectr.intersectBetween(
	target: Element|String, 
	ratios: Number[], 
	callback: Function(intersecting: Boolean, entry: IntersectionObserverEntry)
): Intersectr
```
*Example :*
```javascript
intersectr.intersectBetween('.my-item', [.3, .8], (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true)
	}
})
```

<br>

#### refresh
Refresh all observers. Useful to observe again 'soft' unobserved entries.

```typescript
Intersectr.refresh(): Intersectr
```
*Example :*
```javascript
intersectr.intersectBetween('.my-item', [.3, .8], (intersecting, entry) => {
	if (intersecting) {
		entry.target.classList.add('intersected')
		entry.unobserve(true) // soft unobserve
	}
})

// ...

intersectr.refresh() // will observe again the 'soft' unobserved entry above
```

<br>

#### destroy
```typescript
Intersectr.destroy(): void
```
