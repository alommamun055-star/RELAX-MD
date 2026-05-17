sock.ev.on("messages.upsert", async ({ messages }) => {

const m = messages[0]

if (!m.message) return

const text =
m.message.conversation ||
m.message.extendedTextMessage?.text ||
""

console.log("MESSAGE:", text)

if (text === ".menu") {

const from = m.key.remoteJid

await sock.sendMessage(from, {
text: "✅ MENU WORKING 💗"
})

}

})
