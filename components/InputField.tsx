import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Textarea } from '@chakra-ui/react';
import { useField, FieldHookConfig } from 'formik';

type InputFieldProps = FieldHookConfig<string> & {
	label: string;
	name: string;
	type: string;
	textarea?: boolean;
};

const InputField = (props: InputFieldProps) => {
	const [field, { error }] = useField(props);
	let InputOrTextarea: any = Input;
	if (props.textarea) {
		InputOrTextarea = Textarea;
	}
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{props.label}</FormLabel>
			<InputOrTextarea {...field} type={props.type} id={field.name} placeholder={props.placeholder} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};

export default InputField;

// This is making a generic field with formik
// (!! Double Exclamation casts string -> Boolean
// "" -> False
// "error message" -> True
