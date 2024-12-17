import type { HttpContext } from '@adonisjs/core/http'

import Case from '#models/case'

export default class CasesController {
  async index({ view, request }: HttpContext) {
    const priceRange = request.only(['min', 'max'])
    if (!priceRange.min && !priceRange.max) {
      const cases = await Case.all()
      return view.render('pages/cases/index', { cases })
    }
    const cases = await Case.query().whereBetween('price', [
      priceRange.min || -1,
      priceRange.max || Infinity,
    ])
    return view.render('pages/cases/index', { cases })
  }

  async show({ view, params }: HttpContext) {
    try {
      const casei = await Case.findOrFail(params.id)
      return view.render('pages/cases/show', { casei })
    } catch (e) {
      return view.render('pages/errors/not_found')
    }
  }
}
