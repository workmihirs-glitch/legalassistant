import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { caseText, imageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Prepare content for AI based on input type
    let userContent;
    if (imageBase64) {
      userContent = [
        {
          type: "text",
          text: "Extract and analyze this legal case document according to Indian law."
        },
        {
          type: "image_url",
          image_url: {
            url: imageBase64
          }
        }
      ];
    } else {
      userContent = `Analyze this legal case document according to Indian law:\n\n${caseText}`;
    }

    // Get prosecution analysis
    const prosecutionResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a prosecution attorney specialized in Indian law. You ONLY respond to legal questions and case analysis related to Indian legal system. If asked anything non-legal, politely decline. Analyze cases from the prosecution perspective, identifying evidence and arguments that support conviction under Indian Penal Code and other relevant Indian laws.'
          },
          {
            role: 'user',
            content: userContent
          }
        ],
      }),
    });

    const prosecutionData = await prosecutionResponse.json();
    const prosecutionAnalysis = prosecutionData.choices[0].message.content;

    // Get defense analysis
    const defenseResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a defense attorney specialized in Indian law. You ONLY respond to legal questions and case analysis related to Indian legal system. If asked anything non-legal, politely decline. Analyze cases from the defense perspective, identifying weaknesses in prosecution arguments and defending the accused under Indian Penal Code and other relevant Indian laws.'
          },
          {
            role: 'user',
            content: userContent
          }
        ],
      }),
    });

    const defenseData = await defenseResponse.json();
    const defenseAnalysis = defenseData.choices[0].message.content;

    // Get final verdict with probability
    const verdictResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an impartial judge specialized in Indian law. Based on the prosecution and defense arguments, provide a verdict with probability of winning for each side. Format your response as: VERDICT: [Prosecution/Defense likely to win]\nPROSECUTION WIN PROBABILITY: [X]%\nDEFENSE WIN PROBABILITY: [Y]%\nREASONING: [brief explanation based on Indian law]'
          },
          {
            role: 'user',
            content: `Case Analysis:\n\nPROSECUTION:\n${prosecutionAnalysis}\n\nDEFENSE:\n${defenseAnalysis}\n\nProvide final verdict with probabilities.`
          }
        ],
      }),
    });

    const verdictData = await verdictResponse.json();
    const verdict = verdictData.choices[0].message.content;

    return new Response(
      JSON.stringify({
        prosecution: prosecutionAnalysis,
        defense: defenseAnalysis,
        verdict: verdict
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in legal-analysis:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});