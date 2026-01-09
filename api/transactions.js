// api/transactions.js

export default async function handler(req, res) {
    // 1. Your Google Script URL
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    //"https://script.google.com/macros/s/AKfycbyIakCEBoezqnxfpj2PYO6R5ImkmN2RF3DpLwc1nYf0Mc6cLRA7NaQocB4eXxn2hJDn/exec";

    try {
        if (req.method === "GET") {
            // Fetch data from Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const data = await response.json();
            return res.status(200).json(data);
        } else if (req.method === "POST") {
            // Forward the form data to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });

            const result = await response.json();
            return res.status(200).json(result);
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
