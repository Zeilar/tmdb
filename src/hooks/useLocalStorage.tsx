import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string) {
	const [data, setData] = useState<T>(() => {
		const data = localStorage.getItem(key);
		if (data === null) return data;
		return JSON.parse(data);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(data));
	}, [data, key]);

	return [data, setData] as const;
}
