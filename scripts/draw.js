// © Miles Hansell 2024

export class Draw{
    constructor(height, width, bg_color, start, update){
        this.HEIGHT = height;
        this.WIDTH = width;

        this.BACKGROUND_COLOR = bg_color;

        this.canvas = document.getElementById("cnv");
        this.context = this.canvas.getContext("2d");

        this.fps_counter = document.getElementById("fps");
        this.fps_time = 0;

        this.running = true;
        this.time = 0;

        this.start = start;
        this.update = update;
    }

    init(){
        this.canvas.width = this.WIDTH;  
        this.canvas.height = this.HEIGHT;

        document.getElementById("dip").style.width = String(this.WIDTH) + "px"

        this.time = performance.now();

        this.start_backend();
    }

    start_backend(){
        this.start();
        this.update_backend();
    }

    update_backend(){
        var deltaTime = performance.now() - this.time;
        this.time = performance.now();

        this.fps_time += deltaTime / 1000;
        if (this.fps_time >= 0.5){
            this.fps_counter.textContent = (1000 / deltaTime).toFixed();
            this.fps_time = 0;
        }

        this.context.fillStyle = this.BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        this.update(deltaTime);

        window.requestAnimationFrame(this.update_backend.bind(this));
    }

    line(x0, y0, x1, y1, color){
        this.context.beginPath();
        this.context.strokeStyle = color;

        this.context.moveTo(x0,y0);
        this.context.lineTo(x1,y1);

        this.context.stroke();
        this.context.closePath();
    }

    vertex(x, y, color, size, outline_color=color){
        this.context.beginPath();
        this.context.strokeStyle = outline_color;
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.stroke();
    }

    triangle(x0, y0, x1, y1, x2, y2, color, fill=false, size=3){
        this.context.beginPath();
        this.context.strokeStyle= color;
        this.context.lineWidth = size;

        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x0, y0);

        if (fill){
            this.context.fillStyle = color;
            this.context.fill();
        }

        this.context.stroke();
        this.context.closePath();
    }
}