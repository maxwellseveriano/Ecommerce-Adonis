import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  index({ view }: HttpContext) {
    return view.render('pages/users/index')
  }

  create({ view }: HttpContext) {
    return view.render('pages/users/create_user')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = new User()
    user.merge(payload)
    await user.save()
    return response.redirect().toRoute('auth.create')
  }

  edit({ view }: HttpContext) {
    return view.render('pages/users/edit')
  }

  async update({ auth, request, params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(createUserValidator)
    const authUser = auth.user

    if (authUser && user.id === authUser.id) {
      user.fullName = payload.full_name
      user.email = payload.email
      user.password = payload.password
      await user.save()
    }

    return response.redirect().toRoute('users.index')
  }

  async destroy({ auth, response, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const authUser = auth.user
    if (authUser && user.id === authUser.id) {
      await user.delete()
      return response.redirect().toRoute('home.show')
    }
  }
}
