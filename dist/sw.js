if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const d=e=>r(e,l),u={module:{uri:l},exports:o,require:d};s[l]=Promise.all(i.map((e=>u[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-f51ab5e4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"about.html",revision:"b65b540f31e80d5379d9d5486c204f9e"},{url:"assets/_...all_.0e672ad1.js",revision:null},{url:"assets/404.d287f011.js",revision:null},{url:"assets/about.7dfece1f.js",revision:null},{url:"assets/app.6d898f49.css",revision:null},{url:"assets/app.ab516532.js",revision:null},{url:"assets/home.362c4230.js",revision:null},{url:"assets/README.d809d1d3.js",revision:null},{url:"assets/supported_domains.00d9bc93.js",revision:null},{url:"assets/supported_domains.d8e80af1.css",revision:null},{url:"assets/virtual_pwa-register.04637613.js",revision:null},{url:"index.html",revision:"d2fc92fb35c6fc75b082dcd011d2dc7b"},{url:"readme.html",revision:"0bce77df0524be0e2bcfbbb487573db6"},{url:"supported_domains.html",revision:"f866f89cbfdaf793567b2f8f6df91aa8"},{url:"favicon.png",revision:"0e96050ac3c8bb400b985ce1dc45db99"},{url:"new-logo-pharec-32.png",revision:"0e96050ac3c8bb400b985ce1dc45db99"},{url:"new-logo-pharec-64.png",revision:"fbf44649ab2081c3494e32db08c0a046"},{url:"new-logo-pharec-128.png",revision:"2f1bdf6137421e4e59e34f30fa25d9ef"},{url:"new-logo-pharec-256.png",revision:"c33582f5675a6d337049bb7d589cffa3"},{url:"new-logo-pharec-512.png",revision:"ae989929609cea7146e47b0a243ba0ea"},{url:"manifest.webmanifest",revision:"f0371e276e8114db966fad1c0eff05d7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
