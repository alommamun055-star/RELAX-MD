const {
default: makeWASocket,
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason
} = require("@whiskeysockets/baileys")

const P = require("pino")
const readline = require("readline")

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
})

async function question(text) {
return new Promise((resolve) => {
rl.question(text, resolve)
})
}

async function start() {
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

if (!sock.authState.creds.registered) {
const number = await question("Enter your WhatsApp number: ")
const code = await sock.requestPairingCode(number)
console.log(`\nYour Pairing Code: ${code}\n`)
}

sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
if (connection === "open") {
console.log("✅ WhatsApp Connected")
}

if (connection === "close") {
const shouldReconnect =
lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

if (shouldReconnect) {
start()
}
}
})
}

start()