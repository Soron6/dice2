function animateDice(isAction, d6, d10_1, d10_2) {
    const d6Element = document.getElementById("d6Animation");
    const d10_1Element = document.getElementById("d10Animation1");
    const d10_2Element = document.getElementById("d10Animation2");

    d6Element.style.visibility = isAction ? "visible" : "hidden";
    const diceElements = [d6Element, d10_1Element, d10_2Element];

    diceElements.forEach(el => {
        el.querySelector('.resultText').textContent = '';
        el.classList.remove("fallingAnimation");
        el.offsetHeight; // Trigger reflow
        
        // Random spin between 360 and 1080 degrees
        const spinAmount = (Math.random() > 0.5 ? '' : '-') + (Math.random() * 720 + 360);
        
        // Random bounce heights
        const bounce1Height = 40 + Math.random() * 20; // Between 40% and 60%
        const bounce2Height = 20 + Math.random() * 15; // Between 20% and 35%
        
        el.style.setProperty('--spin-amount', `${spinAmount}deg`);
        el.style.setProperty('--bounce1-height', `${bounce1Height}%`);
        el.style.setProperty('--bounce2-height', `${bounce2Height}%`);
    });

    // Animate dice with slight offsets
    setTimeout(() => d10_1Element.classList.add("fallingAnimation"), 0);
    setTimeout(() => d10_2Element.classList.add("fallingAnimation"), 60);
    if (isAction) {
        setTimeout(() => d6Element.classList.add("fallingAnimation"), 120);
    }

    // Set the final values after animation
    setTimeout(() => {
        diceElements.forEach(el => el.classList.remove("fallingAnimation"));
        if (isAction) d6Element.querySelector('.resultText').textContent = d6;
        d10_1Element.querySelector('.resultText').textContent = d10_1;
        d10_2Element.querySelector('.resultText').textContent = d10_2;
    }, 1080); // Match this with the animation duration
}

export { animateDice };
