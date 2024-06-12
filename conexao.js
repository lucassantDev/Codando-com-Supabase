import { createClient } from "@supabase/supabase-js";

const link = "https://jqcajcwdsopkybctpvzc.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxY2FqY3dkc29wa3liY3RwdnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNDM4ODIsImV4cCI6MjAzMzcxOTg4Mn0.uVk295UnXvpw1Fu6q6RQQmMUzfnLe5_06hmfZaoDHJE"

export const supabase = createClient(link, chave);