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