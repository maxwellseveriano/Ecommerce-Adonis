import type { HttpContext } from '@adonisjs/core/http'

import Sticker from '#models/sticker'

export default class StickersController {
  async index({ view }: HttpContext) {
    const skins = await Sticker.all()
    return view.render('pages/skins', { skins })
  }
}
