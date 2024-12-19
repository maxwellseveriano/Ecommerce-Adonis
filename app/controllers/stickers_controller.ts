import type { HttpContext } from '@adonisjs/core/http'

import Sticker from '#models/sticker'

export default class StickersController {
  async index({ view, request }: HttpContext) {
    const priceRange = request.only(['min', 'max', 'tipos'])

    const page = request.input('page', 1)
    const perPage = 14  

    if (priceRange.tipos) {
      const stickers = await Sticker.query()
        .whereBetween('price', [priceRange.min || -1, priceRange.max || Infinity])
        .whereIn('type', priceRange.tipos).paginate(page, perPage)
      return view.render('pages/stickers/index', { stickers })
    }
    const stickers = await Sticker.query().whereBetween('price', [
      priceRange.min || -1,
      priceRange.max || Infinity,
    ]).paginate(page, perPage)
    return view.render('pages/stickers/index', { stickers })
  }

  async show({ view, params }: HttpContext) {
    try {
      const sticker = await Sticker.findOrFail(params.id)
      return view.render('pages/stickers/show', { sticker })
    } catch (e) {
      return view.render('pages/errors/not_found')
    }
  }
}
