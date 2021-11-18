export function useIconColor() {
  const colorsArray = ref([
    'from-pink-400 to-purple-500 hover:border-yellow-500',
    'from-red-400 to-yellow-500 hover:border-pink-600',
    'from-green-400 to-blue-500 hover:border-orange-600',
  ]);

  let randomColorIndex = Math.floor(Math.random() * colorsArray.value.length);
  let iconColor = ref(colorsArray.value[randomColorIndex]);

  function newColor() {
    randomColorIndex++;
    if (randomColorIndex >= colorsArray.value.length) {
      randomColorIndex = 0;
    }
    iconColor.value = colorsArray.value[randomColorIndex];
  }

  return {
    iconColor,
    newColor,
  };
}
