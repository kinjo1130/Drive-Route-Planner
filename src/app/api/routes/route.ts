// src/app/api/routes/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_PROMPT, generateUserPrompt } from '@/lib/openai/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { drivingTime, startLocation } = body;

    // バリデーション
    if (!drivingTime || drivingTime < 1 || drivingTime > 8) {
      return NextResponse.json(
        { error: '運転時間は1〜8時間の間で指定してください' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: generateUserPrompt(drivingTime, startLocation)
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7, // クリエイティブさと一貫性のバランスを取る
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }
    const routeData = JSON.parse(content);

    // レスポンスの検証
    if (!routeData.title || !routeData.spots || routeData.spots.length === 0) {
      throw new Error('Invalid route data generated');
    }
    console.log({
      ...routeData,
      _metadata: {
        generatedAt: new Date().toISOString(),
        startLocation,
        requestedDuration: drivingTime
      }
    })

    return NextResponse.json({
      ...routeData,
      _metadata: {
        generatedAt: new Date().toISOString(),
        startLocation,
        requestedDuration: drivingTime
      }
    });

  } catch (error) {
    console.error('Error generating route:', error);
    
    return NextResponse.json(
      { 
        error: 'ルートの生成に失敗しました',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// レート制限のためのミドルウェア
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16kb',
    },
    externalResolver: true,
  },
};