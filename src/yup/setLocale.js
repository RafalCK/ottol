import { setLocale } from "yup";

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
