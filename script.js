const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.init();
        this.y = Math.random() * height; // Iniciar en puntos aleatorios para evitar carga inicial
    }

    init() {
        this.x = width / 2;
        this.y = height * 0.8;
        
        const t = Math.random() * Math.PI * 2;
        // Ecuación de corazón optimizada
        this.tx = 16 * Math.pow(Math.sin(t), 3);
        this.ty = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        // Velocidades más altas requieren menos cálculos por segundo
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = Math.random() * 100 + 100;
    }

    update(time) {
        const scale = 12 + Math.sin(time * 0.002) * 1;
        const targetX = width / 2 + this.tx * scale;
        const targetY = height / 2.3 + this.ty * scale;

        // Movimiento directo sin cálculos trigonométricos pesados
        this.x += (targetX - this.x) * 0.05;
        this.y += (targetY - this.y) * 0.05;

        this.life--;
        if (this.life <= 0) this.init();
    }

    draw() {
        // Dibujar un píxel cuadrado es la operación más barata en Canvas
        ctx.fillStyle = '#4da6ff';
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

function setup() {
    resize();
    particles = [];
    // 300 partículas es el punto dulce entre belleza y rendimiento
    for (let i = 0; i < 300; i++) {
        particles.push(new Particle());
    }
}

function animate(time) {
    // Opción más rápida: Limpiar el frame anterior de forma agresiva
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    // Dibujamos todas las partículas de una vez con el mismo color
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(time);
        p.draw();
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', setup);
setup();
requestAnimationFrame(animate);
