import type React from "react"

export interface User {
  id: string
  email: string
  gender: string
  phone: string
  address: string
  status: string
  fullname: string
  created_at: string
  updated_at: string
  avatar: string | null
  health_card_id: string
  national_identification_card: string
}

export interface MenuItem {
  title: string
  path: string
  icon: React.ElementType
  tooltip?: string
}

export interface UserInfo {
  name: string
  email: string
  avatar?: string
}

export interface HealthCard {
  id: string
  name: string
  number: string
  balance_amount: number
  initial_amount: number
  reduction_amounts: number[]
  status: string
  is_available: boolean,
  expire: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: Omit<User, "password">
  token: string
}

export interface CreateUserData {
  phone: string
  email: string
  gender: string
  address: string
  fullname: string
  health_card_id?: string
  national_identification_card: string
}

export interface UpdateUserData {
  id: string
  email?: string
  phone?: string
  gender?: string
  status?: string
  address?: string
  fullname?: string
  health_card_id?: string
  national_identification_card?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface UpdateHealthCardData {
  id: string
  name?: string
  status?: string
  balance_amount?: number
}

export interface CreateHealthCardData {
  name: string
  initial_amount: number
}

export type StatusType = "Active" | "Inactive"
export type GenderType = "Male" | "Female" | "Other"
export type RoleType = "Super Admin" | "Hospital" | "Pharmacy" | "Labs" | "Patient"
