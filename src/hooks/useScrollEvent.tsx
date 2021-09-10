import { useEffect } from "react";

export function useScrollEvent(callback: () => void, offset: number = 0.9) {
	useEffect(() => {
		let scrollY = window.scrollY; // Keep previous value to detect if user scrolled up or down

		function scrollHandler() {
			// Hide scroll-to-top button if scrolled past 1500 pixels
			// setScrollToTopVisible(window.scrollY >= 1500 ? true : false);

			const scrollPosition = window.innerHeight + window.scrollY;
			const bottomPosition = document.body.offsetHeight;

			// Fire callback if screen is scrolled past <offset * 100>% of the document height and if scroll direction was downwards
			if (window.scrollY > scrollY && scrollPosition >= bottomPosition * offset) {
				callback();
			}

			scrollY = window.scrollY;
		}

		document.addEventListener("scroll", scrollHandler);

		return () => {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, [callback, offset]);
}
