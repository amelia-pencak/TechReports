const hamburger = document.querySelector(".menu_toggle");
const nav_item = document.querySelector(".nav_item");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav_item.classList.toggle("active");
});

document.querySelectorAll(".nav_link").forEach((n) => 
    n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav_item.classList.remove("active");
    }));