const lista_carrinho = JSON.parse(localStorage.getItem("lista_carrinho")) || []
const carrinho = document.querySelector("#carrinho")
const total = document.querySelector("#total")

lista_carrinho.forEach((produto) => {
    const novo_elemento = document.createElement("div")
    novo_elemento.classList.add("item_carrinho")
    novo_elemento.id = produto.id
    novo_elemento.addEventListener("click", (e) => {
        if (e.target.id !== "botao") {
            window.location.href = "./produto.html"
            localStorage.setItem("idProduto_selecionado", e.target.parentElement.id)
        }

    })

    const nome = document.createElement("h2")
    nome.textContent = produto.title

    const imagem = document.createElement("img")
    imagem.src = produto.image
    imagem.width = 80

    const preco = document.createElement("p")
    preco.textContent = "R$ " + +produto.price

    const quantidade = document.createElement("p")
    quantidade.textContent = "Qtde: " + +produto.quantidade


    total.textContent = (+total.textContent + +produto.price * +produto.quantidade).toFixed(2)
    novo_elemento.append(imagem, nome, quantidade, preco,)

    carrinho.append(novo_elemento)
})

const finalizar = document.querySelector("#finalizar")

finalizar.addEventListener("click", () => {
    alert("Compra finalizada com sucesso.")
    localStorage.clear()
    window.location.href = "./index.html"
})