<script setup lang="ts">
import NProgress from 'nprogress'

const base_url = ''
const api_url = '/api/v1'
const pharecLogo = new URL('/new-logo-pharec-64.png', import.meta.url).href
const url_char_limit = 32

let url = $ref('')
let js_delay = $ref(false)
let resp = $ref({
  url: '', 
  predicted_domain: '',
  predicted_phish: false,
  predicted_conf: '',
  image_path: ''
})
let check_link_error = $ref('')

const request_check = async (url: string) => {
  NProgress.start()
  return fetch(`${api_url}/check_url`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      js_delay,
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
      throw new Error(error)
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
    check_link_error = ''
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
    url = 'https://www.apple.com'
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
      www.apple.com
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
      w="300px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="check_url"
    >


    <!-- <div>
      <div icon-btn>
        <input
          form-check-input
          id="input-js-delay"
          v-model="js_delay"
          type="checkbox"
          role="switch"
          autocomplete="false"
          p="x2 y2"
          w="30px"
          opacity-75
          outline="none active:none"
        >
        <label
          for="input-js-delay"
          m-1
          text-sm
        >
          Wait for JS to load
        </label>
      </div>
    </div> -->

    <div>
      <button
        btn m-3 text-sm
        :disabled="!url || url.length > url_char_limit"
        @click="check_url"
      >
        {{ t('button.check-url') }}
      </button>
    </div>

    <div>
      <label for="input-js-delay" class="icon-btn relative mt-1">
        <input v-model="js_delay" type="checkbox" id="input-js-delay" class="icon-btn sr-only">
        <div class="icon-btn inline-block toggle-bg bg-gray-400 border-1 border-gray-400 h-5 w-9 rounded-full"></div>
        <span
          ml-1
          text-sm
          align-top
        >
          Wait for JS to load
        </span>
      </label>
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
        {{ t('result.predicted_domain') }}
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

<style>
  .toggle-bg:after {
    content: '';
    @apply absolute
    top-0.8
    left-0.5
    bg-light
    dark:bg-dark
    border
    border-gray-400
    rounded-full
    h-4
    w-4
    transition 
    shadow-sm
  }

  input:checked + .toggle-bg:after {
    transform: translateX(100%);
    @apply border-gray;
  }

  input:checked + .toggle-bg {
    @apply bg-teal-600 border-teal-600;
  }
</style>

<route lang="yaml">
meta:
  layout: home
</route>
