export class Main {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private beginDraw = false;
    private previousX = 0;
    private currentX = 0;
    private previousY = 0;
    private currentY = 0;
    private dotFlag = false;
    private fillColor = "black";
    private stroke = 2;
    private width: number;
    private height: number;

    constructor(){
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
            this.findxy("move", e);
        });

        this.canvas.addEventListener("mousedown", (e: MouseEvent) => {
            this.findxy("down", e);
        });

        this.canvas.addEventListener("mouseup", (e: MouseEvent) => {
            this.findxy("up", e);
        });

        this.canvas.addEventListener("mouseout", (e: MouseEvent) => {
            this.findxy("out", e);
        });

        const colorDivs = document.getElementsByClassName("color-item");

        for (const div of colorDivs as unknown as HTMLDivElement[]) {
            div.addEventListener("click", (e: MouseEvent) =>{
                const targetElement = e.target as HTMLDivElement;
                this.color(targetElement.id);
            });
        }

        (document.getElementById("save") as HTMLInputElement).addEventListener("click", () => {
            this.save()
        });

        (document.getElementById("clear") as HTMLInputElement).addEventListener("click", () => {
            this.clear()
        });

    }

    public color(color: string): void{
        this.fillColor = color;
        if(this.fillColor === "white") {
            this.stroke = 20;
        } else {
            this.stroke = 2;
        }
    }

    public draw(): void {
        this.ctx.beginPath();
        this.ctx.moveTo(this.previousX, this.previousY);
        this.ctx.lineTo(this.currentX, this.currentY);
        this.ctx.strokeStyle = this.fillColor;
        this.ctx.lineWidth = this.stroke;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public clear(): void {
        const doesWantToClear = confirm("Are you sure you want to clear?");
        if(doesWantToClear) {
            this.ctx.clearRect(0,0, this.width, this.height);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    public save(): void {
        const img = document.getElementById("canvasimg") as HTMLImageElement;
        img.style.border = "2px solid";
        const dataUrl = this.canvas.toDataURL();
        img.src = dataUrl;
        img.style.display = "inline";
    }

    public findxy(eventType: string, e: MouseEvent): void {
        // console.log(eventType)
        if(eventType === "down") {
            this.previousX = this.currentX;
            this.previousY = this.currentY;
            this.currentX = e.clientX - this.canvas.offsetLeft;
            this.currentY = e.clientY - this.canvas.offsetTop;
            this.beginDraw = true;
            this.dotFlag = true;
            if(this.dotFlag){
                this.ctx.beginPath();
                this.ctx.fillStyle = this.fillColor;
                this.ctx.fillRect(this.currentX, this.currentY, this.stroke, this.stroke);
            }
        }

        if(eventType === "up" || eventType === "out"){
            this.beginDraw = false;
            
        }

        if(eventType === "move"){
            if(this.beginDraw){
            this.previousX = this.currentX;
            this.previousY = this.currentY;
            this.currentX = e.clientX - this.canvas.offsetLeft;
            this.currentY = e.clientY - this.canvas.offsetTop;
            this.draw();
            }
        }
    }
}

new Main()