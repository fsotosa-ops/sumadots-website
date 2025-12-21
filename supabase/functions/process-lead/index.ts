// supabase/functions/process-lead/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, form_data, origin_url, metadata } = await req.json()

    // 1. Guardar en tabla leads de Supabase (Respaldo técnico)
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ email, form_data, origin_url, metadata }])

    if (dbError) throw dbError

    // 2. Enviar a HubSpot
    const hubspotToken = Deno.env.get('HUBSPOT_ACCESS_TOKEN')
    
    const hubspotPayload = {
      properties: {
        "email": email,
        "firstname": form_data.name || 'Lead Web',
        "phone": form_data.phone || '',
        "message": form_data.message || '', // Propiedad que mencionas que se mapea sola
        "url_de_registro": origin_url || '', // La nueva propiedad que creaste
        "hs_content_membership_notes": `Navegador: ${metadata.userAgent} | Pantalla: ${metadata.screenResolution}`
      }
    }

    const hsResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hubspotToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotPayload),
    })

    if (!hsResponse.ok) {
      const hsError = await hsResponse.json()
      console.error("Error HubSpot:", hsError)
    }

    return new Response(JSON.stringify({ success: true }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }, 
      status: 200 
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }, 
      status: 400 
    })
  }
})