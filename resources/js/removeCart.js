const buttons = document.querySelectorAll('.btn-remove.text-red-500.hover\\:underline')
const totalEl = document.getElementById('totalCart')

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const parentElement = button.parentElement
    const grandParentElement = parentElement?.parentElement
    if (grandParentElement) {
      const subtotal = parentElement.getElementsByTagName('p')[0]
      const realPrice = Number(subtotal.innerText.slice(3).replace(',', '.'))
      let total = Number(totalEl.innerText.replace(',', '.').split(' ')[1])

      total = total - realPrice
      totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`
      removeCart(grandParentElement)
    }
  })
})

async function removeCart(element) {
  const cartID = element.getElementsByTagName('input')[0].value
  await fetch('/cart/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cart_id: cartID,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      element.remove()
      showFlashMessage('Produto removido do carrinho com sucesso!')
    })
    .catch((error) => {
      console.error('Erro ao adicionar o produto ao carrinho:', error)
    })
}
