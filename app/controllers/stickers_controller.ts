import type { HttpContext } from '@adonisjs/core/http'

import Sticker from '#models/sticker'

export default class StickersController {
  async index({ view, request }: HttpContext) {
    const priceRange = request.only(['min', 'max'])
    if (!priceRange.min && !priceRange.max) {
      const stickers = await Sticker.all()
      return view.render('pages/stickers/index', { stickers })
    }
    const stickers = await Sticker.query().whereBetween('price', [
      priceRange.min || -1,
      priceRange.max || Infinity,
    ])
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
