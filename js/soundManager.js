// Create Audio objects for all sounds
const rollSound = new Audio('assets/roll.mp3');

// Language-specific result sounds
const resultSounds = {
    de: {
        'Voller Erfolg': new Audio('assets/de/VollerErfolg.mp3'),
        'Teilerfolg': new Audio('assets/de/Teilerfolg.mp3'),
        'Fehlschlag': new Audio('assets/de/Fehlschlag.mp3'),
        'episch': new Audio('assets/de/episch.mp3')
    },
    en: {
        'Strong Hit': new Audio('assets/en/strong.mp3'),
        'Weak Hit': new Audio('assets/en/weak.mp3'),
        'Miss': new Audio('assets/en/miss.mp3'),
        'epic': new Audio('assets/en/epic.mp3')
    }
};

// Function to play overlapping sounds with random offsets
function playOverlappingSounds(result) {
    if (!window.soundEnabled) return;

    const sounds = [
        rollSound,
        new Audio('assets/roll.mp3'),
        new Audio('assets/roll.mp3')
    ];
    
    sounds.forEach((sound, index) => {
        const randomOffset = Math.random() * 120; // Random offset between 0 and 120ms
        setTimeout(() => {
            sound.play().catch(error => console.error("Error playing sound:", error));
        }, index * 60 + randomOffset); // Base delay of 60ms per sound, plus random offset
    });

    // Play the result sound after a delay
    setTimeout(() => {
        const currentLang = getCurrentLanguage();
        let resultSound;
        let epicSound;

        switch (result.successType) {
            case "Voller Erfolg":
            case "Strong Hit":
                resultSound = resultSounds[currentLang][currentLang === 'de' ? 'Voller Erfolg' : 'Strong Hit'];
                break;
            case "Teilerfolg":
            case "Weak Hit":
                resultSound = resultSounds[currentLang][currentLang === 'de' ? 'Teilerfolg' : 'Weak Hit'];
                break;
            case "Fehlschlag":
            case "Miss":
                resultSound = resultSounds[currentLang][currentLang === 'de' ? 'Fehlschlag' : 'Miss'];
                break;
        }

        epicSound = resultSounds[currentLang][currentLang === 'de' ? 'episch' : 'epic'];

        if (resultSound) {
            resultSound.addEventListener('ended', () => {
                // Play epic sound if the roll is epic, but only after the result sound has finished
                if (result.isEpic) {
                    epicSound.play().catch(error => console.error("Error playing epic sound:", error));
                }
            }, { once: true }); // Use { once: true } to ensure the event listener is removed after it's triggered

            resultSound.play().catch(error => console.error("Error playing result sound:", error));
        } else if (result.isEpic) {
            // If there's no result sound but the roll is epic, play the epic sound immediately
            epicSound.play().catch(error => console.error("Error playing epic sound:", error));
        }
    }, 1000); // Delay result sound by 1 second after roll sounds
}

export { playOverlappingSounds };
