import Skin from '#models/skin'
import type { HttpContext } from '@adonisjs/core/http'

export default class SkinsController {
  async index({ view, request }: HttpContext) {
    const priceRange = request.only(['min', 'max', 'categorias'])

    if (priceRange.categorias) {
      const skins = await Skin.query()
        .whereBetween('price', [priceRange.min || -1, priceRange.max || Infinity])
        .whereIn('category', priceRange.categorias)
      return view.render('pages/skins/index', { skins })
    }

    const skins = await Skin.query().whereBetween('price', [
      priceRange.min || -1,
      priceRange.max || Infinity,
    ])
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
