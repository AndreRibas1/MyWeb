function decryptEffect(element) {
    const texts = element.dataset.texts.split(",");
    let textIndex = 0;

    function animateText(originalText) {
        const duration = 100;
        const phases = 5;
        let index = 0;
        let phaseCount = 0;

        function randomChar() {
            const chars = "abcdefghijklmnopqrstuvwxyz!@#$%&*^?";
            return chars.charAt(Math.floor(Math.random() * chars.length));
        }

        function reEncrypt() {
            if(index > 0) {
                element.textContent = 
                    element.textContent.substring(0, index - 1) +
                    randomChar() + 
                    Array.from({ length: originalText.length - index + 1 }, () =>
                        randomChar()
                    ).join("");
                index--;
                setTimeout(reEncrypt, duration);
            } else {
                // Se não há mais textos, reinicie textIndex para 0
                if (++textIndex >= texts.length) {
                    textIndex = 0;
                }
                setTimeout(() => animateText(texts[textIndex]), duration);
            }
        }

        function update() {
            if (index < originalText.length) {
                if (phaseCount < phases) {
                    element.textContent =
                        element.textContent.substring(0, index) +
                        randomChar() +
                        Array.from({ length: originalText.length - index - 1 }, () =>
                            randomChar()
                        ).join("");
                    phaseCount++;
                    setTimeout(update, duration);
                } else {
                    element.textContent =
                        element.textContent.substring(0, index) +
                        originalText[index] +
                        Array.from({ length: originalText.length - index - 1 }, () =>
                            randomChar()
                        ).join("");
                    index++;
                    phaseCount = 0;
                    setTimeout(update, duration);
                }
            } else {
                setTimeout(reEncrypt, 2000);
            }
        }

        element.textContent = Array.from({ length: originalText.length }, () =>
            randomChar()
        ).join("");
        setTimeout(update, duration);
    }

    animateText(texts[textIndex]);
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', (event) => {
    const elementsToDecrypt = document.querySelectorAll('.text-decrypt');

    function checkAndDecrypt() {
        elementsToDecrypt.forEach(element => {
            if (isInViewport(element) && !element.dataset.decrypted) {
                element.dataset.decrypted = 'true'; // Marque como descriptografado, mas ainda assim permita o loop
                decryptEffect(element);
            }
        });
    }

    window.addEventListener('scroll', checkAndDecrypt);
    checkAndDecrypt();
});
