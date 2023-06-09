const light_mode_button = document.getElementById("light_mode_button")
light_mode_button.addEventListener("click", () =>{
    document.body.classList.toggle("light_mode")
})

const downloadLinks = document.querySelectorAll("[data-download]");

downloadLinks.forEach(button => {
    const id = button.dataset.download;
    const image = document.getElementById(id);
    const a = document.createElement("a");

    a.href = image.src;
    a.download = "";
    a.style.display = "none";

    button.addEventListener("click", () => {
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

document.querySelectorAll(".copy-link").forEach(copyLinkContainer => {
    const inputFeld = copyLinkContainer.querySelector(".copy-link-input");
    const copyButton = copyLinkContainer.querySelector(".copy-link-button");
   

    inputFeld.addEventListener("focus", () => inputFeld.select());

    copyButton.addEventListener("click", () => {
        const text = inputFeld.value;

        inputFeld.select();
        navigator.clipboard.writeText(text);

        inputFeld.value = "Link kopiert :)";
        setTimeout(() => inputFeld.value = text, 3000);

    })

});