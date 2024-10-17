let shopItemButton = document.getElementsByClassName('shop-item-button')
for(let i=0; i < shopItemButton.length; i++){
    let count = shopItemButton[i];
    count.addEventListener('click', (event) => {
        let addClick = event.target                                                                     //target is element where the event came from
        let shopItem = addClick.parentElement.parentElement                                             //parent of parent of 'shop-item-button' is 'shop-item'

        let shopItemImg = shopItem.getElementsByClassName('shop-item-image')[0].src,                    //defines variable as target's img source (from parent of parent)
        shopItemTitle = shopItem.getElementsByClassName('shop-item-title')[0].innerText,                //defines variable as target's title (from parent of parent)
        shopItemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText;                //defines variable as target's price (from parent of parent)

        let cartItems = document.getElementsByClassName('cart-items')[0],                               //defines variable as
        cartRow = cartItems.getElementsByClassName('cart-row')[0];                                      //defines variable as

        let clone = cartRow.cloneNode(true);                                                            //creates deep clone of 'cart-row' div
        cartItems.append(clone);                                                                        //appends clone to 'cart-items' div
        
        clone.getElementsByClassName('cart-item-image')[0].src = shopItemImg;                           //sets clone's image to target's image
        clone.getElementsByClassName('cart-item-title')[0].innerText = shopItemTitle;                   //sets clone's title to target's title
        clone.getElementsByClassName('cart-price')[0].innerText = shopItemPrice;                        //sets clone's price to target's price
        }
    );
};