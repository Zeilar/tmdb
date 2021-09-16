export interface IPerson {
	known_for_department: string;
	id: number;
	name: string;
	adult: boolean;
	gender: 0 | 1 | 2 | 3;
	popularity: number;
}

export interface ISinglePerson extends IPerson {
	birthday: string | null;
	deathday: null | string;
	also_known_as: string[];
	biography: string;
	place_of_birth: string | null;
	profile_path: string | null;
	imdb_id: string;
	homepage: null | string;
}

export interface ICreditPerson extends IPerson {
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
}

export interface ICast extends ICreditPerson {
	cast_id: number;
	character: string;
	order: number;
}

export interface ICrew extends ICreditPerson {
	department: string;
	job: string;
}
