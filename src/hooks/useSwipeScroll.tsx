import { useState, useEffect, useCallback, useRef } from "react";

export function useSwipeScroll<T extends HTMLElement>() {
	const momentumVelocity = 0.5;
	const [hasSwiped, setHasSwiped] = useState(false);
	const ref = useRef<T>(null);

	const init = useCallback(() => {
		if (!ref.current) return;

		const slider = ref.current;
		let isDown = false;
		let startX: number;
		let scrollLeft: number;

		slider.addEventListener("mousedown", (e: MouseEvent) => {
			isDown = true;
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
			cancelMomentumTracking();
		});

		slider.addEventListener("mouseleave", () => {
			isDown = false;
		});

		slider.addEventListener("mouseup", () => {
			isDown = false;
			beginMomentumTracking();
			setTimeout(() => setHasSwiped(false), 0);
		});

		slider.addEventListener("mousemove", (e: MouseEvent) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 3; //scroll-fast
			let prevScrollLeft = slider.scrollLeft;
			slider.scrollLeft = scrollLeft - walk;
			velX = slider.scrollLeft - prevScrollLeft;
			if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
				setHasSwiped(true);
			}
		});

		// Momentum
		let velX = 0;
		let momentumID: any;

		slider.addEventListener("wheel", () => {
			cancelMomentumTracking();
		});

		function beginMomentumTracking() {
			cancelMomentumTracking();
			momentumID = requestAnimationFrame(momentumLoop);
		}

		function cancelMomentumTracking() {
			cancelAnimationFrame(momentumID);
		}

		function momentumLoop() {
			slider.scrollLeft += velX;
			velX *= momentumVelocity;
			if (Math.abs(velX) > 0.5) {
				momentumID = requestAnimationFrame(momentumLoop);
			}
		}
	}, [hasSwiped, momentumVelocity]);

	useEffect(() => {
		init();
	}, [init]);

	return ref;
}
