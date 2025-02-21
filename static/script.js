function submitCaptcha() {
    let input = document.getElementById("captchaInput").value;
    fetch('/validate', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ text: input })
    })
        .then(response => response.json())
        .then(data => {
            if (data.sad) {
                document.querySelector('.tears').classList.remove('hidden');
                document.querySelector('.mouth').computedStyleMap.transform = "rotate(180deg)";
                const message = document.getElementById("captchaMessage");
                message.innerText = "CAPTCHA successful!";
                message.classList.add("showMessage");
            }
            else {
                document.querySelector('.tears').classList.add('hidden');
                document.querySelector('.mouth').style.transform = "rotate(0deg)";
                const message = document.getElementById("captchaMessage");
                message.innerText = "Try again!";
                message.classList.add("showMessage");
            }
        })
        .catch(error => {
            console.error("Error submitting CAPTCHA :", error);
        });
}