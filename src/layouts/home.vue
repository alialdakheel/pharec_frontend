<template>
  <main class="px-4 py-2 text-center text-gray-700 dark:text-gray-200">
    <div mb-1 dark:color-amber-300 color-amber-700 text-sm dark:bg-amber-900 bg-amber-600 bg-opacity25 opacity50>
      <RouterLink to="/supported_domains" title="supported domains" icon-btn>
        Warning: please be aware this is a alpha stage test demo,
        results are not completely reliable. Check supported domains.
      </RouterLink>
    </div>
    <RouterView />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-50 text-sm">
      Visit <a href="https://pharec-dl.tech"> pharec-dl.tech</a>
    </div>
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      Copyright © AliAldakheel
    </div>
  </main>
</template>
