import { useOptionsStore } from '~/stores/options';
import { usePlayersStore } from '~/stores/players';
// import { useLevelStore } from '~/stores/players';


async function waitFor(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

export function useGameLogic() {

	const { $howler } = useNuxtApp();
	const { vibration } = useOptionsStore();

	const damageClasses = ref(['']);
	const enemyDamaged = ref(false);
	const playerDamaged = ref(false);
	const bossDefeated = ref(false);

	// set this based on the level...
	const enemyHearts = ref(3);

	// move this to global state
	const level = ref(0);
	const { playerSelected } = usePlayersStore();

	// replace 10 with the times table based on the level (or global state)
	const randomTimesTable = ref(Math.floor(Math.random() * 10 + 1));

	const damageTime = ref(500);
	const damageTimeMs = computed(() => damageTime.value + 'ms');


	function setRandomTimesTable() {
		// replace 10 with the times table based on the level (or global state)
		let newRandomNumber = Math.floor(Math.random() * 10 + 1);
		while (randomTimesTable.value === newRandomNumber) {
			// replace 10 with the times table based on the level (or global state)
			newRandomNumber = Math.floor(Math.random() * 10 + 1);
		}
		randomTimesTable.value = newRandomNumber;
	}

	async function handleBossDefeat() {
		console.log('level: ', level.value);
		level.value++
		console.log('NEXT LEVEL');
		console.log('level: ', level.value);
		enemyDamaged.value = true;
		await waitFor(300);
		vibration && window.navigator.vibrate([500, 300, 500, 300, 1000]);
		damageClasses.value.push('shake wounded');
		$howler.bossDefeat.play();
		await waitFor(500);
		damageClasses.value = [];
		await waitFor(300);
		$howler.bossDefeat.play();
		damageClasses.value.push('shake wounded');
		await waitFor(500);
		damageClasses.value = [];
		await waitFor(300);
		$howler.bossDefeat.play();
		damageClasses.value.push('shake, fade');
		await waitFor(500);
		bossDefeated.value = true;
	}

	function dealDamage() {
		enemyDamaged.value && enemyHearts.value--;
		playerDamaged.value && playerSelected.timesTablesHearts--;

		if (enemyDamaged.value) {
			setRandomTimesTable();
		}

		damageClasses.value = [];
		playerDamaged.value = false;
		enemyDamaged.value = false;

		if (playerSelected.timesTablesHearts === 0) {
			console.log('GAME OVER!');
		}
		if (enemyHearts.value === 0) {
			handleBossDefeat();
		}
	}

	function handleDamage(input) {
		$howler.hit.play();
		damageClasses.value.push('shake wounded');
		vibration && window.navigator.vibrate(damageTime.value);
		console.log('randomNumber.value: ', randomTimesTable.value);
		console.log('input: ', input);

		// replace 10 with the times table based on the level (or global state)
		if (input == 10 * randomTimesTable.value) {
			enemyDamaged.value = true;
		} else {
			playerDamaged.value = true;
		}
		setTimeout(dealDamage, damageTime.value);
	}

	return {
		damageClasses,
		enemyDamaged,
		playerDamaged,
		bossDefeated,
		enemyHearts,
		handleDamage,
		randomTimesTable,
		damageTimeMs
	};
}
