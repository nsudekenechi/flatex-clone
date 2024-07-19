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
                    coinList.innerHTML += ` <tr class="border h-14 hover:bg-[#fcfcfc] duration-300">
                    <td class="border">
                        <div class="flex items-center justify-center gap-3">
                            <img src='${coin.image}'alt=""
                                class="w-5 h-5 object-cover">
                            <span class="w-[10%] text-nowrap"> ${coin.name} <span class='uppercase'> (${coin.symbol})</span></span>
                        </div>

                    </td>

                    <td class="border">${new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(coin.current_price)}</td>
                    <td class="border">
                    <div class='flex items-center justify-center gap-2'>
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