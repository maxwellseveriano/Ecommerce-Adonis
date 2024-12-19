import type { HttpContext } from '@adonisjs/core/http'
import Case from '#models/case'

export default class CasesController {
  async index({ view, request }: HttpContext) {
    
    const priceRange = request.only(['min', 'max', 'categorias'])
    
    const page = request.input('page', 1)
    const perPage = 14  

    if (priceRange.categorias) {
      const cases = await Case.query()
        .whereBetween('price', [priceRange.min || -1, priceRange.max || Infinity])
        .whereIn('category', priceRange.categorias).paginate(page, perPage)
      return view.render('pages/cases/index', { cases, request })
    }

    const cases = await Case.query().whereBetween('price', [
      priceRange.min || -1,
      priceRange.max || Infinity,
    ]).paginate(page, perPage)
    return view.render('pages/cases/index', { cases, request })
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
