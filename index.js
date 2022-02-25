//Global variables

let sampleArray = [
    {sample : new Pizzicato.Sound('samples/dustyLoop.wav')},
    {sample : new Pizzicato.Sound('samples/moodyKick.wav')},
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

let drive = {
    state : 0,
    effect : new Pizzicato.Effects.Distortion({
        gain: 0.5
    })
}

let reverb = {
    state : 0,
    effect : new Pizzicato.Effects.Reverb({
        time: 1,
        decay: 0.8,
        reverse: true,
        mix: 0.5
    })
}

let allCounters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let vol = document.getElementById('masterVolume')
let allPads = document.getElementsByClassName('sampleButton')
let filterDriveButton = document.getElementById('driveButton')
let control3 = document.getElementById('control3')
let reverbButton = document.getElementById('reverbButton')

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

        // Filter and drive button
        filterDriveButton.addEventListener('click', () => {
            if (drive.state === 0) {
                drive.state = 1
                sampleArray[i].sample.addEffect(drive.effect)
                console.log('Overdrive On')
            } else if (drive.state === 1){
                drive.state = 0
                sampleArray[i].sample.removeEffect(drive.effect)
                console.log('Overdrive Off')
            }

            control3.addEventListener('click', () => {
                drive.effect.gain = control3.value/100
            })
        })

        // Reverb effect button
        reverbButton.addEventListener('click', () => {
            if (reverb.state === 0) {
                reverb.state = 1
                sampleArray[i].sample.addEffect(reverb.effect)
                console.log('Reverb On')
            } else if (reverb.state === 1){
                reverb.state = 0
                sampleArray[i].sample.removeEffect(reverb.effect)
                console.log('Reverb Off')
            }
        })
    })

    // Sample natural stop
    sampleArray[i].sample.on('end', () => {
        if (allCounters[i] === 1) {
            allCounters[i] = 0
            console.log('Sample ' + (i+1) + ' Ended')
            allPads[i].style.backgroundColor = 'lightgray'
        }
    })

    // Master volume
    vol.addEventListener('click', () => {
        let scaledVol = vol.value/100
        sampleArray[i].sample.volume = scaledVol
        console.log('Master Volume: ' + scaledVol)
    })
}

// Need to do: add cutoff filter to filter+drive button


