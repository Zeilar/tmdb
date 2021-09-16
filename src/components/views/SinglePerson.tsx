import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPersonById } from "../../services";

interface IParams {
	id?: string | undefined;
}

export function SinglePerson() {
	const { id } = useParams<IParams>();
	const { data } = useQuery(["person", Number(id)], () => getPersonById(Number(id)));

	console.log(data);

	return <div>{id}</div>;
}
