

function calcPi(gpu) {

    const a = 0
    const b = 1
    const segments = 10000
    const iPerThread = 100

    const dSegment = 1.0*(b-a)/segments

    // construct inputVector of dSegment distance slices of b-a
    let inputVector = []
    for (let i = a; i < b; i += dSegment) {
        inputVector.push(i)
    }

    const piIntegral = gpu.createKernel(function(v, iPerThread, dSeg) {
        const a = v[this.thread.x]
        const b = a + dSeg
        const dx = dSeg/iPerThread
        
        let area = 0
        let x = a
        while (x <= b) {
            area += Math.sqrt(1 - Math.pow(x, 2)) * dx // pi func
            x += dx
        }

        return area
    }).setOutput([inputVector.length])
    
    const sumVector = piIntegral(inputVector, iPerThread, dSegment)
    const sum = sumVector.reduce((a, x) => a + x)
    console.log(4*sum)
}

function setup() {
    createCanvas(500, 500)
    const gpu = new GPU()
    
    calcPi(gpu)
}

function draw() {
    
}