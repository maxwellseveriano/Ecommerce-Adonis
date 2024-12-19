import Cart from '#models/cart'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CartsController {
  async show({ view, auth, response }: HttpContext) {
    const authUser = auth.user
    if (!authUser) {
      return response.status(404).json({ message: 'Usuário não auteenticado' })
    }
    const cart = await Cart.query().where('user_id', authUser.id)
    const cartItems = [] as any
    let total = 0

    for (const item of cart) {
      const cardItem = await db.from(item.type).where('id', Number(item.productId)).first()
      cartItems.push({
        ...cardItem,
        quantity: item.quantity,
        subtotal: item.subtotal,
        cart_id: item.id,
      })
      total += cardItem.price * Number(item.quantity)
    }

    return view.render('pages/cart/show', { cartItems, total })
  }

  async create({ request, response, auth }: HttpContext) {
    const productCart = request.only(['product_id', 'product_cat'])

    try {
      const produto = await db
        .from(productCart.product_cat)
        .where('id', productCart.product_id)
        .first()
      if (!produto) {
        return response.status(404).json({ message: 'Produto não encontrado' })
      }

      const authUser = auth.user
      if (!authUser) {
        return response.status(404).json({ message: 'Usuário não auteenticado' })
      }

      const verifyItem = await db
        .from('carts')
        .where('product_id', productCart.product_id)
        .where('type', productCart.product_cat)
        .first()

      if (!verifyItem) {
        const newCart = new Cart()
        newCart.productId = produto.id
        newCart.userId = authUser.id
        newCart.quantity = 1
        newCart.subtotal = produto.price
        newCart.type = productCart.product_cat

        Cart.create(newCart)
      } else {
        const newCart = await Cart.findOrFail(verifyItem.id)

        newCart.quantity = Number(newCart.quantity) + 1
        newCart.subtotal = produto.price * Number(newCart.quantity)
        await newCart.save()
      }

      return response.json({
        message: 'Produto adicionado ao carrinho com sucesso!',
        product: produto,
      })
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar o produto', error })
    }
  }

  async destroy({ request, response }: HttpContext) {
    const cartId = request.only(['cart_id'])
    try {
      const cartToRemove = await Cart.findOrFail(cartId.cart_id)
      await cartToRemove.delete()

      return response.json({
        message: 'Produto removido do carrinho com sucesso!',
      })
    } catch (e) {
      return response.status(400).json({ message: 'Produto Não encontrado', e })
    }
  }
}
