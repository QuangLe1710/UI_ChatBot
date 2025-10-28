import type { Message } from "../libs/message";

// A helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock Data ---

// Data for getMessages (initial chat history)
const initialMockMessages: Message[] = [
    { role: "user", content: "Hi, can you help me?" },
    {
        role: "assistant",
        content:
            "Hello! I am a mock API. I can generate random Markdown responses.",
    },
];

// List of random Markdown answers
const randomMockAnswers: string[] = [
    // 1. Headings and Bold
    `
# Heading 1 (H1)
Here is some normal text.

## Heading 2 (H2)
Here is some **bold text** and *italic text*.

### Heading 3 (H3)
You can combine them: ***bold and italic***.
  `,

    // 2. Lists (Bulleted and Numbered)
    `
Here are two types of lists:

**Bulleted List:**
* Item 1 (Milk)
* Item 2 (Eggs)
    * Sub-item 2.1 (Maybe chicken eggs?)
* Item 3 (Bread)

**Numbered List:**
1.  First step: Wake up.
2.  Second step: Make coffee.
3.  Third step: Start coding.
  `,

    // 3. Code Blocks (TypeScript)
    `
Here is a TypeScript code block:

\`\`\`typescript
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User {
  return { id, name: 'Mock User' };
}
\`\`\`
  `,

    // 4. Quote and Strikethrough
    `
Here is a quote:
> "The only way to do great work is to love what you do."
> \- Steve Jobs

You can also use ~~strikethrough~~ to show deleted text.
  `,

    // 5. Code Block (Python) and Inline Code
    `
Here is a Python code block:

\`\`\`python
def greet(name):
    print(f"Hello, {name}! Welcome to the mock API.")

greet("Developer")
\`\`\`

You can also have \`inline_code()\` snippets within your text.
  `,

    // 6. Task List (Checklist)
    `
Here is a task list:

- [x] Complete Markdown mock data
- [x] Test \`react-markdown\` component
- [ ] Add \`SyntaxHighlighter\`
- [ ] Implement the \`prose\` class
  `,
];

// --- Mock API ---

export const mockChatApi = {
    /**
     * Simulates fetching message history
     */
    getMessages: async (): Promise<Message[]> => {
        // Simulate network latency (500ms)
        await delay(500);

        // Return the initial message list
        return Promise.resolve(initialMockMessages);
    },

    /**
     * Simulates calling the chat API and getting a response
     */
    chat: async (message: string): Promise<Message> => {
        // Simulate AI "thinking" time (1.5 seconds)
        await delay(1500);

        // Get a random answer from the list
        const randomIndex = Math.floor(
            Math.random() * randomMockAnswers.length
        );
        let randomContent = randomMockAnswers[randomIndex];

        // Add the user's question to one of the answers (for variety)
        if (randomIndex === 1) {
            // Example: add to the second answer
            randomContent = `You asked about: *${message}*.\n\n${randomContent}`;
        }

        // Return the new assistant message
        return Promise.resolve({
            role: "assistant",
            content: randomContent,
        });
    },
};
