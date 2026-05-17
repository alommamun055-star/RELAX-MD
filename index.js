import makeWASocket, {
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason
} from "@whiskeysockets/baileys"

import P from "pino"

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const { version } =
await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: P({ level: "silent" }),
printQRInTerminal: false,
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

console.log(`
━━━━━━━━━━━━━━━━━━━
SCAN THIS QR
━━━━━━━━━━━━━━━━━━━

${qr}

━━━━━━━━━━━━━━━━━━━
`)
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
