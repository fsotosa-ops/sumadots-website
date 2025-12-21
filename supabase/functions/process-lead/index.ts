import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejo de CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, form_data, origin_url, metadata } = await req.json()

    // 1. Guardar en la tabla leads
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{ email, form_data, origin_url, metadata }])

    if (dbError) throw dbError

    // 2. Aquí conectarías con HubSpot (Opcional por ahora)
    // const response = await fetch('https://api.hubapi.com/...', { ... })

    return new Response(
      JSON.stringify({ message: "Lead procesado con éxito" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    )
  }
})