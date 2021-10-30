<template>
  <div
    class="
      h-20
      w-20
      bg-blue-500
      m-1
      mr-4
      rounded
      outline-none
      border-2
      border-transparent
      cursor-pointer
      relative
      hover:border-pink-600
    "
  >
    <div id="left-eye" class="absolute h-2 w-2 bg-pink-600 rounded top-4 left-5"></div>
    <div id="right-eye" class="absolute h-2 w-2 bg-pink-600 rounded top-4 right-5"></div>
    <div id="mouth" class="absolute h-10 w-10 rounded-full border-b-transparent border-l-transparent border-4 border-pink-600 transform rotate-135 top-6 left-5"></div>
  </div>
</template>
