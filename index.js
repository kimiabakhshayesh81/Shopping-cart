let allProducts = [
    {id :1 , title : 'Album1' , price : 15000 , img : 'Images/Album 1.png' , count : 1},
    {id :2 , title : 'Album2' , price : 25000 , img : 'Images/Album 2.png' , count : 1},
    {id :3 , title : 'Album3' , price : 35000 , img : 'Images/Album 3.png' , count : 1},
    {id :4 , title : 'Album4' , price : 45000 , img : 'Images/Album 4.png' , count : 1},
    {id :5 , title : 'Album5' , price : 65000 , img : 'Images/Shirt.png' , count : 1},
    {id :6 , title : 'Album6' , price : 75000 , img : 'Images/Cofee.png' , count : 1},
]

let shopItemsContainer = document.querySelector('.shop-items')
let cartItemsContainer = document.querySelector('.cart-items')
let userBasket = []
let removeAllBtn = document.querySelector('#removeAll')
let cartTotalPrice = document.querySelector('.cart-total-price')


allProducts.forEach(function(product){

    let productContainer = document.createElement('div')
    productContainer.classList.add('shop-item')

    let productTitleSpan = document.createElement('span')
    productTitleSpan.classList.add('shop-item-title')
    productTitleSpan.innerHTML = product.title


    let productImg = document.createElement('img')
    productImg.classList.add('shop-item-image')
    productImg.setAttribute('src' , product.img)

    let productDetails = document.createElement('div')
    productDetails.classList.add('shop-item-details')

    let productPrice = document.createElement('span')
    productPrice.classList.add('shop-item-price')
    productPrice.innerHTML = product.price + '$'

    let productBtn = document.createElement('button')
    productBtn.className = 'btn btn-primary shop-item-button'
    productBtn.innerHTML = 'Add To Cart'

    productDetails.append(productPrice , productBtn)
    productContainer.append(productTitleSpan , productImg , productDetails)

    shopItemsContainer.append(productContainer)

    productBtn.addEventListener('click' , function(){
        addProductToArry(product.id)
    })

})


function addProductToArry(productId){
    let mainProduct = allProducts.find(function(product){
        return product.id === productId
    })
    userBasket.push(mainProduct)
    basketproductGenerator(userBasket)
    calcTotalPrice(userBasket)
    
}


function basketproductGenerator(userBasketArry){
    cartItemsContainer.innerHTML = ''

    userBasketArry.forEach(function(product){
        
        let cartContainer = document.createElement('div')
        cartContainer.classList.add('cart-row')

        let cartDetailesContainer = document.createElement('div')
        cartDetailesContainer.className = 'cart-item cart-column'

        let cartImage = document.createElement('img')
        cartImage.classList.add('cart-item-image')
        cartImage.setAttribute('src' , product.img)
        cartImage.setAttribute('width' , '100')
        cartImage.setAttribute('height' , '100')


        let cartTitleSpan = document.createElement('span')
        cartTitleSpan.classList.add('cart-item-title')
        cartTitleSpan.innerHTML = product.title

        cartDetailesContainer.append(cartImage , cartTitleSpan)

        
        let cartPrice = document.createElement('span')
        cartPrice.innerHTML = product.price

        let cartQuantity = document.createElement('div')
        cartQuantity.className = 'cart-quantity cart-column'

        let cartQuantityInput = document.createElement('input')
        cartQuantityInput.classList.add('cart-quantity-input')
        cartQuantityInput.value = product.count
        cartQuantityInput.setAttribute('type' , 'number')


        cartQuantity.addEventListener('change' , function(){
            updateProductCount(product.id , cartQuantityInput.value)
        })



        let cartQuantityRemoveBtn = document.createElement('button')
        cartQuantityRemoveBtn.className = 'btn btn-danger'
        cartQuantityRemoveBtn.innerHTML = 'REMOVE'


        cartQuantityRemoveBtn.addEventListener('click' , function(){
            removeProductsFromBasket(product.id)
        })



        cartQuantity.append(cartQuantityInput , cartQuantityRemoveBtn)
        cartContainer.append(cartDetailesContainer , cartPrice , cartQuantity)
        cartItemsContainer.append(cartContainer)

    })
}


function removeProductsFromBasket(productId){
    userBasket = userBasket.filter(function(product){
        return product.id !== productId
    })
    basketproductGenerator(userBasket)
    console.log(productId)
}


removeAllBtn.addEventListener('click' , function(){
    userBasket = []
    basketproductGenerator(userBasket)
})


function calcTotalPrice(userBasketArry){
    totalPriceValue = 0

    userBasketArry.forEach(function(product){
        totalPriceValue += product.count * product.price
    })

    cartTotalPrice.innerHTML = totalPriceValue
}


function updateProductCount(productId , newCount){
    console.log(productId , newCount)
    userBasket.forEach(function(product){
        if(product.id === productId){
            product.count = newCount
        }
    })
    calcTotalPrice(userBasket)
}
