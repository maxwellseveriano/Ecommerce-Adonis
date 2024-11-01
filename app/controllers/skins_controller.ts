import Skin from '#models/skin'
import type { HttpContext } from '@adonisjs/core/http'

export default class SkinsController {
    async index({view}:HttpContext){
        const skins = await Skin.all()
        return view.render('pages/skins', {skins})
    } 
}