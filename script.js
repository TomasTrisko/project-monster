// 1. Nastavení Observeru (animace příletu)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Funkce, která spustí sledování prvků
function startAnimations() {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}

// Spustíme animace pro věci, které už na stránce jsou (nadpisy atd.)
startAnimations();

// 2. AJAX Načítání dat (Fetch API) - TOHLE JE TA NOVÁ ČÁST
async function loadProducts() {
    try {
        console.log("Začínám načítat produkty...");
        
        // Načtení souboru (AJAX request)
        const response = await fetch('products.json');
        
        // Převod na data
        const data = await response.json();

        // Najdeme kontejner
        const container = document.querySelector('.product-container');

        // Vygenerujeme HTML pro každý produkt
        data.forEach(product => {
            const article = document.createElement('article');
            // Přidáme třídy 'product' (vzhled) a 'hidden' (aby přiletěl)
            article.classList.add('product', 'hidden'); 

            article.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            `;

            container.appendChild(article);
        });

        // Řekneme animacím, ať sledují i tyhle nové produkty
        startAnimations();
        console.log("Produkty úspěšně načteny!");

    } catch (error) {
        console.error("Chyba při načítání:", error);
    }
}

// Spustit načítání
loadProducts();