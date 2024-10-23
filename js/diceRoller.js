import { playOverlappingSounds } from './soundManager.js';
import { getResultImage, createResultCard } from './resultManager.js';
import { formatDateTime, displayLatestResult } from './uiHelper.js';
import { animateDice } from './diceAnimator.js';

// Roll the dice and display results
function rollDiceAndDisplayResults() {
    const variableInput = document.getElementById("variableInput");
    const topicInput = document.getElementById("topicInput");
    const variable = parseInt(variableInput.value); 
    const topic = topicInput.value.trim();
    const isAction = document.getElementById("toggleButton").textContent === getTranslation('action');

    if (isNaN(variable)) {
        showMessage('error', getTranslation('invalidVariable'));
        return;
    }

    const modifier = variable;
    const d6 = isAction ? Math.ceil(Math.random() * 6) : 0;
    const d10_1 = Math.ceil(Math.random() * 10);
    const d10_2 = Math.ceil(Math.random() * 10);

    // Calculate result, capped at 10
    let result = Math.min(isAction ? d6 + modifier : modifier, 10);
    let successType = "";
    let isEpic = (d10_1 === d10_2);

    if (result > d10_1 && result > d10_2) {
        successType = getCurrentLanguage() === 'de' ? "Voller Erfolg" : "Strong Hit";
    } else if (result > d10_1 || result > d10_2) {
        successType = getCurrentLanguage() === 'de' ? "Teilerfolg" : "Weak Hit";
    } else {
        successType = getCurrentLanguage() === 'de' ? "Fehlschlag" : "Miss";
    }

    const resultImage = getResultImage(successType);
    const timestamp = new Date().toISOString();

    const resultObj = {
        isAction,
        topic,
        successType,
        isEpic,
        d6,
        d10_1,
        d10_2,
        result,
        modifier,
        timestamp,
        resultImage
    };

    saveResultToLocalStorage(resultObj);
    displayLatestResult(resultObj);

    topicInput.value = '';

    animateDice(isAction, d6, d10_1, d10_2);
    playOverlappingSounds(resultObj);
}

// Make functions globally accessible
window.rollDiceAndDisplayResults = rollDiceAndDisplayResults;
window.formatDateTime = formatDateTime;
window.createResultCard = createResultCard;

export { rollDiceAndDisplayResults };
