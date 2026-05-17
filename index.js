import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys"

import P from "pino"
import qrcode from "qrcode-terminal"

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const { version } =
await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: P({ level: "silent" }),
printQRInTerminal: true,
auth: state,
browser: ["RELAX-MD", "Chrome", "1.0.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", async ({
connection,
lastDisconnect,
qr
}) => {

if (qr) {
qrcode.generate(qr, { small: true })
console.log("Scan QR")
}

if (connection === "open") {
console.log("✅ RELAX-MD Connected")
console.log("👑 Owner: ⤹𝐗 𝐑𝐎𝐌𝐄𝐎𓂃༊")
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
