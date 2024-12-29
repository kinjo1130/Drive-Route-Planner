// src/lib/openai/client.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRoute(drivingTime: number, startLocation?: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "あなたは運転ルートを提案するエキスパートです。時間に応じて最適なドライブコースを提案してください。"
      },
      {
        role: "user",
        content: `${drivingTime}時間のドライブルート${startLocation ? `（出発地: ${startLocation}）` : ''}を提案してください。観光スポット、休憩ポイント、見どころを含めてください。`
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (content === null) {
    throw new Error("Response content is null");
  }
  return JSON.parse(content);
}