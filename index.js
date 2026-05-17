import makeWASocket, {
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason
} from "@whiskeysockets/baileys"

import P from "pino"
import http from "http"

async function startBot() {

const server = http.createServer((req, res) => {
res.writeHead(200)
res.end("RELAX-MD Running")
})

server.listen(process.env.PORT || 3000)

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const { version } =
await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: P({ level: "silent" }),
auth: state,
browser: ["RELAX-MD", "Chrome", "1.0.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {

const m = messages[0]

if (!m.message) return

const text =
  m.message.conversation ||
  m.message.extendedTextMessage?.text ||
  ""

if (text === ".menu") {

  await sock.sendMessage(m.key.remoteJid, {
    text: "✅ MENU WORKING 💗"
  })

}

})

sock.ev.on("connection.update", async ({
connection,
lastDisconnect
}) => {

if (connection === "open") {
  console.log("✅ RELAX-MD Connected")
}

if (connection === "close") {

  const shouldReconnect =
    lastDisconnect?.error?.output?.statusCode
    !== DisconnectReason.loggedOut

  if (shouldReconnect) {
    startBot()
  }
}

})
}

startBot()
