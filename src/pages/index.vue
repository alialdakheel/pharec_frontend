<script setup lang="ts">
import NProgress from 'nprogress'
// const base_url = 'http://localhost:8000'
// const api_url = 'http://localhost:8000/api/v1'
const base_url = ''
const api_url = '/api/v1'
const pharecLogo = new URL('/new-logo-pharec-64.png', import.meta.url).href
const url_char_limit = 32

let url = $ref('')
let resp = $ref({
  url: '', 
  predicted_domain: '',
  predicted_phish: false,
  predicted_conf: '',
  image_path: ''
})
let check_link_error = $ref('')

const request_check = async (url: String) => {
  NProgress.start()
  return fetch(`${api_url}/check_url`, {
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
  .then((response) => {
    NProgress.done()

    if (!response.ok) {
      throw new Error('Check link failed with error resp')
    }
    return response.json()
  })
  .catch(error => {
      throw new Error(`Check link error failed with ${error}`)
  })
}

const fix_url = () => {
  url = url.trim()
  if (url.endsWith('/'))
    url = url.slice(0, url.length - 1)
  if (url.slice(0, 4) !== "http")
    url = 'http://' + url
}

const check_url = async () => {
  if (url)
    fix_url()
    resp = {
      url: '', 
      predicted_domain: '',
      predicted_phish: false,
      predicted_conf: '',
      image_path: ''
    }
    request_check(url)
    .then((data) => {
      if (data) {
        resp = data
      }
    })
    .catch((error) => {
      check_link_error = 'Check link failed'
    })
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
    <div m-auto>
      <RouterLink to="/" title="Pharec" icon-btn>
        <img 
        :src="pharecLogo"
        rounded m-auto object-center
        />
        {{ t('intro.name') }}
      </RouterLink>
    </div>

    <p>
      <em text-sm opacity-50>{{ t('intro.desc') }}</em>
    </p>

    <div py-1/>

    <div p-1>
      <p text-sm inline>Example: </p>
      <button
        px-2 py-0 text-sm rounded-full bg-teal-600 btn
        @click="fill_example(1)"
      >
      apple.com
      </button>
      <p pe-1 inline text-sm>,</p>
      <button
        px-2 py-0 text-sm rounded-full bg-teal-600 btn
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
      w="350px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="check_url"
    >

    <div>
      <button
        btn m-3 text-sm
        :disabled="!url || url.length > url_char_limit"
        @click="check_url"
      >
        {{ t('button.check-url') }}
      </button>
    </div>

    <div py-1/>

    <div>
      <p v-if="resp.url" class="text-sm opacity75">
        {{ t('result.website') }}
      </p>
      <span text-sm opacity75> {{resp.url}} </span>
    </div>

    <div py-1/>

    <section class="container m-auto object-center w-1/3 rounded-lg">
      <img v-if="resp.image_path" 
      :src="`${base_url}/${resp.image_path}`"
      class="rounded m1"/>
    </section>

    <div py-1/>

    <div v-if="resp.predicted_domain && resp.predicted_phish===false" dark:color-emerald-500 color-emerald-700>
      <div i-carbon:thumbs-up text-2xl mx-2 inline-block/>
      <p text-m>
        {{ t('result.predicted_domain')}}
      </p>
      <span text-m opacity75> {{resp.predicted_domain}} </span>
    </div>
    <div v-if="resp.predicted_domain && resp.predicted_phish===true" dark:color-red-500 color-red-700>
      <div i-carbon:thumbs-down text-2xl mx-2 inline-block/>
      <p  class="text-sm">
        {{ t('result.predicted_domain') }}
      </p>
      <span text-sm opacity75> {{resp.predicted_domain}} </span>
    </div>
    <div>
      <p v-if="resp.predicted_conf" text-sm opacity50>
        {{ t('result.predicted_conf') }} 
      </p>
      <span text-sm opacity75> {{resp.predicted_conf}} </span>
    </div>
    <div v-if="check_link_error">
      <p color-red text-sm>
        Check link failed please try again later...
      </p>
      <p color-red text-sm>
        Error: {{ check_link_error }}
      </p>
    </div>

  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>