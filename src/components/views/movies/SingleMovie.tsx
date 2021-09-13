import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../../services";

interface IParams {
	id: string | undefined;
}

export function SingleMovie() {
	const { id } = useParams<IParams>();
	const { data } = useQuery(["movie", Number(id)], () => getMovieById(Number(id)));

	console.log(data);

	return <div></div>;
}
