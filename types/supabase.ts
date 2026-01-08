export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            appointments: {
                Row: {
                    created_at: string | null
                    id: string
                    notes: string | null
                    patient_id: string | null
                    start_time: string
                    status: string | null
                    type: string
                }
                Insert: {}
                Update: {}
            }
            inventory: {
                Row: {
                    category: string | null
                    created_at: string | null
                    id: string
                    min_quantity: number | null
                    name: string
                    price: number | null
                    quantity: number | null
                    unit: string | null
                }
                Insert: {}
                Update: {}
            }
            owners: {
                Row: {
                    created_at: string | null
                    email: string | null
                    full_name: string
                    id: string
                    phone: string | null
                    user_id: string | null
                }
                Insert: {}
                Update: {}
            }
            patients: {
                Row: {
                    birth_date: string | null
                    breed: string | null
                    created_at: string | null
                    id: string
                    image_url: string | null
                    name: string
                    owner_id: string | null
                    species: string | null
                    status: string | null
                }
                Insert: {}
                Update: {}
            }
            services: {
                Row: {
                    category: string | null
                    created_at: string | null
                    description: string | null
                    duration: string | null
                    icon: string | null
                    id: string
                    is_promo: boolean | null
                    old_price: number | null
                    price: number | null
                    title: string
                }
                Insert: {}
                Update: {}
            }
            transactions: {
                Row: {
                    amount: number
                    category: string | null
                    created_at: string | null
                    date: string | null
                    description: string
                    id: string
                    type: string
                }
                Insert: {}
                Update: {}
            }
        }
    }
}
