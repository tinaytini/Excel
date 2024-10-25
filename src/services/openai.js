import OpenAI from "openai";
const openai = new OpenAI();

export const prompt = async (text) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: `
                You will be given spreadsheet cell text, you need to return something in this format.
                Examples:
                    1:
                        Input: sadasd
                        Answer: asdsafs
                    2:
                        Input: sadasd
                        Answer: asdsafs
                    3:
                        Input: sadasd
                        Answer: asdsafs
                    `
                },
            {
                role: "user",
                content: text,
            },
        ],
    });
}

console.log(completion.choices[0].message);