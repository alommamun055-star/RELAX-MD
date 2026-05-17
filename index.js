import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys"

import P from "pino"
import http from "http"
import fs from "fs"

async function startBot() {

  // fake web server for render
  const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end("RELAX-MD Running")
  })

  server.listen(process.env.PORT || 3000)

  // load commands
  fs.readdirSync("./commands").forEach(async (file) => {
    await import(`./commands/${file}`)
  })

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

    const msg = messages[0]

    if (!msg.message) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    // MENU COMMAND
    if (text === ".menu") {

      const command =
        await import("./commands/menu.js")

      command.default.execute(sock, msg)

    }

  })

  sock.ev.on("connection.update", async ({
    connection,
    lastDisconnect
  }) => {

    if (connection === "open") {

      console.log("✅ RELAX-MD Connected")
      console.log("👑 Owner Connected")

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
