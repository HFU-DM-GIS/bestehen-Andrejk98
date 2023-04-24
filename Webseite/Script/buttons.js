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