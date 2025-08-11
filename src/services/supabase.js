import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://zsvvcjjpvnsydfuycomr.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdnZjampwdm5zeWRmdXljb21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTIyNDUsImV4cCI6MjA3MDQ4ODI0NX0.w_WIoETSh8QTKPsI-E8s08p_wLcE6DpHZUK8pipEyZY"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;