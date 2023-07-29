// Get the paymentButton element by its id
var button = document.getElementById('button');
  
// Add a click event listener to the paymentButton
button.addEventListener('click', function() {
  // Load the payment.html file into the current page
  window.location.href = 'payment.html';
});
// Retrieve the cart items from local storage or initialize an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Add event listeners to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Function to handle adding an item to the cart
function addToCart(event) {
  const button = event.target;
  const productId = button.getAttribute('data-id');

  // Check if the item is already in the cart
  const existingItem = cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // Create a new item and add it to the cart
    const newItem = {
      id: productId,
      quantity: 1
    };
    cartItems.push(newItem);
  }

  // Save the updated cart items to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Item added to cart!');
}

// Open the cart modal
const cartModal = document.getElementById('cart-modal');
const cartModalContent = document.querySelector('.modal-content');
const cartItemsList = document.getElementById('cart-items');
const closeModalButton = document.querySelector('.close');

function openCartModal() {
  // Clear the existing cart items
  cartItemsList.innerHTML = '';

  // Populate the cart items list
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `Product ${item.id}: ${item.quantity}`;
    cartItemsList.appendChild(li);
  });

  // Show the cart modal
  cartModal.style.display = 'block';
}

// Close the cart modal
function closeCartModal() {
  cartModal.style.display = 'none';
}

// Event listeners for opening and closing the cart modal
addToCartButtons.forEach(button => {
  button.addEventListener('click', openCartModal);
});

closeModalButton.addEventListener('click', closeCartModal);
window.addEventListener('click', function(event) {
  if (event.target == cartModal) {
    closeCartModal();
  }
});
function smoothScroll(target) {
  const element = document.querySelector(target);
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth"
  });
}
