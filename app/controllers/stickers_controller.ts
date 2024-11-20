import type { HttpContext } from '@adonisjs/core/http'

import Sticker from '#models/sticker'

export default class StickersController {
  async index({ view }: HttpContext) {
    const stickers = await Sticker.all()
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
