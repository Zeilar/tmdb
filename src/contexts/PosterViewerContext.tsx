import { useEffect } from "react";
import { createContext, useContext, useState, ReactNode, Dispatch } from "react";

interface IPosterViewerContext {
	activePosterPath: string | null | undefined;
	setActivePosterPath: Dispatch<React.SetStateAction<string | null | undefined>>;
	closeViewer(): void;
}

export const PosterViewerContext = createContext({} as IPosterViewerContext);

interface Props {
	children: ReactNode;
}

export function usePosterViewerContext() {
	return useContext(PosterViewerContext);
}

export function PosterViewerContextProvider({ children }: Props) {
	const [activePosterPath, setActivePosterPath] = useState<string | null | undefined>(null);

	function closeViewer() {
		setActivePosterPath(null);
	}

	useEffect(() => {
		function keyHandler(e: KeyboardEvent) {
			console.log(e.key);
			if (e.key === "Escape") {
				closeViewer();
			}
		}
		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
	}, []);

	const values: IPosterViewerContext = {
		activePosterPath,
		setActivePosterPath,
		closeViewer,
	};

	return <PosterViewerContext.Provider value={values}>{children}</PosterViewerContext.Provider>;
}
