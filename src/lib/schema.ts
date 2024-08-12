import { z } from "zod"; 

export const ALLOW_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

export const schemaLogin = z.object({
    email: z.string({required_error: 'Email is Required'}).email({message:'Email is not valid'}),
    password : z.string({required_error:'Password is Required'}).min(5, {message: 'Password min. 5 Character'})
})

export const schemaCategory = z.object({
    name : z.string({required_error: 'Masukan Nama Category Baru'}).min(4, {message: 'Nama minimal 4 Character'})
})

export const schemaLocation = z.object({
    name : z.string({required_error: 'Masukan Nama Location Baru'}).min(4, {message: 'Nama minimal 4 Character'})
})

export const schemaBrand = schemaCategory.extend({
    image: z.any().refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {message: 'Tipe File Tidak Valid'}).refine((file: File) => file?.name, {message: 'Dibutuhkan Gambar'}) 
})

export const schemaProduct = z.object({
    name : z.string({required_error: 'Masukan Nama Product Baru'}).min(4, {message: 'Nama minimal 4 Character'}),
    
    description: z.string({required_error:'Masukan Deskripsi Product'}).min(20, {message: 'Deskripsi harus lebih dari 20 Karakter'}),
    category_id: z.string({required_error:'Masukan Kategori Product'}),
    brand_id: z.string({required_error:'Masukan Brand Product'}),
    stock: z.string({required_error:'Masukan Jumlah Stock'}),
    price: z.string({required_error:'Masukkan Harga Produk'}),
    location_id : z.string({required_error:'Masukkan Lokasi Product'}),
    images: z.any().refine((files: File[]) => files.length === 3, {message: 'Masukkan 3 gambar'}).refine((files:File[]) => {
        let validate = false

        Array.from(files).find((file) => {
            validate = ALLOW_MIME_TYPES.includes(file.type)
        }) 

        return validate

        }, {
            message: 'Tipe File harus Image '
        })

})

export const schemaProductEdit = schemaProduct.extend({
    id: z.number({required_error: 'ID Produk Dibutuhkan'})
}).omit({images:true})


export const schemaUser = schemaCategory.extend({
    email: z.string({required_error:'Masukkan Email User'}),
    password: z.string({required_error:'Masukkan Password'}),
    role: z.string({required_error:'Masukkan Role'}),


    
})

