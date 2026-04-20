const axios = require('axios');

async function simCommand(sock, chatId, message, args, senderId) {
    try {
        const usermsg = args.join(" ").trim();

        // যদি কোনো মেসেজ না থাকে (Greeting)
        if (!usermsg) {
            const greetings = [
                // 🔥 Hot (6)
                "হুম জান তোমার অইখানে উম্মমাহ😷😘",
                "ডাকলা কেন সুন্দরী? Tom হাজির! 💓💨",
                "আসো বুকে আসো, এতো ডাকো কেন! 🥱",
                "উফফ! তোমার ডাকে তো কলিজা কেঁপে ওঠে সোনা। 💋",
                "এত মায়া দিয়ে ডাকলে তো টম সামলাতে পারবে না। 😉",
                "জ্বি কলিজা, বলো কী সেবা করতে পারি? 😏",
                
                // 😎 Attitude (6)
                "নামটা মনে রাখিস, Tom Prime X। 😎🔥",
                "অ্যাটিটিউড দেখানো আমার স্বভাব না, ওটা আমার রক্তে। 🏍️💨",
                "রাজা সব সময় রাজাই থাকে, সেটা রিয়েল লাইফ হোক বা হোয়াটসঅ্যাপ। 👑",
                "Tom এর সাথে কথা বলতে হলে যোগ্যতা লাগে। 🤨",
                "বেশি পটর পটর করিস না, টম কিন্তু একবার চটলে রক্ষে নাই। 💀",
                "আমি নিজের নিয়মে চলি, কারো কথায় না। 🚶‍♂️🔥",

                // 😂 Funny (5)
                "বার বার আমাকে ডাকস কেন? গফ দিতে পারবি? 😡",
                "বলো সুন্দরী, কার গুষ্টি উদ্ধার করতে হবে? 🤣",
                "টম এখন বিজি, পরে লাইন দিও। 📞❌",
                "খালি ডাকলেই হবে? এক কাপ চা খাওয়াবা না? ☕",
                "ডাকার আগে পারমিশন নিয়েছিলে? 😜"
            ];
            
            const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            
            return await sock.sendMessage(chatId, { 
                text: `@${senderId.split('@')[0]}, ${randomGreeting}`,
                mentions: [senderId]
            }, { quoted: message });
        }

        // চ্যাট এপিআই কল
        const resApi = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json");
        const baseApi = resApi.data.api;

        const response = await axios.get(
            `${baseApi}/sim?type=ask&ask=${encodeURIComponent(usermsg)}&number=${senderId.split('@')[0]}`
        );

        const replyText = response.data.data?.msg || "🤖 আমি এখনো এটা শিখিনি।";
        const finalReply = `🔥 ${replyText}\n\n- 𝕿𝖔𝖒 𝕻𝖗𝖎𝖒𝖊 𝖃`;

        // মেসেজ সেন্ড করা (Forwarded ট্যাগ ছাড়া)
        await sock.sendMessage(chatId, {
            text: finalReply,
            contextInfo: {
                isForwarded: false 
            }
        }, { quoted: message });

    } catch (error) {
        console.error('Error in sim command:', error);
        await sock.sendMessage(chatId, { 
            text: 'ধুরবাল! সার্ভার জ্যাম। টম এখন অফলাইনে!',
            contextInfo: {
                isForwarded: false
            }
        }, { quoted: message });
    }
}

module.exports = { simCommand };
