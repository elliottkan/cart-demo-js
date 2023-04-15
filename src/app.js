let shop = document.querySelector("[data-shop-items]");
let minicart = document.querySelector("[data-shop-mini-cart]");

function generateShop() {
  return (shop.innerHTML = shopItems
    .map((shopItem) => {
      let { id, name, price, stock, desc, alt, img } = shopItem;
      let search = basket.find((shopItem) => shopItem.id === id) || [];
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

function generateCart() {
  return (minicart.innerHTML = `
  <div data-mini-cart-slideout class="relative z-10 hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <!--
            Slide-over panel, show/hide based on slide-over state.

            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
          <div data-modal-area class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button onclick="closeModal()" type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <ul role="list" class="-my-6 divide-y divide-gray-200">
                      <li class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">Throwback Hip Bag</a>
                              </h3>
                              <p class="ml-4">$90.00</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">Salmon</p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            <p class="text-gray-500">Qty 1</p>

                            <div class="flex">
                              <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." class="h-full w-full object-cover object-center">
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">Medium Stuff Satchel</a>
                              </h3>
                              <p class="ml-4">$32.00</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">Blue</p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            <p class="text-gray-500">Qty 1</p>

                            <div class="flex">
                              <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>

                      <!-- More products... -->
                    </ul>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$262.00</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `)
}

generateCart()

function increment(id, stock) {
    let itemQuantityContainer = document.querySelector(`[data-item-quantity-${id}]`);
    let itemQuantity = parseInt(itemQuantityContainer.innerHTML);
    if (itemQuantity < stock) {
        itemQuantity += 1;
        itemQuantityContainer.innerHTML = itemQuantity;
    };
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
    let cartQuantity = document.querySelector("[data-cart-quantity]").innerHTML;
    let itemQuantity = document.querySelector(`[data-item-quantity-${id}]`).innerHTML;
    let newCartValue = parseInt(cartQuantity) + parseInt(itemQuantity);
    document.querySelector("[data-cart-quantity]").innerHTML = newCartValue;
    document.querySelector(`[data-item-quantity-${id}]`).innerHTML = 1;
    // TODO - Update Stock when Add To Cart is clicked
    // TODO - Add to Local Storage
};

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