import type { HttpContext } from '@adonisjs/core/http'

import Case from '#models/case'

export default class CasesController {
  async index({ view }: HttpContext) {
    const skins = await Case.all()
    return view.render('pages/skins', { skins })
  }
}
