// Mensajes para las cartas
const messages = [
    "Eres mi sol en los días grises.",
    "Gracias por ser mi refugio.",
    "Cada día contigo es un regalo.",
    "Mi corazón late por ti.",
    "Eres mi razón de sonreír.",
    "Te amo más que a las estrellas.",
    "Tu amor ilumina mi vida.",
    "Eres mi mayor felicidad.",
    "Contigo todo es perfecto.",
    "Eres mi sueño hecho realidad.",
    "Siempre pienso en ti.",
    "Eres mi inspiración diaria.",
    "Te extraño cada segundo.",
    "Eres mi alma gemela.",
    "Mi mundo gira alrededor de ti.",
    "Te amo con todo mi corazón.",
    "Eres mi mejor decisión.",
    "Con tu amor soy invencible.",
    "Eres mi eterno amor.",
    "Nunca te dejaré ir."
];

// Generar cartas sin solapamiento
function generateCards() {
    const container = document.getElementById('card-container');
    const cardWidth = 150; // Ancho de la carta
    const cardHeight = 200; // Alto de la carta
    const positions = []; // Almacenar posiciones usadas
    const maxAttempts = 100; // Máximo de intentos para evitar bucles infinitos

    // Calcular cuántas filas y columnas caben en la pantalla
    const rows = Math.floor(window.innerHeight / (cardHeight + 20)); // Espacio entre cartas
    const cols = Math.floor(window.innerWidth / (cardWidth + 20));
    const totalSlots = rows * cols;

    for (let i = 0; i < messages.length; i++) {
        let card, x, y;
        let attempts = 0;

        // Intentar colocar la carta aleatoriamente
        do {
            x = Math.random() * (window.innerWidth - cardWidth);
            y = Math.random() * (window.innerHeight - cardHeight);
            attempts++;
        } while (isOverlapping(x, y, cardWidth, cardHeight, positions) && attempts < maxAttempts);

        // Si no se encuentra una posición válida, usar la cuadrícula
        if (attempts === maxAttempts || i >= totalSlots) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            x = col * (cardWidth + 20); // Espacio entre cartas
            y = row * (cardHeight + 20);
        }

        positions.push({ x, y });

        card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '❤️ Haz clic aquí ❤️';

        const back = document.createElement('div');
        back.classList.add('back');
        back.innerHTML = `<p>${messages[i]}</p>`;

        card.appendChild(front);
        card.appendChild(back);

        card.style.left = `${x}px`;
        card.style.top = `${y}px`;

        card.addEventListener('click', () => flipCard(card));

        container.appendChild(card);
    }
}

// Verificar solapamiento
function isOverlapping(x, y, width, height, positions) {
    const buffer = 20; // Espacio mínimo entre cartas
    for (const pos of positions) {
        if (
            x < pos.x + width + buffer &&
            x + width + buffer > pos.x &&
            y < pos.y + height + buffer &&
            y + height + buffer > pos.y
        ) {
            return true;
        }
    }
    return false;
}

// Girar carta
function flipCard(card) {
    card.classList.toggle('flipped');

    // Verificar si todas las cartas están giradas
    const allCards = document.querySelectorAll('.card');
    const flippedCards = document.querySelectorAll('.card.flipped');
    if (flippedCards.length === allCards.length) {
        showFinalCard();
    }
}

// Mostrar carta final
function showFinalCard() {
    const finalCard = document.getElementById('final-card');
    finalCard.classList.remove('hidden');
    setTimeout(() => {
        finalCard.classList.add('visible');
    }, 100);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    generateCards();
});