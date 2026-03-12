import Events from "./Events";


export default class Viewport
{
    constructor($canvas)
    {
        this.canvas = $canvas.parentElement
        this.events = new Events();

        this.measure();  
        this.resize(); 
    }

    measure()
    {
        const measureElement = this.canvas.getBoundingClientRect();
        this.width = measureElement.width;
        this.height = measureElement.height;
        this.ratio = this.width / this.height

        // this.pixelRatio = min(window.devicePixelRatio, 2);
        this.pixelRatio = 2;
    }

    resize()
    {
        addEventListener('resize', ()=>{
            this.measure();

            this.events.trigger('resize');
        })
    }
}