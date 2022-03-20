import { useOptionsStore } from '~/stores/options';
import { usePlayersStore } from '~/stores/players';
import { useLevelStore } from '~/stores/level';


async function waitFor(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

export function useGameLogic() {

	const { $howler } = useNuxtApp();
	const { vibration } = useOptionsStore();
	const levelState = useLevelStore();


	const damageClasses = ref(['']);
	const enemyDamaged = ref(false);
	const playerDamaged = ref(false);
	const bossDefeated = ref(false);
	const currentTimesTable = ref(10)
	const currentMonster = ref(levelState.currentMonster);

	const enemyHearts = ref(levelState.currentMonster.lives);

	const { playerSelected } = usePlayersStore();

	const randomQuestion = ref(Math.floor(Math.random() * 10 + 1));

	const damageTime = ref(500);
	const damageTimeMs = computed(() => damageTime.value + 'ms');


	function setRandomTimesTable() {
		let newRandomNumber = Math.floor(Math.random() * 10 + 1);
		while (randomQuestion.value === newRandomNumber) {
			newRandomNumber = Math.floor(Math.random() * 10 + 1);
		}
		randomQuestion.value = newRandomNumber;
	}

	async function handleBossDefeat() {
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


		levelState.increaseLevel();
		currentTimesTable.value = levelState.currentTimesTable;
		currentMonster.value = levelState.currentMonster;
		damageClasses.value = [];
		enemyHearts.value = levelState.level + 3
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
		if (input == currentTimesTable.value * randomQuestion.value) {
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
		randomQuestion,
		damageTimeMs,
		currentTimesTable,
		currentMonster
	};
}
