import OpenAI from "openai";
const openai = new OpenAI({ apiKey: "", dangerouslyAllowBrowser: true });

const openapiCall = async (excelValue) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system", content:
                    `
                    > "You are an Excel assistant. You will receive a list of numbers and a specific instruction, such as 'sum' or 'mean.' Provide **only** the result in a simple format, like 'sum: 313' or 'mean: 323' without any additional explanation or text.
                    > 
                    > Example: 
                    > - Input: '4567', '4567', '3231', '13456', '9787', sum 
                    > - Expected Response: **sum: 36508**
                    `
            },
            {
                role: "user",
                content: `${excelValue}`,
            },
        ],
    })
    return response.choices[0].message.content
};

export default openapiCall