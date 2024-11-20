import Skin from '#models/skin'
import type { HttpContext } from '@adonisjs/core/http'

export default class SkinsController {
  async index({ view }: HttpContext) {
    const skins = await Skin.all()
    return view.render('pages/skins/index', { skins })
  }

  async show({ view, params }: HttpContext) {
    try {
      const skin = await Skin.findOrFail(params.id)
      return view.render('pages/skins/show', { skin })
    } catch (e) {
      return view.render('pages/errors/not_found')
    }
  }
}
