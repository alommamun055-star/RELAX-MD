export default {

async execute(sock, msg) {

const from = msg.key.remoteJid

await sock.sendMessage(from, {
text: "✅ RELAX-MD MENU WORKING 💗"
})

}

}
