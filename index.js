//Global variables

let sampleArray = [
    {sample : new Pizzicato.Sound('samples/moodyKick.wav')},
    {sample : new Pizzicato.Sound('samples/shakerLoop1.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/shakerLoop1.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/shakerLoop1.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/shakerLoop1.wav')},
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
]

let allCounters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let vol = document.getElementById('masterVolume')
let allPads = document.getElementsByClassName('sampleButton')

//Functions


// Event listeners

for (let i=0; i<12; i++){

    allPads.item(i).addEventListener('click', () => {
        if (allCounters[i] === 0) {
            allCounters[i] = 1
            sampleArray[i].sample.play()
            console.log('Sample ' + (i+1) + ' Playing')
            allPads[i].style.backgroundColor = 'var(--padRed)'

        } else {
            allCounters[i] = 0
            sampleArray[i].sample.stop()
            console.log('Sample ' + (i+1) + ' Stopped')
            allPads[i].style.backgroundColor = 'lightgray'
        }
    })

    sampleArray[i].sample.on('end', () => {
        if (allCounters[i] === 1) {
            allCounters[i] = 0
            console.log('Sample ' + (i+1) + ' Ended')
            allPads[i].style.backgroundColor = 'lightgray'
        }
    })

    vol.addEventListener('click', () => {
        let scaledVol = vol.value/100
        sampleArray[i].sample.volume = scaledVol
        console.log('Master Volume: ' + scaledVol)
    })
}




