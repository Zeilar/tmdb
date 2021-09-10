import { useEffect } from "react";

export default function useRemoveScroll(enabled: boolean = true) {
	useEffect(() => {
		document.body.style.overflowY = enabled ? "hidden" : "overlay";
		return () => {
			document.body.style.overflowY = "overlay";
		};
	}, [enabled]);
}
