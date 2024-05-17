export function Loader(display) {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.style.display = display;
  loader.innerHTML = `
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
        <div class="circle circle3"></div>`;

  if (display === "flex") {
    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }

  document.body.appendChild(loader);
}
