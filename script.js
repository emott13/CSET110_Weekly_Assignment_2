resetRemoveButtons();
handleQuantityChange();

let cartItems = document.getElementsByClassName('cart-items')[0];                                       
let cartRow = cartItems.getElementsByClassName('cart-row')[0];                                          //defines variable as first index of 'cart-row' for cloning later
let clone = cartRow.cloneNode(true);                                                                    //creates deep clone of 'cart-row' div

let shopItemButton = document.getElementsByClassName('shop-item-button');
for(let i=0; i < shopItemButton.length; i++){
    let count = shopItemButton[i];
    count.addEventListener('click', (event) => {
        let addClick = event.target;                                                                    
        let shopItem = addClick.parentElement.parentElement;                                            //parent of parent of 'shop-item-button' is 'shop-item'

        let shopItemImg = shopItem.getElementsByClassName('shop-item-image')[0].src,                    
        shopItemTitle = shopItem.getElementsByClassName('shop-item-title')[0].innerText,                
        shopItemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText;                

        let cartTitles = cartItems.getElementsByClassName('cart-item-title');
        for(let i=0; i < cartTitles.length; i++){                                                       //handles item already in cart
            if(cartTitles[i].innerText == shopItemTitle){
                alert('This item already exists in cart. Please change the quantity if you would like to add more.'); //used alert() so message shows in browser window
                return;
            };
        };
        let otherClone = clone.cloneNode(true)
        cartItems.append(otherClone);                                                                   //appends otherClone to 'cart-items' div
        
        otherClone.getElementsByClassName('cart-item-image')[0].src = shopItemImg;                      
        otherClone.getElementsByClassName('cart-item-title')[0].innerText = shopItemTitle;              
        otherClone.getElementsByClassName('cart-price')[0].innerText = shopItemPrice;

        resetRemoveButtons();                                                                           //calls function to update the eventListener to remove buttons
        changeCartTotal();
        handleQuantityChange();
    });
};

function resetRemoveButtons(){                                                                          //loop inside function allows it to be called after new items are added to cart
    let btnDanger = document.getElementsByClassName('btn-danger');                                      //since otherwise eventListener would only work for the original buttons the page loaded with
    for(let i=0; i < btnDanger.length; i++){                                                            
        let count = btnDanger[i];                                                                       
        count.addEventListener('click', (event) => {                                                    
            let addClick = event.target;                                                                
            let cartRowToRemove = addClick.parentElement.parentElement;                                 //parent of parent of target is the div.cart-row that the target event came from
            cartRowToRemove.remove();                                                                   
            changeCartTotal();
        });
    };
};

function changeCartTotal(){
    let cartRowArray = cartItems.getElementsByClassName('cart-row');                                    
    let cartTotal = 0;                                                                                  
    for(let i=0; i < cartRowArray.length; i++){
        let count = cartRowArray[i];
        let cartPrice = count.getElementsByClassName('cart-price')[0],
        price = Number(cartPrice.innerText.replace('$', ''));                                           

        let cartQuantityInput = count.getElementsByClassName('cart-quantity-input')[0],
        quantity = cartQuantityInput.value;                                                             

        cartTotal = cartTotal + (price * quantity);                                                     
    };
    cartTotal = Math.round(cartTotal * 100)/100;                                                        //ensures total has two digits in decimal place for the cents
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + cartTotal;
};

function handleQuantityChange(){
    let cartQuantityArray = document.getElementsByClassName('cart-quantity-input');
    for(let i=0; i < cartQuantityArray.length; i++){
        let count = cartQuantityArray[i];
        count.addEventListener('change', (event) => {
            let addChange = event.target;
            if(addChange.value <=0 || isNaN(addChange.value)){                                          //handles if value is changed to negative, zero, or NaN
                addChange.value = 1;
            }
            else{
                addChange.value = parseInt(addChange.value);                                            //handles if value is changed to decimal
            }
            changeCartTotal();
        });
    };
};


let btnPurchase = document.getElementsByClassName('btn-purchase')[0];
btnPurchase.addEventListener('click', () => {                  
    cartItems.innerHTML = '';
    changeCartTotal();
    alert('Thank you for your purchase!');
});