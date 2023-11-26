import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eifgreidouvadmhsaxcc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZmdyZWlkb3V2YWRtaHNheGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MTcwODgsImV4cCI6MjAxNjI5MzA4OH0.w0_U6AUGGPDWmm6pyfiPQ_dTMDUjXrOh5vjyOD4hrdw";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;