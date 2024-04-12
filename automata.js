class Automata {
    constructor(game, width = 80, height = 60) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = 60;
        this.automata = this.createEmptyAutomata();
        this.randomize();
    }

    // Creates a 2D array filled with zeroes
    createEmptyAutomata() {
        return Array.from({length: this.width}, () => Array.from({length: this.height}, () => 0));
    }

    // Randomly assigns living/dead cells for the main array (automata)
    randomize() {
        this.forEachCell((col, row) => {
            this.automata[col][row] = Math.floor(Math.random() * 2);
        });
    }

    // Helper method to abstract the repetitive loop logic
    forEachCell(callback) {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                callback(col, row);
            }
        }
    }

    // Counts the number of living neighbors around a given cell
    countNeighbors(col, row) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], /* skip [0, 0], */ [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        return directions.reduce((count, [dCol, dRow]) => {
            const neighborCol = col + dCol, neighborRow = row + dRow;
            if (neighborCol >= 0 && neighborCol < this.width && neighborRow >= 0 && neighborRow < this.height) {
                count += this.automata[neighborCol][neighborRow];
            }
            return count;
        }, 0);
    }

    // Update method simplified by extracting DOM manipulation
    update() {
        this.adjustSpeed();
        if (this.tickCount++ >= this.speedAdjustment()) {
            this.tickCount = 0;
            this.ticks++;
            this.nextGeneration();
        }
        this.updateTicksDisplay();
    }

    adjustSpeed() {
        const speedInput = document.getElementById("speed");
        if (speedInput) this.speed = parseInt(speedInput.value);
    }

    speedAdjustment() {
        return 120 - this.speed;
    }

    nextGeneration() {
        let next = this.createEmptyAutomata();

        this.forEachCell((col, row) => {
            const liveNeighbors = this.countNeighbors(col, row);
            const alive = this.automata[col][row] === 1;
            if ((alive && (liveNeighbors === 2 || liveNeighbors === 3)) || (!alive && liveNeighbors === 3)) {
                next[col][row] = 1;
            }
        });

        this.automata = next;
    }
    updateTicksDisplay() {
        const ticksElement = document.getElementById('ticks');
        if (ticksElement) ticksElement.innerHTML = "Ticks: " + this.ticks;
    }

    // Draw method remains largely the same, focus on separating the canvas drawing logic
    draw(ctx) {
        const cellSize = 10, gap = 1;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.forEachCell((col, row) => {
            if (this.automata[col][row] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(col * cellSize + gap, row * cellSize + gap, cellSize - 2 * gap, cellSize - 2 * gap);
            }
        });
    }
    
    loadPreset(presetName) {
        this.automata = this.createEmptyAutomata(); // Reset the automata grid to all 0s

        // Object containing functions for each preset configuration
        const presets = {
            glider: () => this.addGlider(1, 1), 
            spaceship: () => this.addSpaceship(10, 10), 
            pulsar: () => this.addPulsar(20, 20), 
            gosperGliderGun: () => this.addGosper(1, 5), 
        };

        // Call the function corresponding to the presetName
        if (typeof presets[presetName] === 'function') {
            presets[presetName]();
        } else {
            console.error('Preset not found:', presetName);
        }
    }
}