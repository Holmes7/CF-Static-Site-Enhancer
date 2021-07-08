let inputs = document.querySelectorAll('.input');
for (input of inputs) {
    let btn = document.createElement('button');
    let text = input.querySelector('pre').textContent;
    // btn.setAttribute('data-copy', text);
    btn.innerHTML = 'Copy'
    btn.addEventListener('click', function() {
        navigator.clipboard.writeText(text);
    })
    input.querySelector(".title").appendChild(btn);
}
