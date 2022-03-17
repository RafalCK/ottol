import { setLocale } from "yup";

export default setLocale({
	mixed: {
		default: "Não é válido",
	},
	number: {
		min: "Deve ser maior que ${min}",
		max: "Maksymalna liczba to ${max}",
	},
});
