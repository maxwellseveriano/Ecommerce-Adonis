const cart = document.getElementById('cart')

cart.addEventListener('click', () => {
  const productId = document.getElementById('produto-id').value
  const productCat = document.getElementById('produto-cat').value

  console.log(productId, productCat)

  addCarrinho(productId, productCat)
})

async function addCarrinho(productId, productCat) {
  await fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      product_cat: productCat,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      showFlashMessage('Seu pedido foi realizado com sucesso!')
    })
    .catch((error) => {
      console.error('Erro ao adicionar o produto ao carrinho:', error)
    })
}

function showFlashMessage(message, duration = 3000) {
  const flashMessage = document.createElement('div')
  flashMessage.textContent = message

  flashMessage.style.position = 'fixed'
  flashMessage.style.bottom = '0'
  flashMessage.style.left = '10%'
  flashMessage.style.backgroundColor = '#4CAF50'
  flashMessage.style.color = '#fff'
  flashMessage.style.padding = '15px'
  flashMessage.style.fontSize = '16px'
  flashMessage.style.textAlign = 'left'
  flashMessage.style.borderRadius = '5px'
  flashMessage.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
  flashMessage.style.transition = 'transform 0.3s ease-in-out, opacity 0.5s ease-out'
  flashMessage.style.opacity = '0'
  flashMessage.style.transform = 'translateX(-100%) translateY(100%)'
  document.body.appendChild(flashMessage)
  setTimeout(() => {
    flashMessage.style.opacity = '1'
    flashMessage.style.transform = 'translateX(0) translateY(0)'
  }, 10)
  setTimeout(() => {
    flashMessage.style.opacity = '0'
    flashMessage.style.transform = 'translateX(-100%) translateY(100%)'
    setTimeout(() => flashMessage.remove(), 500)
  }, duration)
}
