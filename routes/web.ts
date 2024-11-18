import Case from '#models/case'
import Skin from '#models/skin'
import Sticker from '#models/sticker'
import router from '@adonisjs/core/services/router'

const CasesController = () => import('#controllers/cases_controller')
const SkinsController = () => import('#controllers/skins_controller')
const StickersController = () => import('#controllers/stickers_controller')

const skin = await Skin.first()
const casei = await Case.first()
const sticker = await Sticker.first()

router.on('/').render('pages/home/show', { skin, casei, sticker }).as('home.show')

router.on('/login').render('pages/auth/create').as('auth.create')

router.get('/skins', [SkinsController, 'index']).as('skins.index')

router.get('/cases', [CasesController, 'index']).as('cases.index')

router.get('/stickers', [StickersController, 'index']).as('stickers.index')
