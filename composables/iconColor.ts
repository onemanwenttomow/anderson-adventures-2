export function useIconColor() {
  const colorsArray = ref([
    "from-pink-400 to-purple-500 hover:border-yellow-500",
    "from-red-400 to-yellow-500 hover:border-pink-600",
    "from-green-400 to-blue-500 hover:border-orange-600"
  ]);

  const randomColorIndex = Math.floor(Math.random() * colorsArray.value.length);
  let iconColor = ref(colorsArray.value[randomColorIndex]);

  function newColor() {
    const filteredColors = colorsArray.value.filter((colors) => colors !== iconColor.value);
    const randomColorIndex = Math.floor(Math.random() * filteredColors.length);
    iconColor.value = filteredColors[randomColorIndex];
  }

  return {
    iconColor,
    newColor
  };
}
