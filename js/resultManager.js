import { formatDateTime } from './uiHelper.js';

// Function to get the appropriate result image
function getResultImage(successType) {
    switch (successType) {
        case "Voller Erfolg":
        case "Strong Hit":
            return 'assets/vollerErfolg.png';
        case "Teilerfolg":
        case "Weak Hit":
            return 'assets/Teilerforg.png';
        case "Fehlschlag":
        case "Miss":
            return 'assets/Fehlschlag.png';
        default: return '';
    }
}

// Function to create a result card
function createResultCard(result) {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result-card");
    
    const isD10Beaten = (diceValue, result) => result > diceValue ? 'beaten' : 'not-beaten';
    
    // Calculate the modifier result, capped at 10
    const modifierResult = Math.min(result.isAction ? result.modifier + result.d6 : result.modifier, 10);
    
    const currentLang = getCurrentLanguage();
    const actionText = currentLang === 'de' ? 'Aktion' : 'Action';
    const challengeText = currentLang === 'de' ? 'Herausforderung' : 'Challenge';
    const epicText = currentLang === 'de' ? 'episch' : 'epic';
    const modifierText = getTranslation('modifier');
    
    resultDiv.innerHTML = `
        <h4>${getTranslation('rollNumber')} ${result.rollNumber} (${result.isAction ? actionText : challengeText})</h4>
        <div class="icons">
            <img src="${result.resultImage}" alt="${result.successType}">
            ${result.isEpic ? `<img src="assets/episch.png" alt="${epicText}">` : ''}
        </div>
        <div class="topic">${result.topic}</div>
        <div class="result">${getTranslation(result.successType.toLowerCase().replace(' ', ''))}${result.isEpic ? ` (${epicText})` : ''}</div>
        <div class="modifier">${modifierText}: <span class="modifier-value">+${result.modifier}</span> <span class="modifier-result">(=${modifierResult})</span></div>
        <div class="dice-results">
            <div class="dice d6">
                <div class="dice-symbol">&#9856;</div>
                <div class="dice-value">${result.isAction ? result.d6 : '-'}</div>
            </div>
            <div class="dice d10">
                <div class="dice-symbol">&#9861;</div>
                <div class="dice-value ${isD10Beaten(result.d10_1, result.result)}">${result.d10_1}</div>
            </div>
            <div class="dice d10">
                <div class="dice-symbol">&#9861;</div>
                <div class="dice-value ${isD10Beaten(result.d10_2, result.result)}">${result.d10_2}</div>
            </div>
        </div>
        <div class="timestamp">${formatDateTime(result.timestamp)}</div>
    `;
    
    return resultDiv;
}

export { getResultImage, createResultCard };
