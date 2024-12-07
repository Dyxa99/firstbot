const { Telegraf } = require("telegraf");
require("dotenv").config();
const { apiUrl } = require("../data/urls.json");

const bot = new Telegraf(process.env.token);

bot.start((msg) => msg.reply("Привіт. Я можу надати актуальний курс валют. Для цього натисніть /exch."));


bot.help((msg) => msg.reply("/exch sum from to - отримати курс валют."));

bot.command("exch", async (msg) => {
    const { text } = msg.message;
    if (!text) {
        return msg.reply("Сталася помилка: відсутній текст команди.");
    }

    const [sum, from, to] = text.split(" ").slice(1);
    if (!sum || !from || !to) {
        return msg.reply("Невірний формат команди. Використовуйте: /exch sum from to. Наприклад: /exch 100 USD EUR");
    }

    try {
        const response = await fetch(`${apiUrl}v6/${process.env.apikey}/latest/${from}`);
        const data = await response.json();

        if (data && data.conversion_rates && data.conversion_rates[to]) {
            const conversion_rate = data.conversion_rates[to];
            const converted_sum = (sum * conversion_rate).toFixed(2);
            msg.reply(`${sum} ${from} = ${converted_sum} ${to}`);
        } else {
            msg.reply("Не вдалося отримати курс валют. Перевірте правильність введених даних.");
        }
    } catch (error) {
        console.error(error);
        msg.reply("Сталася помилка при отриманні даних. Спробуйте ще раз.");
    }
});



bot.launch(() => console.log("Start"))