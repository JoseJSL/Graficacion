export function Stopwatch(element){
    this.span = element;
    this.interval = null;
    this.Start = Start;
    this.Stop = Stop;
    this.timeStart = 0;

    function Start(){
        const start = Date.now();
        var d;
        this.interval = setInterval(() => {
            d = Date.now() - start;
            const m = Math.floor(d/60000);
            const s = Math.floor(d/1000) - m*60;
            d = Math.floor(d/10)
            this.span.innerHTML = `${Format(m)}:${Format(s)}:${Format(d)}`
        }, 10);
    }

    function StartNoCount(){
        this.timeStart = Date.now();
    }

    function StopNoCount(){
        var d = Date.now() - this.timeStart;
        const m = Math.floor(d/60000);
        const s = Math.floor(d/1000) - m*60;
        d = Math.floor(d/10)
        alert(`${Format(m)}:${Format(s)}:${Format(d)}`);
    }

    function Stop(){
        clearInterval(this.interval);
    }

    const Format = (n) => ('00' + n).slice(-2);
}
