<script setup lang="ts">
// const base_url = 'http://localhost:8000'
// const api_url = 'http://localhost:8000/api/v1'
const base_url = ''
const api_url = '/api/v1'
const pharecLogo = new URL('/pharec-96.PNG', import.meta.url).href

let url = $ref('')
const fix_url = () => {
  if (url.slice(0, 4) !== "http"){
    url = 'http://' + url
  } 
}
let resp = $ref({
  url: '', 
  predicted_domain: '',
  image_path: ''
})

const request_check = async (url: String) => {
  const response = await fetch(`${api_url}/check_url`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      description: 'Sent by frontend',
    }),
  })
  // console.log('Response', response.json())
  // return JSON.stringify(response.json())
  return response.json()
}

const check_url = async () => {
  if (url)
    fix_url()
    resp = await request_check(url)
}
const fill_example = (n: Number) => {
  if (n === 1)
    url = 'https://apple.com'
  else if (n === 2)
    url = 'https://dropbox.com/login'
  else
    url = url
} 

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-2xl>
      <div i-carbon-fish inline-block />
    </div>

    <section class="rounded-full container m-auto">
      <img 
      :src="pharecLogo"
      class="rounded-full m-auto p2 object-center"
      />
    </section>

    <p>
      <a rel="noreferrer" href="https://pharec-dl.tech" target="_blank">
        {{ t('intro.name') }}
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-1 />

    <section class="container m-auto object-center w-1/3 rounded-lg">
      <img v-if="resp.image_path" 
      :src="`${base_url}/${resp.image_path}`"
      class="rounded m1"/>
    </section>

    <div py-1 />

    <div>
      <p v-if="resp.url" class="text-sm opacity75">
        {{ t('result.website') }}: {{ url }}
      </p>
    </div>

    <div py-1 />

    <div>
      <p v-if="resp.predicted_domain" class="text-sm">
        {{ t('result.predicted_domain') }}: {{ resp.predicted_domain }}
      </p>
    </div>

    <div py-4 />

    <div p-1>
      <p text-sm inline>Example: </p>
      <button
        px-2 text-sm rounded-full bg-teal-600
        @click="fill_example(1)"
      >
      apple.com
      </button>
      <p pe-1 inline text-sm>,</p>
      <button
        px-2 text-sm rounded-full bg-teal-600
        @click="fill_example(2)"
      >
      dropbox.com/login
      </button>
    </div>

    <input
      id="input-url"
      v-model="url"
      :placeholder="t('intro.enter-url')"
      :aria-label="t('intro.enter-url')"
      type="url"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="check_url"
    >

    <div>
      <button
        btn m-3 text-sm
        :disabled="!url || url.length > 25"
        @click="check_url"
      >
        {{ t('button.check-url') }}
      </button>
    </div>

  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
