<script setup lang="ts">
import { useDomainStore } from '~/stores/domain';

const domainStore = useDomainStore()
let supported_domains = domainStore.supportedDomains
let fetch_domains_error = $ref('')

if (!supported_domains.length) {
    domainStore.fetchDomains()
    .then(() => {
        supported_domains = domainStore.supportedDomains
    })
    .catch((error) => {
        fetch_domains_error = error
    })
}

</script>

<template>

<div text-center>
    <div i-carbon-directory-domain text-4xl m-auto />
    <h3>Supported Domains</h3>
    <div v-if="fetch_domains_error" color-red opacity50>
        {{ fetch_domains_error}}
    </div>
    <div m-auto p-6 w-100 text-sm opacity75>
        <table>
        <thead>
            <tr>
            <th>#</th>
            <th>Domain</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in supported_domains">
            <td>{{ index + 1 }}</td>
            <td>{{ item }}</td>
            </tr>
        </tbody>
        </table> 
    </div>
</div>

</template>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
}

td, th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>

<route lang="yaml">
meta:
  layout: default
</route>