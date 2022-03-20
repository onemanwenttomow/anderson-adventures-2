import { defineStore } from 'pinia';
export const useLevelStore = defineStore('level', {
	state: () => {
		return {
			level: 0,
			timesTables: [
            [ 10 ],
            [ 2 , 5 ],
            [ 3 , 4 ],
            [ 6 , 8 ],
            [ 6 , 7 , 9]
			],
			monsters: [
				[
					{ imgUrl: '/monsters/15_boss_xxx.png', lives: 3 },
					{ imgUrl: '/monsters/03_boss_xxx.png', lives: 3 },
					{ imgUrl: '/monsters/08_boss_xxx.png', lives: 3 }
				],
				[
					{ imgUrl: '/monsters/04_boss_xxx.png', lives: 4 },
					{ imgUrl: '/monsters/07_boss_xxx.png', lives: 4 },
					{ imgUrl: '/monsters/09_boss_xxx.png', lives: 4 },
				],
				[
					{ imgUrl: '/monsters/11_boss_xxx.png', lives: 5 },
					{ imgUrl: '/monsters/13_boss_xxx.png', lives: 5 },
					{ imgUrl: '/monsters/14_boss_xxx.png', lives: 5 },
				],
				[
					{ imgUrl: '/monsters/15_boss_xxx.png', lives: 6 },
					{ imgUrl: '/monsters/16_boss_xxx.png', lives: 6 },
					{ imgUrl: '/monsters/17_boss_xxx.png', lives: 6 },
				],
				[
					{ imgUrl: '/monsters/19_boss_xxx.png', lives: 7 },
					{ imgUrl: '/monsters/21_boss_xxx.png', lives: 7 },
					{ imgUrl: '/monsters/22_boss_xxx.png', lives: 7 },
				]
			]
		};
	},
	actions: {
		increaseLevel() {
      this.level++
		},
		enemyLosesHeart() {
			this.currentMonster.lives--;
		}
	},
	getters: {
		currentTimesTable: (state) => state.timesTables[state.level][Math.floor(Math.random() * state.timesTables[state.level].length)],
		currentMonster: (state) => state.monsters[state.level][Math.floor(Math.random() * state.monsters[state.level].length)]
  },
});
