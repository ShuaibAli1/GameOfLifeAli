class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const img = new Image();

            const path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", () => {
                console.log("Loaded " + img.src);
                this.successCount++;
                if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.log("Error loading " + img.src);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    };

    getAsset(path) {
        return this.cache[path];
    };

    loadPreset(presetName) {
        this.automata = this.createEmptyAutomata(); // Reset the automata

        const presets = {
            glider: () => this.addGlider(10, 10),
            spaceship: () => this.addSpaceship(15, 15),
            pulsar: () => this.addPulsar(20, 20),
            gosperGliderGun: () => this.addGosper(10, 50),
        };

        // Call the preset function if it exists
        if (presets[presetName]) {
            presets[presetName]();
        }
    }

    // Method to add a glider
    addGlider(col, row) {
        this.setCell(col + 1, row, 1);
        this.setCell(col + 2, row + 1, 1);
        this.setCell(col, row + 2, 1);
        this.setCell(col + 1, row + 2, 1);
        this.setCell(col + 2, row + 2, 1);
    }

    // Method to add a lightweight spaceship (LWSS)
    addSpaceship(col, row) {
        this.setCell(col + 1, row, 1);
        this.setCell(col + 2, row, 1);
        this.setCell(col + 3, row, 1);
        this.setCell(col + 4, row, 1);
        this.setCell(col, row + 1, 1);
        this.setCell(col + 4, row + 1, 1);
        this.setCell(col + 4, row + 2, 1);
        this.setCell(col, row + 3, 1);
        this.setCell(col + 3, row + 3, 1);
    }

    // Existing methods to add Pulsar and Gosper Glider Gun...

    // Helper method to set the value of a cell
    setCell(col, row, value) {
        if (col >= 0 && col < this.width && row >= 0 && row < this.height) {
            this.automata[col][row] = value;
        }
    }
};

