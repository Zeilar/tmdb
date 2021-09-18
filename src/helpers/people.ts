export function getGender(gender: number) {
	switch (gender) {
		case 0:
			return "Not specified.";
		case 1:
			return "Female";
		case 2:
			return "Male";
	}
}
