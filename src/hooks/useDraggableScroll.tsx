import { useEffect, useState, useRef } from "react";

export function useDraggableScroll<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const [isMouseHeldInsideElement, setIsMouseHeldInsideElement] = useState(false);

	// console.log(isMouseHeldInsideElement);

	useEffect(() => {
		function mouseDownHandler(e: MouseEvent) {
			if (ref.current?.contains(e.target as Node)) {
				setIsMouseHeldInsideElement(true);
			}
		}

		function mouseUpHandler() {
			// console.log("mouse up, go flase");
			setIsMouseHeldInsideElement(false);
		}

		function mouseMoveHandler(e: MouseEvent) {
			if (!isMouseHeldInsideElement) return;
			// scrollLeft = scrollLeft - clientX + event.clientX;

			console.log(e.clientX, ref.current?.scrollLeft);
			if (ref.current) {
				// ref.current.scrollLeft =
			}

			// console.log("go");
		}

		document.addEventListener("mousemove", mouseMoveHandler);
		document.addEventListener("mousedown", mouseDownHandler);
		document.addEventListener("mouseup", mouseUpHandler);

		document.addEventListener("dragend", () => {
			setIsMouseHeldInsideElement(false);
		});

		return () => {
			document.removeEventListener("mousemove", mouseMoveHandler);
			document.removeEventListener("mousedown", mouseDownHandler);
			document.removeEventListener("mouseup", mouseUpHandler);
		};
	}, [isMouseHeldInsideElement]);

	return ref;
}
