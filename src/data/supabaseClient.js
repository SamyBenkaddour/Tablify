// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewlysxmifxivlnshagin.supabase.co'; // Ton URL Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bHlzeG1pZnhpdmxuc2hhZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY5ODUsImV4cCI6MjA2MzUxMjk4NX0.PgIG-vr930JUapFZRgZ5R2Q6M6gIlQf13VodUXmKKu0'; // Ta clé publique

export const supabase = createClient(supabaseUrl, supabaseKey);
