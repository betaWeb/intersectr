class Intersectr {

	/**
	 * @returns {Object.<String, *>}
	 */
	static get DEFAULT_OPTIONS() {
		return {
			rootMargin: '0px',
			threshold: [1.0]
		}
	}

	/**
	 * @param {Number} num_steps 
	 * 
	 * @returns {Number[]}
	 * 
	 * @static
	 */
	static buildThresholdsList(num_steps = 20) {
		let thresholds = [0], i

		for (i = 1.0; i <= num_steps; i++) {
			thresholds.push(i / num_steps)
		}

		return thresholds
	}

	/**
	 * @param {Object.<String, *>} [options={}]
	 */
	constructor(options = {}) {
		this._handleEntries = this._handleEntries.bind(this)
		this._handleEntry = this._handleEntry.bind(this)

		if (options.threshold === undefined) {
			options.threshold = Intersectr.buildThresholdsList()
		}

		if (!Array.isArray(options.threshold)) {
			options.threshold = [options.threshold]
		}

		this.options = {
			...Intersectr.DEFAULT_OPTIONS,
			...options
		}

		try {
			this.observer = new IntersectionObserver(
				this._handleEntries,
				this.options
			)
		} catch (e) {
			throw e
		}

		this._observables = new Map()
	}

	/**
	 * @param {Element|String} target
	 * @param {Function} callback 
	 * 
	 * @returns {Intersectr}
	 */
	observe(target, callback) {
		if (typeof callback !== 'function') {
			throw new Error('[Err] Intersectr.observe - callback parameter must be a function')
		}

		try {
			target = this._getTargetElement(target)

			if (!this._observables.has(target)) {
				this._observables.set(target, [])
			}

			this._observables.get(target)
				.push(entry => {
					entry.unobserve = soft => this.unobserve(target, soft)
					entry.intersected = entry.boundingClientRect.top < 0 || entry.boundingClientRect.left < 0

					callback(entry)
				})

			this.observer.observe(target)
			return this
		} catch (e) {
			throw e
		}
	}

	/**
	 * @param {Element|String} target
	 * @param {Boolean} [soft=false]
	 * 
	 * @returns {Intersectr}
	 */
	unobserve(target, soft = true) {
		try {
			target = this._getTargetElement(target)
	
			this.observer.unobserve(target)

			if (soft === false) {
				this._observables.delete(target)
			}

			return this
		} catch(e) {
			throw e
		}
	}

	/**
	 * @param {Element|String} target
	 * @param {Function} callback
	 * 
	 * @returns {Intersectr}
	 */
	intersect(target, callback) {
		return this._intersect(
			target, 
			entry => callback(entry.isIntersecting, entry)
		)
	}

	/**
	 * @param {Element|String} target
	 * @param {Number[]} ratios
	 * @param {Function} callback
	 * 
	 * @returns {Intersectr}
	 */
	intersectBetween(target, ratios, callback) {
		const [min, max] = ratios
		if (
			!this.options.threshold.includes(min) ||
			!this.options.threshold.includes(max)
		) {
			throw new Error(`[Err] Intersectr.intersectBetween - ratios parameter array (${ratios.toString()}) must have values included on threshold option range (${this.options.threshold.toString()})`)
		}

		return this._intersect(target, entry => {
			callback(
				entry.intersectionRatio >= min && entry.intersectionRatio <= max, 
				entry
			)
		})
	}

	/**
	 * @param {Element|String} target
	 * @param {Number} ratio
	 * @param {Function} callback
	 * 
	 * @returns {Intersectr}
	 */
	intersectFrom(target, ratio, callback) {
		return this.intersectBetween(target, [ratio, 1], callback)
	}

	/**
	 * @param {Element|String} target
	 * @param {Number} ratio
	 * @param {Function} callback
	 * 
	 * @returns {Intersectr}
	 */
	intersectUntil(target, ratio, callback) {
		return this.intersectBetween(target, [0, ratio], callback)
	}

	/**
	 * @returns {Intersectr}
	 */
	refresh() {
		this._observables.forEach((_, target) => this.observer.observe(target))	

		return this
	}

	/**
	 * @returns {void}
	 */
	destroy() {
		this.observer.disconnect()
		this.observer = undefined
	}

	/**
	 * @param {Element|String} target
	 * @param {Function} callback
	 *
	 * @returns {Intersectr}
	 * 
	 * @private
	 */
	_intersect(target, callback) {
		return this.observe(target, callback)
	}

	/**
	 * @param {IntersectionObserverEntry[]} entries
	 * 
	 * @private
	 */
	_handleEntries(entries) {
		entries.forEach(this._handleEntry)
	}

	/**
	 * @param {IntersectionObserverEntry} entry
	 * 
	 * @private
	 */
	_handleEntry(entry) {
		if (this._observables.has(entry.target)) {
			this._observables.get(entry.target)
				.forEach(callback => callback(entry))
		}
	}

	/**
	 * @param {Element|String} target
	 *
	 * @returns {Element}
	 * 
	 * @private
	 */
	_getTargetElement(target) {
		const el = typeof target === 'string' 
			? (this.options.root || document).querySelector(target) 
			: target

		if (!el) {
			throw new Error('[Err] Intersectr - target not found on document')
		}

		return el
	}

}

if (!('Intersectr' in window)) {
	window['Intersectr'] = Intersectr
}
