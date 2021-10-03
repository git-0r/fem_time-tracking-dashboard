let data;

{
    fetch('data.json')
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            showData(result)
            data = result
        })
}

let timeframe = "weekly"

function showData(result) {

    for (const data of result) {
        const main = document.querySelector('main')
        const div = document.createElement("div")
        div.setAttribute("class", `card ${data.title}`)
        div.innerHTML = `<div class="time-container"><div class= "card-title" ><p class="title">${data.title}</p><img class="icon-ellipsis" src="./images/icon-ellipsis.svg" alt=""></div><div class="time"><p class="current-time">${currentTime(data)}hrs</p><p class="lastWeek-time">Last Week - ${previousTime(data)}hrs</p></div ></div>`
        main.appendChild(div)
    }
}

const currentTime = (data) => {
    switch (timeframe) {

        case "daily":
            return data.timeframes.daily.current
        case "weekly":
            return data.timeframes.weekly.current
        case "monthly":
            return data.timeframes.monthly.current
    }
}

const previousTime = (data) => {
    switch (timeframe) {

        case "daily":
            return data.timeframes.daily.previous
        case "weekly":
            return data.timeframes.weekly.previous
        case "monthly":
            return data.timeframes.monthly.previous
    }
}

const timeframes = document.querySelectorAll('.timeframe')

timeframes.forEach(timeFrame => {
    timeFrame.addEventListener('click', () => {
        const selectedTimeFrame = timeFrame.innerText

        timeframe = selectedTimeFrame.toLowerCase()
        const main = document.querySelector('main')
        const cards = document.querySelectorAll('.card')

        cards.forEach(card => {
            main.removeChild(card)
        })
        showData(data)

        timeframes.forEach(timeframe => {
            timeframe.classList.remove('active')
        })
        timeFrame.classList.add('active')

    })
})