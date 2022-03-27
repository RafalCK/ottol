import { setLocale, mixed, addMethod } from "yup";

export default setLocale({
	mixed: {
		required: "To pole jest wymagane",
	},
	number: {
		min: "Minimalna liczba to ${min}",
		max: "Maksymalna liczba to ${max}",
		notType: "This is not a number",
	},
});

function empty() {
	return this.nullable().transform((value, orginalValue) => {
		if (this.isType(value)) return value;

		value = String(orginalValue).trim() === "" ? null : value;

		return value;
	});
}

addMethod(mixed, "empty", empty);
