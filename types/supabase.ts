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
                Insert: {
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    patient_id?: string | null
                    start_time: string
                    status?: string | null
                    type: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    patient_id?: string | null
                    start_time?: string
                    status?: string | null
                    type?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "appointments_patient_id_fkey"
                        columns: ["patient_id"]
                        isOneToOne: false
                        referencedRelation: "patients"
                        referencedColumns: ["id"]
                    },
                ]
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
                Insert: {
                    category?: string | null
                    created_at?: string | null
                    id?: string
                    min_quantity?: number | null
                    name: string
                    price?: number | null
                    quantity?: number | null
                    unit?: string | null
                }
                Update: {
                    category?: string | null
                    created_at?: string | null
                    id?: string
                    min_quantity?: number | null
                    name?: string
                    price?: number | null
                    quantity?: number | null
                    unit?: string | null
                }
                Relationships: []
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
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    full_name: string
                    id?: string
                    phone?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    full_name?: string
                    id?: string
                    phone?: string | null
                    user_id?: string | null
                }
                Relationships: []
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
                Insert: {
                    birth_date?: string | null
                    breed?: string | null
                    created_at?: string | null
                    id?: string
                    image_url?: string | null
                    name: string
                    owner_id?: string | null
                    species?: string | null
                    status?: string | null
                }
                Update: {
                    birth_date?: string | null
                    breed?: string | null
                    created_at?: string | null
                    id?: string
                    image_url?: string | null
                    name?: string
                    owner_id?: string | null
                    species?: string | null
                    status?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "patients_owner_id_fkey"
                        columns: ["owner_id"]
                        isOneToOne: false
                        referencedRelation: "owners"
                        referencedColumns: ["id"]
                    },
                ]
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
                Insert: {
                    amount: number
                    category?: string | null
                    created_at?: string | null
                    date?: string | null
                    description: string
                    id?: string
                    type: string
                }
                Update: {
                    amount?: number
                    category?: string | null
                    created_at?: string | null
                    date?: string | null
                    description?: string
                    id?: string
                    type?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
