import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string) {
	const [data, setData] = useState<T | null>(() => {
		const data = localStorage.getItem(key);
		return data ? (JSON.parse(data) as T) : null;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(data));
	}, [data, key]);

	return [data, setData] as const;
}
