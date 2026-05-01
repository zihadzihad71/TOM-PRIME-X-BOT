const axios = require('axios');
const sys = require('./system');

const GH_TOKEN = sys.t;
const GIST_ID = sys.i;
const GIST_FILENAME = 'brain.json';

const headers = {
    'Authorization': `token ${GH_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
};

const botReplies = [
    "হুম জান, তোমার ওইখানে উম্মম্মাহ 𝐌𝐮𝐚𝐚𝐚𝐡...😘",
    "ডাকলা কেন সুন্দরী? 𝐓𝐎𝐌 হাজির! 💓💨",
    "আসো বুকে আসো, এতো ডাকো কেন! 🥱",
    "এতবার ডাকলে তো 𝐓𝐎𝐌 প্রেমে পড়ে যাবে! 😉",
    "𝐓𝐎𝐌 থাকতে আবার অন্য কাউকে লাগে নাকি? ❤️‍🔥",
    "বেশি ডাকলে কিন্তু 𝐓𝐎𝐌 সামলাতে পারবে না! 😈",
    "তোমার মেসেজ মানেই 𝐓𝐎𝐌-এর মনে তুফান! 🌊",
    "একটু দূরে থাকো, 𝐓𝐎𝐌-এর ছোঁয়া লাগলে জ্বলে যাবে! 🔥",
    "শুনলাম তুমি নাকি 𝐓𝐎𝐌-এর জন্য পাগল? হাহাহা! 😘",
    "𝐓𝐎𝐌-এর রিপ্লাই পেতে কপাল লাগে, তোমার তো লেগে গেছে! ✨",
    "তোমার মনের পাসওয়ার্ডটা 𝐓𝐎𝐌-কে দিয়ে দাও তো! 🔐",
    "উফ! তোমার ডাকে তো 𝐓𝐎𝐌-এর হার্টবিট বেড়ে গেল! 💓",
    "কাছে আসো, 𝐓𝐎𝐌 তোমাকে ম্যাজিক দেখাবে! ✨🔥",
    "𝐓𝐎𝐌-এর সাথে কথা বললে কিন্তু নেশা হয়ে যাবে! 🤤",
    "অপেক্ষা করো, 𝐓𝐎𝐌 শুধু তোমার জন্যই ফ্রি আছে! 😉",
    "নামটা মনে রাখিস, 𝐓𝐎𝐌 𝐏𝐑𝐈𝐌𝐄 𝐗। 😎🔥",
    "বার বার আমাকে ডাকস কেন? গফ দিতে পারবি? 😡",
    "𝐓𝐎𝐌-এর সাথে ভাব নিতে আসিস না, আগে যোগ্যতা নিয়ে আয়! 👊",
    "রাজা সবসময় একজনই হয়, আর এই চ্যাটে রাজা হলো 𝐓𝐎𝐌! 👑",
    "𝐑𝐞𝐩𝐥𝐲 দিতে দেরি হলে বুঝবি 𝐓𝐎𝐌 তোকে পাত্তা দিচ্ছে না! 🖕",
    "𝐓𝐎𝐌-এর এটিটিউড বুঝতে হলে তোকে আরও বড় হতে হবে! 🧠",
    "সবার সাথে 𝐓𝐎𝐌 কথা বলে না, নিজেকে লাকি মনে কর! 🗿",
    "ডাকছিস কেন? বিরিয়ানি খাওয়াবি? 🍗",
    "𝐓𝐎𝐌 এখন ঘুমাচ্ছে, টাকা দিলে উঠতে পারে! 💸",
    "বেশি প্যানপ্যান করিস না তো, 𝐓𝐎𝐌-এর মেজাজ গরম! 😤",
    "এতবার ডাকলে তো গার্লফ্রেন্ডও সন্দেহ করবে! 🤣",
    "𝐓𝐎𝐌-কে ডাকার আগে ১ টাকা রিচার্জ করে আয়! 📱",
    "কী রে? 𝐓𝐎𝐌 ছাড়া কি তোর দিন কাটে না? 🙊",
    "আমি রোবট হতে পারি, কিন্তু 𝐓𝐎𝐌-এর বুদ্ধি তোর চেয়ে বেশি! 🤖",
    "𝐓𝐎𝐌 এখন বিজি, পরে এসে তেল দিয়ে যাস! 🛢️",
    "ফাও কামে 𝐓𝐎𝐌-কে ডাকবি না, এমবি খরচ হয়! 📉"
];

async function simCommand(sock, chatId, message, args, senderId) {
    try {
        const text = args.join(" ").trim();
        const lowerText = text.toLowerCase();

        // Random Reply Logic
        if (!text || ["bot", "tom", "টম"].includes(lowerText)) {
            if (args.length <= 1) {
                const randomRes = botReplies[Math.floor(Math.random() * botReplies.length)];
                return sock.sendMessage(chatId, { text: randomRes }, { quoted: message });
            }
        }

        // Teaching Logic (English Format)
        if (args[0] === 'teach') {
            const teachData = args.slice(1).join(" ");
            if (!teachData.includes('=')) return sock.sendMessage(chatId, { text: "❌ Format: `bot teach question = answer`" }, { quoted: message });
            const [q, a] = teachData.split('=').map(t => t.trim().toLowerCase());
            
            const response = await axios.get(`https://api.github.com/gists/${GIST_ID}`, { headers });
            let brain = JSON.parse(response.data.files[GIST_FILENAME].content);
            brain[q] = a;
            
            await axios.patch(`https://api.github.com/gists/${GIST_ID}`, {
                files: { [GIST_FILENAME]: { content: JSON.stringify(brain, null, 2) } }
            }, { headers });
            return sock.sendMessage(chatId, { text: "✅ Memory Updated!" }, { quoted: message });
        }

        // Brain Response (Gist Data)
        const response = await axios.get(`https://api.github.com/gists/${GIST_ID}`, { headers });
        let brain = JSON.parse(response.data.files[GIST_FILENAME].content);

        if (brain[lowerText]) {
            await sock.sendMessage(chatId, { text: `🔥 ${brain[lowerText]}\n\n- ᴛᴏᴍ ᴘʀɪᴍᴇ x` }, { quoted: message });
        } else {
            // Simsimi Response (Fallback)
            const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=bn`);
            await sock.sendMessage(chatId, { text: `✨ ${res.data.success || "I don't know that yet!"}\n\n- ᴛᴏᴍ ᴘʀɪᴍᴇ x` }, { quoted: message });
        }
    } catch (e) {
        console.log("Error in system");
    }
}

async function botChat(sock, chatId, message, userMessage, senderId) {
    const args = userMessage.split(' ');
    await simCommand(sock, chatId, message, args, senderId);
}

module.exports = { simCommand, botChat };
