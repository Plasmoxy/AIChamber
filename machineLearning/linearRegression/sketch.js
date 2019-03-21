let data = []

let m = 1
let b = 0

function setup() {
    createCanvas(500, 500)
}


function linearRegression() {
    let xsum = data.map((p) => p.x).reduce((a, x) => a + x)
    let ysum = data.map((p) => p.y).reduce((a, x) => a + x)
    
    let xmean = xsum / data.length
    let ymean = ysum / data.length

    let numerator = data.reduce(
        (a, p) => a + (p.x - xmean) * (p.y-ymean),
        0
    )

    let denominator = data.reduce(
        (a, p) => a + (p.x - xmean) * (p.x - xmean),
        0
    )

    m = numerator/denominator
    b = ymean - m * xmean
}

function drawLine() {
    let x1 = 0
    let y1 = m*x1 + b
    let x2 = 1
    let y2 = m*x2 + b

    x1 = map(x1, 0, 1, 0, width)
    y1 = map(y1, 0, 1, height, 0)
    x2 = map(x2, 0, 1, 0, width)
    y2 = map(y2, 0, 1, height, 0)

    stroke(255, 0, 255)
    line(x1, y1, x2, y2)
}


function mousePressed() {
    let x = map(mouseX, 0, width, 0, 1)
    let y = map(mouseY, 0, height, 1, 0)

    let point = createVector(x, y)
    data.push(point)

    if (data.length > 1) {
        linearRegression()
    }
}

function draw() {
    background(51)

    for (point of data) {
        let x = map(point.x, 0, 1, 0, width)
        let y = map(point.y, 0, 1, height, 0)

        fill(255)
        ellipse(x, y, 8, 8)
    }

    drawLine()

}