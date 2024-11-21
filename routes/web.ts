import Case from '#models/case'
import Skin from '#models/skin'
import Sticker from '#models/sticker'
import router from '@adonisjs/core/services/router'
import { middleware } from '../start/kernel.js'

const CasesController = () => import('#controllers/cases_controller')
const SkinsController = () => import('#controllers/skins_controller')
const StickersController = () => import('#controllers/stickers_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

const skin = await Skin.first()
const casei = await Case.first()
const sticker = await Sticker.first()

router.on('/').render('pages/home/show', { skin, casei, sticker }).as('home.show')

router.get('/login', [AuthController, 'create']).as('auth.create')
router.post('/login', [AuthController, 'store']).as('auth.store')

router.get('/skins', [SkinsController, 'index']).use(middleware.auth()).as('skins.index')
router.get('/skins/:id', [SkinsController, 'show']).use(middleware.auth()).as('skins.show')

router.get('/cases', [CasesController, 'index']).use(middleware.auth()).as('cases.index')
router.get('/cases/:id', [CasesController, 'show']).use(middleware.auth()).as('cases.show')

router.get('/stickers', [StickersController, 'index']).use(middleware.auth()).as('stickers.index')
router.get('/stickers/:id', [StickersController, 'show']).use(middleware.auth()).as('stickers.show')

//router.post('/register', [AuthController, 'register']);

router.get('/logout', [AuthController, 'destroy']).use(middleware.auth()).as('auth.destroy')

router.get('/user', [UsersController, 'create']).as('users.create')

router.post('/user', [UsersController, 'store']).as('users.store')
