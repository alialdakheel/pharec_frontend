import VueGtag from "vue-gtag"
import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router, app }) => {
  app.use(
    VueGtag,
    {
      appName: 'PharecWS',
      pageTrackerScreenviewEnabled: true,
      config: { 
        id: "G-EGDJ3FJVGP",
        params: { 
          send_page_view: true,
        }
      }
    },
    router
  )
}

