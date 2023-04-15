let shop = document.querySelector("[data-shop-items]");
let minicart = document.querySelector("[data-shop-mini-cart]");

let cart = [];

function generateShop() {
  return (shop.innerHTML = shopItems
    .map((shopItem) => {
      let { id, name, price, stock, desc, alt, img } = shopItem;
      return `
        <div>
          <div class="relative">
            <div class="relative h-72 w-full overflow-hidden rounded-lg">
              <img src="${img}" alt="${alt}" class="h-full w-full object-cover object-center">
            </div>
            <div class="relative mt-4">
              <h3 class="text-sm font-medium text-gray-900">${name}</h3>
              <p class="mt-1 text-sm text-gray-500">${desc}</p>
            </div>
            <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
              <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"></div>
              <p class="relative text-lg font-semibold text-white">$${price}</p>
            </div>
          </div>
          
          <div class="flex justify-center">
          <div onclick="decrement(${id})" class="text-2xl">-</div>

          <div class="mx-2 border text-center w-8" data-item-quantity-${id}>
            1
          </div>

          <div onclick="increment(${id}, ${stock})" class="text-2xl">+</div>
        </div>
          <div class="mt-6">
            <div onclick="addToCart(${id}, ${stock})" class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">Add to bag<span class="sr-only">, ${name}</span></div>
          </div>
        </div>
    `;
    })
    .join(""));
}

generateShop();

function generateMiniCart() {
  
}

generateCart()

function increment(id, stock) {
    let itemQuantityContainer = document.querySelector(`[data-item-quantity-${id}]`);
    let itemQuantity = parseInt(itemQuantityContainer.innerHTML);
    if (itemQuantity < stock) {
        itemQuantity += 1;
        itemQuantityContainer.innerHTML = itemQuantity;
    }
};

function decrement(id) {
    let itemQuantityContainer = document.querySelector(`[data-item-quantity-${id}]`);
    let itemQuantity = parseInt(itemQuantityContainer.innerHTML);
    if (itemQuantity > 1) {
        itemQuantity -= 1;
        itemQuantityContainer.innerHTML = itemQuantity;
    };
};

function addToCart(id) {
    let cartQuantity = parseInt(document.querySelector("[data-cart-quantity]").innerHTML);
    let itemQuantity = parseInt(document.querySelector(`[data-item-quantity-${id}]`).innerHTML);
    let newCartValue = cartQuantity + itemQuantity;
    document.querySelector("[data-cart-quantity]").innerHTML = newCartValue;
    document.querySelector(`[data-item-quantity-${id}]`).innerHTML = 1;
    updateMiniCart(id, itemQuantity);

    // TODO - Add to Local Storage
};

function updateMiniCart(id, itemQuantity) {
  let existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.itemQuantity += itemQuantity;
  } else {
    cart.push({ id: id, itemQuantity: itemQuantity });
  }
  updateStock(id, itemQuantity);
}

function updateStock(id, itemQuantity) {
  let shopItem = shopItems.find(item => item.id == id);
  if (shopItem) {
    shopItem.stock -= itemQuantity;
  };
}

function openModal() {
  const modal = document.querySelector("[data-mini-cart-slideout]");
  modal.classList.remove("hidden");
  modal.addEventListener(
    "click",
    function(event) {
      // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
      if (
        !event.target.closest("[data-modal-area]")
      ) {
        closeModal()
      }
    },
    false
  )
}

function closeModal() {
  const modal = document.querySelector("[data-mini-cart-slideout]");
  modal.classList.add("hidden");
}