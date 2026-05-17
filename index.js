import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys"

import P from "pino"
import http from "http"

async function startBot() {

  // fake web server for render
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
