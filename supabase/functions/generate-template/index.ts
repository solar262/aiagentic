
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateTemplateRequest {
  type: string;
  targetIndustry: string;
  targetTitle: string;
  personalValue?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, targetIndustry, targetTitle, personalValue }: GenerateTemplateRequest = await req.json();

    console.log('Generating template for:', { type, targetIndustry, targetTitle });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are an expert LinkedIn outreach specialist. Create personalized, professional message templates that:
1. Feel human and authentic, not salesy
2. Reference specific industry challenges
3. Include clear value propositions
4. Use appropriate LinkedIn variables like {{firstName}}, {{company}}, {{title}}
5. Are concise but compelling (2-3 paragraphs max)
6. Have high response rates

IMPORTANT: Always return a valid JSON object with exactly these fields:
- templateName: A descriptive name for the template
- subject: An engaging subject line (if applicable)
- content: The message template with LinkedIn variables

Template type: ${type}
Target industry: ${targetIndustry}
Target job title: ${targetTitle}
Your value proposition: ${personalValue || "helping organizations build people-first cultures through employee retention strategies"}

Make the message feel personal and relevant to their specific role and industry challenges.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Generate a ${type.replace('_', ' ')} template for ${targetTitle} professionals in the ${targetIndustry} industry. Return only valid JSON with templateName, subject, and content fields.` 
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Generated text:', generatedText);

    try {
      // Try to parse as JSON first
      const templateData = JSON.parse(generatedText);
      
      // Validate required fields
      if (!templateData.templateName || !templateData.content) {
        throw new Error('Missing required fields in generated template');
      }

      console.log('Successfully parsed template:', templateData);
      
      return new Response(JSON.stringify(templateData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.log('JSON parsing failed, creating fallback template');
      
      // If JSON parsing fails, create a structured response
      const fallbackTemplate = {
        templateName: `${targetTitle} ${type.replace('_', ' ')} - ${targetIndustry}`,
        subject: type === 'connection_request' ? 
          `Building people-first cultures in ${targetIndustry}` : 
          `Following up on our conversation`,
        content: generatedText.replace(/```json|```/g, '').trim()
      };
      
      console.log('Created fallback template:', fallbackTemplate);
      
      return new Response(JSON.stringify(fallbackTemplate), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in generate-template function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate template',
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
