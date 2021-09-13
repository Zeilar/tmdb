import { Location, History } from "history";

export interface RouteComponentProps<T> {
	match: Match<T>;
	location: Location;
	history: History;
	staticContext?: any;
}

export interface Match {
	params: Params;
	isExact: boolean;
	path: string;
	url: string;
}
