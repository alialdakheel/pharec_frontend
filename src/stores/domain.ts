import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDomainStore = defineStore('supported_domains', () => {
  /**
   * Current set of supported domains.
   */
  const supportedDomains = $ref(new Array<string>())
  // const supportedDomains = ref(new Set(['google.com', 'apple.com', 'others']))

  /**
   * Add domain to set.
   *
   * @param name - new name to set
   */
  function addNewDomain(name: string) {
    if (supportedDomains)
      supportedDomains.push(name)
  }

  async function fetchDomains(){
    const resp = await fetch('/api/v1/supported_domains', {
      method: 'POST',
      mode: 'cors',
    })
    .then((response) => {
      if (!response.ok){
        throw new Error('Check domains failed with error resp')
      }
      return response.json()
    })
    .catch(error => {
        throw new Error(error)
    })
    resp.supported_domains.forEach((domain: string) => {
      addNewDomain(domain)
    });
  }

  return {
    addNewDomain,
    fetchDomains,
    supportedDomains
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDomainStore, import.meta.hot))
