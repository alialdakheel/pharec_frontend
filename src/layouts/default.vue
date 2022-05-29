<template>
  <main class="px-4 py-2 text-center text-gray-700 dark:text-gray-200 opacity75">
    <div mb-1 dark:color-amber-300 color-amber-700 text-sm dark:bg-amber-900 bg-amber-600 bg-opacity50 opacity75>
      <RouterLink to="/" title="Home" icon-btn>
        Click to get back to home page.
      </RouterLink>
    </div>
    <RouterView />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      Visit <a href="https://pharec-dl.tech"> pharec-dl.tech</a>
    </div>
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      Copyright © AliAldakheel
    </div>
  </main>
</template>
