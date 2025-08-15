import type { ObjectId } from "mongodb"

export interface Teacher {
  _id?: ObjectId
  teacherId: string
  name: string
  nameInBengali: string
  designation: string
  subjects: string[]
  qualifications: string[]
  experience: number
  joiningDate: Date
  phoneNumber: string
  email: string
  address: string
  dateOfBirth: Date
  bloodGroup?: string
  emergencyContact: string
  salary?: number
  status: "active" | "inactive" | "retired"
  createdAt: Date
  updatedAt: Date
}

export interface TeacherCreateInput {
  teacherId: string
  name: string
  nameInBengali: string
  designation: string
  subjects: string[]
  qualifications: string[]
  experience: number
  joiningDate: string
  phoneNumber: string
  email: string
  address: string
  dateOfBirth: string
  bloodGroup?: string
  emergencyContact: string
  salary?: number
}
