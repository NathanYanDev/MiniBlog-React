// Importing hooks from React and React Router
import { useLocation } from "react-router";
import { useMemo } from "react";

// Custom hook that returns a memoized URLSearchParams object based on the current search query in the URL.
export const useQuery = () => {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
};
