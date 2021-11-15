export function usePlayerCharacter() {
  const charactersArray = ref([
    "/character_femaleAdventurer_wide.png",
    "/character_femalePerson_wide.png",
    "/character_maleAdventurer_wide.png",
    "/character_malePerson_wide.png",
    "/character_robot_wide.png",
    "/character_zombie_wide.png"
  ]);

  const randomColorIndex = Math.floor(Math.random() * charactersArray.value.length);
  let character = ref(charactersArray.value[randomColorIndex]);

  return {
    character
  };
}
