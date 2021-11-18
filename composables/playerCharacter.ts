export function usePlayerCharacter() {
  const charactersArray = ref([
    '/player/53_minion_01_xxx.png',
    '/player/70_minion_1_xxx.png',
    '/player/20_minion_02_xxx.png',
    '/player/20_minion_01_xxx.png',
    '/player/29_minion_01_xxx.png',
    '/player/34_minion_02_xxx.png',
    '/player/36_minion_02_xxx.png',
    '/player/45_minion_01_xxx.png',
  ]);

  let randomIndex = Math.floor(Math.random() * charactersArray.value.length);
  let character = ref(charactersArray.value[randomIndex]);

  function newCharacter() {
    randomIndex++;
    if (randomIndex >= charactersArray.value.length) {
      randomIndex = 0;
    }
    character.value = charactersArray.value[randomIndex];
  }

  return {
    character,
    newCharacter,
  };
}
