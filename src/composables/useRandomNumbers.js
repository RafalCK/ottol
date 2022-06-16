import { computed, ref } from "vue";

export default () => {
	function getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function drawNumbers(maxNumber, randomNumbers, winnerNumbers, submittedNumbers, addCredits, minRandom, maxRandom) {
		let number;
		let numberInArray;
		for (let i = 0; i < maxNumber; i++) {
			let rev = i;
			setTimeout(function () {
				do {
					number = getRandom(minRandom, maxRandom);
					numberInArray = randomNumbers.value.includes(number);
					if (!numberInArray) {
						randomNumbers.value.push(number);
					}
				} while (numberInArray);
				winnerNumbers.value = submittedNumbers.value.filter((element) => randomNumbers.value.includes(element));
				console.log(winnerNumbers.value);
				if (i == maxNumber - 1) {
					addCredits();
				}
			}, 1500 * (rev + 1));
		}
	}

	// function drawNumbers(maxNumber = 5, numberInArray = []) {
	// 	const number = getRandom(1, 49);
	// 	setTimeout(function () {
	// 		if (!numberInArray.includes(number)) {
	// 			numberInArray.push(number);
	// 		}
	// 		if (numberInArray.length < maxNumber) {
	// 			drawNumbers(maxNumber, numberInArray);
	// 		}
	// 	});
	// 	return numberInArray;
	// }

	return {
		getRandom,
		drawNumbers,
	};
};
