const API_KEY = "Add gemini api  key ";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const input = document.getElementById("inputText");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");

async function generateIdeas() {
    const topic = input.value.trim();

    if (!topic) {
        output.textContent = "Please enter a topic.";
        return;
    }

    generateBtn.disabled = true;
    output.textContent = "Generating creative ideas...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                       text: `Generate 10 unique, creative, and practical ideas related to "${topic}".

For each idea:
- Give a short, clear title.
- Add a 2-3 sentence explanation.
- Number the ideas from 1 to 10.

Use plain text only. Do not use Markdown symbols such as **, ##, *, or backticks.
Avoid unnecessary blank lines, extra spaces, introductions, and conclusions.
Do not provide a general explanation of the topic.`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Gemini API request failed.");
        }

        const ideas = data.candidates?.[0]?.content?.parts
            ?.map(part => part.text || "")
            .join("")
            .trim();

        output.textContent = ideas || "No ideas generated.";
    } catch (error) {
        output.textContent = error.message || "Something went wrong.";
        console.error(error);
    } finally {
        generateBtn.disabled = false;
    }
}

generateBtn.addEventListener("click", generateIdeas);