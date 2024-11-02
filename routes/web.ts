import router from '@adonisjs/core/services/router'

const CasesController = () => import('#controllers/cases_controller')
const SkinsController = () => import('#controllers/skins_controller')
const StickersController = () => import('#controllers/stickers_controller')

router.get('/skins', [SkinsController, 'index'])

router.get('/cases', [CasesController, 'index'])

router.get('/stickers', [StickersController, 'index'])
