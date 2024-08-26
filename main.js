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
const coinList = document.querySelector("#coinList");
const options = {

    method: 'GET',
    headers: { accept: 'application/json', Authorization: key },
    // mode: "no-cors"
};


fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
    .then(response => response.json())
    .then(coins => {
        setTimeout(() => {
            coinList.innerHTML = ""
            coins.forEach((coin, index) => {
                index + 1 <= 10 && (
                    coinList.innerHTML += ` 
                    <tr class="border h-14 hover:bg-[#fcfcfc] duration-300">
                    <td class="border">
                        <div class="flex items-center md:justify-center gap-3 pl-2">
                            <img src='${coin.image}'alt=""
                                class="w-5 h-5 object-cover">
                            <span class="md:w-[10%] text-nowrap"> ${coin.name} </span>
                        </div>

                    </td>

                    
                    <td class="border">
                    <div class='pl-2 flex items-center md:justify-center gap-2'>
                        <span> ${new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(coin.current_price)} </span>
                          <sup class='text-green-500'>+${coin.current_price > 1 ? '30%' : '40%'}
                          </sup>
                    </div>
                    </td>
                </tr>`
                )
            })
        }, 500)
    }).catch(err => console.error(err));

let navbar = document.querySelector("#navbar")
let overlay = document.querySelector("#overlay")
navbar.onclick = () => {
    let spans = document.querySelectorAll("#navbar span");
    let span1 = spans[0];
    let span2 = spans[1]
    let span3 = spans[2]
    if (span1.classList.contains("translate-y-0")) {
        span1.classList.replace("translate-y-0", "translate-y-1");
        span1.classList.replace("rotate-0", "rotate-45");
        span2.classList.replace("opacity-1", "opacity-0")
        span3.classList.replace("translate-y-0", "-translate-y-2");
        span3.classList.replace("rotate-0", "-rotate-45");
        overlay.classList.replace("translate-x-[-100%]", "translate-x-0")
    } else {
        span1.classList.replace("translate-y-1", "translate-y-0");
        span1.classList.replace("rotate-45", "rotate-0");
        span2.classList.replace("opacity-0", "opacity-1")
        span3.classList.replace("-translate-y-2", "translate-y-0");
        span3.classList.replace("-rotate-45", "rotate-0");
        overlay.classList.replace("translate-x-0", "translate-x-[-100%]")
    }

}