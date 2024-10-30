import Case from '#models/case'
import Skin from '#models/skin'
import Sticker from '#models/sticker'
import router from '@adonisjs/core/services/router'

const lang = 'pt-BR'
const baseUrl = `https://bymykel.github.io/CSGO-API/api/${lang}`
let apiPrices: Array<{ suggested_price: number; quantity: number; market_hash_name: string }>

router.get('/api/skins', async () => {
  const apiResponse = await fetch(`${baseUrl}/skins_not_grouped.json`)
  const apiData = (await apiResponse.json()) as Array<any>

  if (!apiPrices) await getApiPrices()

  for (let i = 0; i < apiData.length; i += 100) {
    let newSkin = {} as Skin
    const skin = apiData[i]

    newSkin.name = skin.name
    newSkin.description = skin.description || ''
    newSkin.weapon = skin.weapon.name
    newSkin.category = skin.category?.name || 'Taser'
    newSkin.wear = skin.wear?.name
    newSkin.stattrak = skin.stattrak
    newSkin.souvenir = skin.souvenir
    newSkin.imagePath = skin.image
    newSkin.marketHashName = skin.market_hash_name

    for (const skinPrice of apiPrices) {
      if (skinPrice.market_hash_name === skin.market_hash_name) {
        newSkin.price = skinPrice.suggested_price
        newSkin.quantity = skinPrice.quantity
        break
      }
    }
    await Skin.create(newSkin)
  }

  return { message: 'Success' }
})

router.get('/api/cases', async () => {
  const apiResponse = await fetch(`${baseUrl}/crates.json`)
  const apiData = (await apiResponse.json()) as Array<any>

  if (!apiPrices) await getApiPrices()

  for (let i = 0; i < apiData.length; i += 5) {
    let newCase = {} as Case
    const apiCase = apiData[i]

    newCase.name = apiCase.name
    newCase.description = apiCase.description || ''
    newCase.marketHashName = apiCase.market_hash_name
    newCase.imagePath = apiCase.image
    newCase.type = apiCase.type

    for (const casePrice of apiPrices) {
      if (casePrice.market_hash_name === apiCase.market_hash_name) {
        newCase.price = casePrice.suggested_price
        newCase.quantity = casePrice.quantity
        break
      }
    }
    await Case.create(newCase)
  }

  return { message: 'Sucess' }
})

router.get('/api/stickers', async () => {
  const apiResponse = await fetch(`${baseUrl}/stickers.json`)
  const apiData = (await apiResponse.json()) as Array<any>

  if (!apiPrices) await getApiPrices()

  for (let i = 0; i < apiData.length; i += 50) {
    if (apiData[i].market_hash_name) {
      let newSticker = {} as Sticker
      const apiCase = apiData[i]

      newSticker.name = apiCase.name
      newSticker.description = apiCase.description || ''
      newSticker.marketHashName = apiCase.market_hash_name
      newSticker.imagePath = apiCase.image
      newSticker.type = apiCase.type
      newSticker.effect = apiCase.effect

      for (const casePrice of apiPrices) {
        if (casePrice.market_hash_name === apiCase.market_hash_name) {
          newSticker.price = casePrice.suggested_price
          newSticker.quantity = casePrice.quantity
          break
        }
      }
      await Sticker.create(newSticker)
    }
  }

  return { message: 'Sucess' }

  return apiData.slice(0, 10)
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
  apiPrices = (await responseApi.json()) as Array<{
    suggested_price: number
    quantity: number
    market_hash_name: string
  }>
}
