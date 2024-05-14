import { useState } from "react";

type SetValue<T> = <K extends keyof T>(property: K, newValue: T[K]) => void;

function useFormValue<T>(initialValue: T): [T, SetValue<T>] {
	const [value, setValue] = useState<T>(initialValue);

	const handleValueChange: SetValue<T> = (property, newValue) => {
		setValue((prevState) => ({ ...prevState, [property]: newValue }));
	};

	return [value, handleValueChange];
}

export { useFormValue };
