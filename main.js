fetch("./icon.html").then(res => res.text()).then(res => {
    document.querySelector("#icons").innerHTML = res
})

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: true,
    speed: 600,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },


});
const key = "CG-4MjDXpJJ2oCvPhUmUG5a5dCz";
const options = { method: 'GET', headers: { accept: 'application/json', Authorization: `Bearer ${key}` } };

fetch('https://pro-api.coingecko.com/api/v3/ping', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));