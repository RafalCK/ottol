import { computed, ref } from "vue";

export default () => {
	function getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function drawNumbers(maxNumber, randomNumbers, winnerNumbers, submittedNumbers, addCredits, minRandom, maxRandom, addResult) {
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
				if (i == maxNumber - 1) {
					addCredits();
					addResult();
				}
			}, 1500 * (rev + 1));
		}
	}

	return {
		getRandom,
		drawNumbers,
	};
};
