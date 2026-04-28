// ------------------ MOSTRAR SECCIONES ------------------
function mostrar(id) {
    let secciones = document.querySelectorAll(".seccion");

    secciones.forEach(sec => {
        sec.classList.remove("activa");
        sec.classList.add("oculto");
    });

    let actual = document.getElementById(id);
    actual.classList.remove("oculto");

    setTimeout(() => {
        actual.classList.add("activa");
    }, 50);

    actual.scrollIntoView({ behavior: "smooth" });
}




// ------------------ MODAL ------------------
function abrirJuego() {
    document.getElementById("modalJuego").classList.remove("oculto");
}

function cerrarJuego() {
    document.getElementById("modalJuego").classList.add("oculto");
}

// ------------------ SNAKE ------------------
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let grid = 20;
let count = 0;

let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: 80,
    y: 80
};

let score = 0;

function loop() {
    requestAnimationFrame(loop);

    if (++count < 8) return;
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    // choque bordes
    if (snake.x < 0 || snake.x >= canvas.width ||
        snake.y < 0 || snake.y >= canvas.height) {
        resetGame();
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // comida
    ctx.fillStyle = "#ff4d6d";
    ctx.fillRect(apple.x, apple.y, grid - 2, grid - 2);

    // snake
    ctx.fillStyle = "#00f2fe";
    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 2, grid - 2);

        // comer
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            document.getElementById("score").textContent = score;

            apple.x = Math.floor(Math.random() * 15) * grid;
            apple.y = Math.floor(Math.random() * 15) * grid;
        }

        // chocar consigo misma
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                resetGame();
            }
        }
    });
}

function resetGame() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    score = 0;
    document.getElementById("score").textContent = score;
}

// controles
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.key === "ArrowUp" && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.key === "ArrowRight" && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.key === "ArrowDown" && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

// INICIAR JUEGO SOLO CUANDO TODO CARGUE
window.onload = function () {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    requestAnimationFrame(loop);
};
