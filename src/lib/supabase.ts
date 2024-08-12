
import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ??  ""

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, supabaseKey)

export const getImageUrl = (name: string | undefined, path: 'brands' | 'product' | 'index') => {

    const { data } = supabase
  .storage
  .from('commerce')
  .getPublicUrl(`public/${path}/${name}`)

  return data.publicUrl
}

export const uploadFile = async (file: File, path: 'brands' | 'product' = 'brands') => {

  const fileType = file.type.split('/')[1]
  const fileName = `${path}-${Date.now()}.${fileType}`

  await supabase
  .storage
  .from('commerce')
  .upload(`public/${path}/${fileName}`, file, {
    cacheControl: '3600',
    upsert: false
  })

  return fileName;
}