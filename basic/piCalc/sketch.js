
function integral(f, a, b, iterations) {
    let dx = 1.0*abs(b-a)/iterations
    let area = 0
    
    let x = area
    while (x <= b) {
        area += f(x)*dx
        x += dx
    }
    
    return area
}

function setup() {
    createCanvas(500, 500)

    let f = (x) => Math.sqrt(
        1 - Math.pow(x, 2)
    )

    let t = Date.now()

    let mypi = 4*integral(f, 0, 1, Math.pow(10, 8))

    console.log("a = ", mypi)
    console.log("ms = ", Date.now() - t)
}

function draw() {

}