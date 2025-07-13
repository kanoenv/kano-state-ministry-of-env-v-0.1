export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          last_login: string | null
          password_hash: string
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
        }
        Relationships: []
      }
      air_quality: {
        Row: {
          aqi: number
          co: number | null
          created_at: string
          id: string
          location: string
          no2: number | null
          o3: number | null
          pm10: number | null
          pm25: number | null
          so2: number | null
          status: string
          updated_at: string
        }
        Insert: {
          aqi: number
          co?: number | null
          created_at?: string
          id?: string
          location: string
          no2?: number | null
          o3?: number | null
          pm10?: number | null
          pm25?: number | null
          so2?: number | null
          status: string
          updated_at?: string
        }
        Update: {
          aqi?: number
          co?: number | null
          created_at?: string
          id?: string
          location?: string
          no2?: number | null
          o3?: number | null
          pm10?: number | null
          pm25?: number | null
          so2?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          application_deadline: string | null
          category: string
          color: string
          created_at: string
          created_by: string | null
          description: string
          display_order: number
          employment_type: string
          excerpt: string
          icon_name: string
          id: string
          image_url: string
          link_path: string
          location: string | null
          requirements: string | null
          salary_range: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          category: string
          color?: string
          created_at?: string
          created_by?: string | null
          description: string
          display_order?: number
          employment_type?: string
          excerpt: string
          icon_name?: string
          id?: string
          image_url: string
          link_path: string
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          category?: string
          color?: string
          created_at?: string
          created_by?: string | null
          description?: string
          display_order?: number
          employment_type?: string
          excerpt?: string
          icon_name?: string
          id?: string
          image_url?: string
          link_path?: string
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "careers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      content: {
        Row: {
          category: string | null
          content: string
          created_at: string
          created_by: string | null
          featured: boolean | null
          id: string
          published_at: string | null
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          featured?: boolean | null
          id?: string
          published_at?: string | null
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          created_by?: string | null
          featured?: boolean | null
          id?: string
          published_at?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      five_million_trees_applications: {
        Row: {
          address: string
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_position: string
          coordinator_commitment: boolean
          created_at: string
          date_established: string
          id: string
          locations: string
          organization_name: string
          organization_type: string
          other_type: string | null
          planting_sites: number
          previous_experience: string | null
          representative_name: string
          representative_position: string
          seedlings_requested: number
          status: string
          submission_date: string
          survival_rate_commitment: string
          tracking_tool_commitment: boolean
          training_commitment: boolean
          updated_at: string
          volunteers: number
        }
        Insert: {
          address: string
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_position: string
          coordinator_commitment?: boolean
          created_at?: string
          date_established: string
          id?: string
          locations: string
          organization_name: string
          organization_type: string
          other_type?: string | null
          planting_sites: number
          previous_experience?: string | null
          representative_name: string
          representative_position: string
          seedlings_requested: number
          status?: string
          submission_date?: string
          survival_rate_commitment: string
          tracking_tool_commitment?: boolean
          training_commitment?: boolean
          updated_at?: string
          volunteers: number
        }
        Update: {
          address?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_position?: string
          coordinator_commitment?: boolean
          created_at?: string
          date_established?: string
          id?: string
          locations?: string
          organization_name?: string
          organization_type?: string
          other_type?: string | null
          planting_sites?: number
          previous_experience?: string | null
          representative_name?: string
          representative_position?: string
          seedlings_requested?: number
          status?: string
          submission_date?: string
          survival_rate_commitment?: string
          tracking_tool_commitment?: boolean
          training_commitment?: boolean
          updated_at?: string
          volunteers?: number
        }
        Relationships: []
      }
      home_banners: {
        Row: {
          background_image_url: string
          created_at: string
          created_by: string | null
          cta_link: string
          cta_text: string
          display_order: number
          id: string
          is_active: boolean
          secondary_cta_link: string
          secondary_cta_text: string
          stats: Json
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          background_image_url: string
          created_at?: string
          created_by?: string | null
          cta_link: string
          cta_text: string
          display_order?: number
          id?: string
          is_active?: boolean
          secondary_cta_link: string
          secondary_cta_text: string
          stats?: Json
          subtitle: string
          title: string
          updated_at?: string
        }
        Update: {
          background_image_url?: string
          created_at?: string
          created_by?: string | null
          cta_link?: string
          cta_text?: string
          display_order?: number
          id?: string
          is_active?: boolean
          secondary_cta_link?: string
          secondary_cta_text?: string
          stats?: Json
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "home_banners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          activation_code: string
          created_at: string
          created_by: string | null
          email: string
          id: string
          is_active: boolean
          name: string
          region: string
          seeds_assigned: number
          seeds_planted: number
          updated_at: string
        }
        Insert: {
          activation_code: string
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean
          name: string
          region: string
          seeds_assigned?: number
          seeds_planted?: number
          updated_at?: string
        }
        Update: {
          activation_code?: string
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          region?: string
          seeds_assigned?: number
          seeds_planted?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_analytics: {
        Row: {
          action_type: string
          created_at: string
          document_id: string
          id: string
          session_id: string | null
          user_agent: string | null
          user_ip: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          document_id: string
          id?: string
          session_id?: string | null
          user_agent?: string | null
          user_ip?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          document_id?: string
          id?: string
          session_id?: string | null
          user_agent?: string | null
          user_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdf_analytics_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "pdf_document_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pdf_analytics_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "pdf_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_documents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
          upload_date: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
          upload_date?: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
          upload_date?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdf_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          category: string
          color: string
          created_at: string
          created_by: string | null
          description: string
          display_order: number
          excerpt: string
          icon_name: string
          id: string
          image_url: string
          link_path: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          color?: string
          created_at?: string
          created_by?: string | null
          description: string
          display_order?: number
          excerpt: string
          icon_name: string
          id?: string
          image_url: string
          link_path: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string
          created_at?: string
          created_by?: string | null
          description?: string
          display_order?: number
          excerpt?: string
          icon_name?: string
          id?: string
          image_url?: string
          link_path?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      recruitment_applications: {
        Row: {
          birth_certificate_url: string | null
          can_complete_trek: boolean
          contact_address: string
          created_at: string
          date_of_birth: string
          education_certificate_url: string | null
          email: string
          examination_number: string | null
          full_name: string
          gender: string
          graduation_year: string
          has_prior_training: boolean
          highest_qualification: string
          id: string
          lga_letter_url: string | null
          lga_of_origin: string
          nationality: string
          phone_number: string
          photo_url: string | null
          prior_training_details: string | null
          reference_number: string
          state_of_origin: string
          status: string
          updated_at: string
        }
        Insert: {
          birth_certificate_url?: string | null
          can_complete_trek: boolean
          contact_address: string
          created_at?: string
          date_of_birth: string
          education_certificate_url?: string | null
          email: string
          examination_number?: string | null
          full_name: string
          gender: string
          graduation_year: string
          has_prior_training: boolean
          highest_qualification: string
          id?: string
          lga_letter_url?: string | null
          lga_of_origin: string
          nationality: string
          phone_number: string
          photo_url?: string | null
          prior_training_details?: string | null
          reference_number: string
          state_of_origin: string
          status?: string
          updated_at?: string
        }
        Update: {
          birth_certificate_url?: string | null
          can_complete_trek?: boolean
          contact_address?: string
          created_at?: string
          date_of_birth?: string
          education_certificate_url?: string | null
          email?: string
          examination_number?: string | null
          full_name?: string
          gender?: string
          graduation_year?: string
          has_prior_training?: boolean
          highest_qualification?: string
          id?: string
          lga_letter_url?: string | null
          lga_of_origin?: string
          nationality?: string
          phone_number?: string
          photo_url?: string | null
          prior_training_details?: string | null
          reference_number?: string
          state_of_origin?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          photos: Json | null
          reporter_email: string | null
          reporter_name: string
          reporter_phone: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          photos?: Json | null
          reporter_email?: string | null
          reporter_name: string
          reporter_phone?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          photos?: Json | null
          reporter_email?: string | null
          reporter_name?: string
          reporter_phone?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      tree_planters: {
        Row: {
          activation_code: string
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string
          organization_id: string | null
          trees_planted: number
          updated_at: string
        }
        Insert: {
          activation_code: string
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name: string
          organization_id?: string | null
          trees_planted?: number
          updated_at?: string
        }
        Update: {
          activation_code?: string
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string | null
          trees_planted?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tree_planters_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tree_records: {
        Row: {
          created_at: string
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          notes: string | null
          organization_id: string | null
          photos: Json | null
          planter_id: string | null
          planting_date: string
          quantity: number
          species: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          notes?: string | null
          organization_id?: string | null
          photos?: Json | null
          planter_id?: string | null
          planting_date?: string
          quantity: number
          species: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          notes?: string | null
          organization_id?: string | null
          photos?: Json | null
          planter_id?: string | null
          planting_date?: string
          quantity?: number
          species?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tree_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tree_records_planter_id_fkey"
            columns: ["planter_id"]
            isOneToOne: false
            referencedRelation: "tree_planters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      pdf_document_stats: {
        Row: {
          category: string | null
          download_count: number | null
          file_name: string | null
          id: string | null
          title: string | null
          total_interactions: number | null
          upload_date: string | null
          view_count: number | null
        }
        Relationships: []
      }
      recruitment_applications_summary: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          highest_qualification: string | null
          id: string | null
          lga_of_origin: string | null
          phone_number: string | null
          reference_number: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          highest_qualification?: string | null
          id?: string | null
          lga_of_origin?: string | null
          phone_number?: string | null
          reference_number?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          highest_qualification?: string | null
          id?: string | null
          lga_of_origin?: string | null
          phone_number?: string | null
          reference_number?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_admin_user: {
        Args: {
          admin_email: string
          admin_password: string
          admin_name: string
          admin_role_param?: Database["public"]["Enums"]["admin_role"]
        }
        Returns: string
      }
      generate_activation_code: {
        Args: { prefix?: string }
        Returns: string
      }
      verify_admin_login: {
        Args: { admin_email: string; admin_password: string }
        Returns: {
          id: string
          email: string
          full_name: string
          role: Database["public"]["Enums"]["admin_role"]
          is_active: boolean
        }[]
      }
    }
    Enums: {
      admin_role: "super_admin" | "content_admin" | "reports_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["super_admin", "content_admin", "reports_admin"],
    },
  },
} as const
