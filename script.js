/* ==========================================
   LUNÉA — MAIN JAVASCRIPT
========================================== */


/* ==========================================
   VARIABLES
========================================== */

const body = document.body;
const header = document.querySelector(".header");

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileClose = document.querySelector(".mobile-close");

const searchBtn = document.querySelector(".search-btn");
const searchOverlay = document.querySelector(".search-overlay");
const closeSearch = document.querySelector(".close-search");
const searchInput = document.querySelector("#searchInput");

const cartBtn = document.querySelector(".cart-btn");
const cartDrawer = document.querySelector(".cart-drawer");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCart = document.querySelector(".close-cart");

const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector(".cart-total strong");

const toast = document.querySelector(".toast");

const productModal = document.querySelector(".product-modal");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");

const modalImage = document.querySelector(".modal-image img");
const modalTitle = document.querySelector(".modal-title");
const modalCategory = document.querySelector(".modal-category");
const modalPrice = document.querySelector(".modal-price");

const modalWhatsapp = document.querySelector(".modal-whatsapp");

const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

let cart = [];

let currentModalProduct = null;


/* ==========================================
   PAGE LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.querySelector(".loader");

        if (loader) {
            loader.classList.add("hidden");
        }

        document.querySelectorAll(".hero .reveal").forEach((element, index) => {

            setTimeout(() => {
                element.classList.add("visible");
            }, index * 180);

        });

    }, 700);

});


/* ==========================================
   HEADER ON SCROLL
========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ==========================================
   MOBILE MENU
========================================== */

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.add("open");

    body.classList.add("no-scroll");

});


mobileClose.addEventListener("click", closeMobileMenu);


document.querySelectorAll(".mobile-links a").forEach(link => {

    link.addEventListener("click", closeMobileMenu);

});


function closeMobileMenu() {

    mobileMenu.classList.remove("open");

    body.classList.remove("no-scroll");

}


/* ==========================================
   SEARCH
========================================== */

searchBtn.addEventListener("click", () => {

    searchOverlay.classList.add("open");

    body.classList.add("no-scroll");

    setTimeout(() => {
        searchInput.focus();
    }, 400);

});


closeSearch.addEventListener("click", closeSearchOverlay);


function closeSearchOverlay() {

    searchOverlay.classList.remove("open");

    body.classList.remove("no-scroll");

    searchInput.value = "";

    products.forEach(product => {
        product.style.display = "";
    });

}


searchInput.addEventListener("input", () => {

    const search = searchInput.value
        .toLowerCase()
        .trim();

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(search)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================
   PRODUCT FILTER
========================================== */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const category =
            filter.dataset.filter;

        products.forEach(product => {

            const productCategory =
                product.dataset.category;

            if (
                category === "all" ||
                productCategory === category
            ) {

                product.style.display = "";

                setTimeout(() => {
                    product.classList.add("visible");
                }, 50);

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* ==========================================
   HEART BUTTON
========================================== */

document.querySelectorAll(".heart").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent.trim() === "♡") {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }

    });

});


/* ==========================================
   ADD TO CART
========================================== */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const product = button.dataset.product;
        const price = Number(button.dataset.price);

        const card =
            button.closest(".product-card");

        const image =
            card.querySelector(".product-image img").src;

        addToCart({
            name: product,
            price: price,
            image: image
        });

    });

});


function addToCart(product) {

    cart.push(product);

    updateCart();

    showToast();

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    cartCount.textContent = cart.length;

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item =
            document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <h4>${product.name}</h4>

                <p>${product.price} DH</p>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ×
            </button>

        `;

        cartItemsContainer.appendChild(item);

    });


    cartTotal.textContent =
        `${total} DH`;


    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    cart.splice(index, 1);

                    updateCart();

                }
            );

        });

}


/* ==========================================
   CART DRAWER
========================================== */

cartBtn.addEventListener("click", openCart);


closeCart.addEventListener("click", closeCartDrawer);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);


function openCart() {

    cartDrawer.classList.add("open");

    cartOverlay.classList.add("open");

    body.classList.add("no-scroll");

}


function closeCartDrawer() {

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("open");

    body.classList.remove("no-scroll");

}


/* ==========================================
   TOAST
========================================== */

function showToast() {

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* ==========================================
   QUICK VIEW
========================================== */

document.querySelectorAll(".quick-view").forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".product-card");

        const image =
            card.querySelector(".product-image img").src;

        const name =
            card.dataset.name;

        const category =
            card.querySelector(".product-info p").textContent;

        const price =
            card.querySelector(".product-info strong").textContent;

        currentModalProduct = {
            name: name,
            category: category,
            price: price,
            image: image
        };

        modalImage.src = image;

        modalImage.alt = name;

        modalTitle.textContent = name;

        modalCategory.textContent = category;

        modalPrice.textContent = price;

        productModal.classList.add("open");

        body.classList.add("no-scroll");

    });

});


/* ==========================================
   CLOSE MODAL
========================================== */

modalClose.addEventListener(
    "click",
    closeModal
);

modalBackdrop.addEventListener(
    "click",
    closeModal
);


function closeModal() {

    productModal.classList.remove("open");

    body.classList.remove("no-scroll");

}


/* ==========================================
   WHATSAPP
========================================== */

const WHATSAPP_NUMBER =
    "212600000000";


function openWhatsApp(message) {

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* ==========================================
   MODAL WHATSAPP
========================================== */

modalWhatsapp.addEventListener("click", () => {

    if (!currentModalProduct) return;

    const message =
        `Bonjour, je suis intéressée par le sac "${currentModalProduct.name}" à ${currentModalProduct.price}. Je voudrais avoir plus d'informations.`;

    openWhatsApp(message);

});


/* ==========================================
   CART WHATSAPP ORDER
========================================== */

document
    .querySelector(".whatsapp-order")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast();

            toast.querySelector("span").textContent = "!";

            toast.childNodes[1].textContent =
                " Votre panier est vide";

            return;

        }


        let message =
            "Bonjour, je souhaite commander :\n\n";


        cart.forEach(product => {

            message +=
                `• ${product.name} — ${product.price} DH\n`;

        });


        const total =
            cart.reduce(
                (sum, product) =>
                    sum + product.price,
                0
            );


        message +=
            `\nTotal : ${total} DH`;


        openWhatsApp(message);

    });


/* ==========================================
   NEWSLETTER
========================================== */

const newsletterForm =
    document.querySelector(".newsletter-form");


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const input =
            newsletterForm.querySelector("input");

        if (!input.value) return;

        input.value = "";

        showToast();

        toast.querySelector("span").textContent = "✓";

        toast.childNodes[1].textContent =
            " Inscription réussie";

    }
);


/* ==========================================
   PARALLAX HERO
========================================== */

const heroImage =
    document.querySelector(".hero-image img");


window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroImage.style.transform =
            `translateY(${scroll * 0.08}px) scale(1.03)`;

    }

});


/* ==========================================
   MAGNETIC BUTTON EFFECT
========================================== */

document
    .querySelectorAll(".btn-dark")
    .forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX - rect.left - rect.width / 2;

                const y =
                    event.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * .08}px, ${y * .08}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(".cursor-follower");


let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


window.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left =
            mouseX + "px";

        cursor.style.top =
            mouseY + "px";

    }
);


function animateCursor() {

    followerX +=
        (mouseX - followerX) * .12;

    followerY +=
        (mouseY - followerY) * .12;

    follower.style.left =
        followerX + "px";

    follower.style.top =
        followerY + "px";

    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();


/* ==========================================
   CURSOR HOVER EFFECT
========================================== */

document
    .querySelectorAll("a, button")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add("active");

                follower.classList.add("active");

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove("active");

                follower.classList.remove("active");

            }
        );

    });


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

            closeCartDrawer();

            closeSearchOverlay();

            closeMobileMenu();

        }

    }
);
