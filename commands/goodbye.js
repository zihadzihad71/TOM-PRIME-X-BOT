const { isGoodByeOn } = require('../lib/index');

async function goodbyeCommand(sock, chatId, message, match) {
    if (!chatId.endsWith('@g.us')) {
        await sock.sendMessage(chatId, { text: '⚠️ This command can only be used in groups.' });
        return;
    }

    const text = message.message?.conversation || 
                message.message?.extendedTextMessage?.text || '';
    const matchText = text.split(' ').slice(1).join(' ');

    if (matchText === 'on') {
        await sock.sendMessage(chatId, { text: '✅ **𝐓𝐎𝐌 𝐏𝐑𝐈𝐌𝐄 𝐗** Goodbye system activated!' });
    } else if (matchText === 'off') {
        await sock.sendMessage(chatId, { text: '❌ Goodbye system deactivated!' });
    } else {
        await sock.sendMessage(chatId, { text: 'Use: .goodbye on/off' });
    }
}

async function handleLeaveEvent(sock, id, participants) {
    const isGoodbyeEnabled = await isGoodByeOn(id);
    if (!isGoodbyeEnabled) return;

    for (const participant of participants) {
        try {
            const participantString = typeof participant === 'string' ? participant : (participant.id || participant.toString());
            const userJid = participantString.split('@')[0];
            
            // ১৭টি র্যান্ডম মেসেজ (Attitude + Funny)
            const goodbyeMessages = [
                `বিদায় @${userJid} 👋। সিস্টেম থেকে একজন দুর্বল মেম্বার রিমুভ হলো।`,
                `@${userJid} গেট আউট! এই গ্রুপে থাকার যোগ্যতা সবার থাকে না। 💀`,
                `অযথা ভিড় কমিয়ে দেওয়ার জন্য ধন্যবাদ @${userJid}। ভালো থেকো। 🔱`,
                `টা-টা @${userJid}! যাওয়ার সময় গেটটা টেনে দিয়ে যেও, বাতাস আসছে। 💨`,
                `অবশেষে @${userJid} পালিয়েছে! গ্রুপটা এখন একটু শান্ত হবে। 😂`,
                `@${userJid} বিদায় বন্ধু! সাবধানে যেও, রাস্তায় আবার হোঁচট খেও না। 🏃‍♂️`,
                `গেম ওভার @${userJid}! তোমার চ্যাপ্টার এখানেই শেষ। 🚫`,
                `@${userJid} লিভ নিল নাকি কিক খেলো? যাই হোক, আপদ বিদায় হলো! ✌️`,
                `বিদায় @${userJid}। তোমার অভাব আমরা একদমই অনুভব করবো না। 💀🚀`,
                `আহা! @${userJid} বিদায় নিল। আবর্জনা পরিষ্কার হওয়ায় গ্রুপটা ফ্রেশ লাগছে। ✨`,
                `@${userJid} চলে গেল? যাক, গ্রুপের গড় আইকিউ (IQ) এক লাফে বেড়ে গেল! 🧠🔥`,
                `বেশি ডানা গজিয়েছিল @${userJid}-এর, তাই আকাশ থেকে ছিটকে পড়লো। 🕊️❌`,
                `পাগল বিদায় হলো, দুনিয়া শান্ত হলো। @${userJid} টা-টা! 🤡👋`,
                `এই গ্রুপের রাজকীয় ভাইব সহ্য করার ক্ষমতা তোমার ছিল না @${userJid}। 👑`,
                `আরেকটা ফালতু প্লেয়ার এলিমিনেট হলো। সিস্টেম ক্লিনিং কমপ্লিট! @${userJid} ☣️`,
                `@${userJid} বিদায়! যাওয়ার আগে কান্না করার জন্য টিস্যু দিয়ে যাবো? 🧻🤣`,
                `যাও @${userJid}, গিয়ে অন্য কোথাও ডিস্টার্ব করো। এখানে জায়গা নেই। 🚪🚀`
            ];

            const randomMsg = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
            const finalMessage = `${randomMsg}\n\n— **𝐓𝐎𝐌 𝐏𝐑𝐈𝐌𝐄 𝐗**`;

            await sock.sendMessage(id, {
                text: finalMessage,
                mentions: [participantString]
            });
            
        } catch (error) {
            console.error('Goodbye Error:', error);
        }
    }
}

module.exports = { goodbyeCommand, handleLeaveEvent };
