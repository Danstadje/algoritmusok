<template>
  <header class="top">
    <span class="brand">Algo Lab</span>
    <nav>
      <RouterLink to="/permutation">Szép permutáció</RouterLink>
      <RouterLink to="/playlist">Lejátszási lista</RouterLink>
    </nav>
  </header>
  <main><RouterView :key="$route.path" /></main>
</template>
