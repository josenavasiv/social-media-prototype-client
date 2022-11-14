import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
import { useField, FieldHookConfig } from 'formik';

type InputFieldProps = FieldHookConfig<string> & {
	label: string;
	name: string;
	type: string;
};

const InputField = (props: InputFieldProps) => {
	const [field, { error }] = useField(props);

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{props.label}</FormLabel>
			<Input {...field} type={props.type} id={field.name} placeholder={props.placeholder} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};

export default InputField;

// This is making a generic field with formik
// (!! Double Exclamation casts string -> Boolean
// "" -> False
// "error message" -> True
