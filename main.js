
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
let coin = document.querySelector("#coin");
let mkt_price = document.querySelectorAll(".mkt_price")
let sell_price = document.querySelectorAll(".sell_price")
const options = {

    method: 'GET',
    headers: { accept: 'application/json', Authorization: key },
    // mode: "no-cors"
};


fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
    .then(response => response.json())
    .then(coins => {
        setTimeout(() => {
            if (coinList) {
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
            }
        }, 500)
        if (coin) {
            coins.forEach(item => {
                let currPrice = item.current_price;
                let mktPrice = new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(currPrice);
                let percent = item.current_price > 1 ? item.current_price * 0.3 : item.current_price * 0.4;
                let sellPrice = new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(item.current_price + percent)

                coin.innerHTML += `<option data-sell_price='${sellPrice}'   data-mkt_price='${mktPrice}' value='${item.name}'>${item.name}  (${item.symbol.toUpperCase()})</option>`
            })
            mkt_price.forEach(item => {
                item.value = new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(coins[0].current_price)
            })

            let selectedPrice = coins[0].current_price
            let percentage = selectedPrice > 1 ? selectedPrice * 0.3 : selectedPrice * 0.4;

            sell_price.forEach(item => {
                item.value = new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(percentage + selectedPrice)
            })
        }

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
let country = document.querySelector("#country");
if (country) {
    fetch("./country.json").then(res => res.json()).then(data => {
        data.country.forEach(item => {
            country.innerHTML += `<option value=${item}>${item}</option>`
        })

    })
}

// when quantity changes, we want to change what we sell
let quantity = document.querySelector("#qty")
if (quantity) {
    quantity.onkeyup = (e) => {
        let mktPrice = parseFloat(mkt_price[0].value.replace(/[$,]/g, ""));
        let percentage = mktPrice > 1 ? mktPrice * 0.3 : mktPrice * 0.4;
        let sellPrice = parseFloat(mktPrice) + percentage;
        sell_price.forEach(item => {
            item.value = new Intl.NumberFormat("en-us", { currency: "USD", style: "currency" }).format(sellPrice * e.target.value)
        })
    }

    coin.onchange = (e) => {
        let selectedOption = coin.querySelector(`option[value='${e.target.value}']`)
        mkt_price.forEach(item => {
            item.value = selectedOption.dataset.mkt_price
        })
        sell_price.forEach(item => {
            item.value = selectedOption.dataset.sell_price;
        })
    }
}

if (location.search.includes("email=s")) {
    alert("Ticket Submitted Successfully")
}
