const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/TOM-PRIME-X/TOM-PRIME-X-BOT');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = `*乂  TOM PRIME X BOT  乂*\n\n`;
    txt += `✩  *Name* : ${json.name}\n`;
    txt += `✩  *Watchers* : ${json.watchers_count}\n`;
    txt += `✩  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `✩  *Last Updated* : ${moment(json.updated_at).tz('Asia/Dhaka').format('DD/MM/YY - HH:mm:ss')}\n`;
    txt += `✩  *URL* : ${json.html_url}\n`;
    txt += `✩  *Forks* : ${json.forks_count}\n`;
    txt += `✩  *Stars* : ${json.stargazers_count}\n\n`;
    txt += `📺 *YouTube:* https://youtube.com/@saycotom\n\n`;
    txt += `💥 *Powered by TOM PRIME X*`;

    const imgPath = path.join(__dirname, '../assets/bot_image.jpg');
    
    const contextInfo = {
        forwardingScore: 1,
        isForwarded: true,
        externalAdReply: {
            title: 'TOM-PRIME-X REPOSITORY',
            body: 'Tap to visit my GitHub',
            sourceUrl: json.html_url,
            mediaType: 1,
            renderLargerThumbnail: true
        }
    };

    if (fs.existsSync(imgPath)) {
        const imgBuffer = fs.readFileSync(imgPath);
        await sock.sendMessage(chatId, { image: imgBuffer, caption: txt, contextInfo }, { quoted: message });
    } else {
        await sock.sendMessage(chatId, { text: txt, contextInfo }, { quoted: message });
    }
  } catch (error) {
    console.error(error);
    await sock.sendMessage(chatId, { text: '❌ Error fetching repository information.' }, { quoted: message });
  }
}

module.exports = githubCommand;
