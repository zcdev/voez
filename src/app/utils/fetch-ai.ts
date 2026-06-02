export default async function fetchAI(message: string) {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: message }],
            }),
        });

        console.log("response", response);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('AI error:', error);
    }
}
