const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
return text === fault ? true : false;
}

module.exports = {

SESSION_ID: process.env.SESSION_ID || "",

PREFIX: getConfig("PREFIX") || ".",

CHATBOT: getConfig("CHATBOT") || "on",

BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "RELAX-MD",

MODE: getConfig("MODE") || process.env.MODE || "public",

REPO: process.env.REPO || "https://github.com/alommamun055-star/RELAX-MD",

BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",

OWNER_NUMBER: process.env.OWNER_NUMBER || "918116539293",

OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "⤹𝐗 𝐑𝐎𝐌𝐄𝐎𓂃༊",

DEV: process.env.DEV || "918116539293",

DEVELOPER_NUMBER: '918116539293@s.whatsapp.net',

AUTO_REPLY: process.env.AUTO_REPLY || "false",

AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",

AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*RELAX-MD VIEWED YOUR STATUS 🤖*",

READ_MESSAGE: process.env.READ_MESSAGE || "false",

REJECT_MSG: process.env.REJECT_MSG || "*📞 CALL NOT ALLOWED*",

ANTI_CALL: process.env.ANTI_CALL || "true",

AUTO_DOWNLOADER: process.env.AUTO_DOWNLOADER || "true",

AUTO_REACT: process.env.AUTO_REACT || "false",

OWNER_REACT: process.env.OWNER_REACT || "false",

CUSTOM_REACT: process.env.CUSTOM_REACT || "false",

CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️,💙,💚",

STICKER_NAME: process.env.STICKER_NAME || "⤹𝐗 𝐑𝐎𝐌𝐄𝐎𓂃༊",

AUTO_STICKER: process.env.AUTO_STICKER || "false",

AUTO_RECORDING: process.env.AUTO_RECORDING || "false",

AUTO_TYPING: process.env.AUTO_TYPING || "false",

MENTION_REPLY: process.env.MENTION_REPLY || "false",

MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://i.ibb.co/Sw4pzTWC/IMG-20260124-WA0728.jpg",

ANTI_DELETE: process.env.ANTI_DELETE || "true",

ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",

ANTI_LINK: process.env.ANTI_LINK || "true",

ANTI_VV: process.env.ANTI_VV || "true",

DELETE_LINKS: process.env.DELETE_LINKS || "false",

ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same",

ANTI_BOT: process.env.ANTI_BOT || "true",

PM_BLOCKER: process.env.PM_BLOCKER || "true",

DESCRIPTION: process.env.DESCRIPTION || "*© OWNER ⤹𝐗 𝐑𝐎𝐌𝐄𝐎𓂃༊*",

PUBLIC_MODE: process.env.PUBLIC_MODE || "true",

ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",

AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",

AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",

AUTO_BIO: process.env.AUTO_BIO || "false",

WELCOME: process.env.WELCOME || "true",

GOODBYE: process.env.GOODBYE || "true",

ADMIN_ACTION: process.env.ADMIN_ACTION || "true",

};