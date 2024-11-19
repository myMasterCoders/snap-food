

import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet/dist/leaflet.js'

export default defineNuxtPlugin((nuxtApp)=>{
    return nuxtApp.provide('leaflet',leaflet)
})