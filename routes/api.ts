import router from '@adonisjs/core/services/router'

const lang = 'pt-BR'
const baseUrl = `https://bymykel.github.io/CSGO-API/api/${lang}`
let apiPrces: Array<{ suggested_price: number; quantity: number }>

router.get('/api/skins', async () => {
  const apiResponse = await fetch(`${baseUrl}/skins_not_grouped.json`)
  const apiData = (await apiResponse.json()) as Array<Object>

  if (!apiPrces) await getApiPrices()

  return apiData.slice(0, 10)
})

router.get('/api/cases', async () => {
  const apiResponse = await fetch(`${baseUrl}/crates.json`)
  const apiData = (await apiResponse.json()) as Array<Object>

  if (!apiPrces) await getApiPrices()

  return apiData.slice(0, 10)
})

router.get('/api/stickers', async () => {
  const apiResponse = await fetch(`${baseUrl}/stickers.json`)
  const apiData = (await apiResponse.json()) as Array<Object>

  if (!apiPrces) await getApiPrices()

  return apiPrces.slice(0, 10)
})

async function getApiPrices() {
  const responseApi = await fetch(
    'https://api.skinport.com/v1/items?app_id=730&currency=BRL&tradable=0',
    {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip',
      },
    }
  )
  apiPrces = (await responseApi.json()) as Array<{ suggested_price: number; quantity: number }>
}
