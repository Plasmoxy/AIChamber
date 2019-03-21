let data = []

let m = 1
let b = 0
let r = 1

function setup() {
    createCanvas(500, 500)
    textSize(16)
}


function linearRegression() {
    const xs = data.map((p) => p.x)
    const ys = data.map((p) => p.y)

    const xsum = xs.reduce((a, x) => a + x)
    const ysum = ys.reduce((a, x) => a + x)

    const xmean = xsum / data.length
    const ymean = ysum / data.length

    const numerator = data.reduce(
        (a, p) => a + (p.x - xmean) * (p.y-ymean),
        0
    )

    const denominator = data.reduce(
        (a, p) => a + (p.x - xmean) * (p.x - xmean),
        0
    )

    m = numerator/denominator
    b = ymean - m * xmean

    const totalSum = ys.reduce((a, y) => a + Math.pow(y - ymean, 2))
    const residualSum = data.reduce(
        (a, p) => a + Math.pow(p.y - (m*p.x + b), 2),
        0
    )

    // coefficient of determination
    r = 1 - Math.round(1000*Math.sqrt(residualSum/totalSum))/1000.0
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

    data.push(
        createVector(
            map(mouseX, 0, width, 0, 1),
            map(mouseY, 0, height, 1, 0)
        )
    )

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

    noStroke()
    fill(255)
    text("[y = mx + b]\nr = " + r + "\nm = " + m + "\nb = " + b, 20, 30)

}