import type { ObjectId } from "mongodb"

export interface Student {
  _id?: ObjectId
  studentId: string
  name: string
  nameInBengali: string
  fatherName: string
  motherName: string
  dateOfBirth: Date
  class: string
  section: string
  rollNumber: number
  admissionDate: Date
  address: string
  phoneNumber: string
  guardianPhone: string
  email?: string
  bloodGroup?: string
  religion: string
  nationality: string
  previousSchool?: string
  academicYear: string
  status: "active" | "inactive" | "graduated"
  createdAt: Date
  updatedAt: Date
}

export interface StudentCreateInput {
  studentId: string
  name: string
  nameInBengali: string
  fatherName: string
  motherName: string
  dateOfBirth: string
  class: string
  section: string
  rollNumber: number
  admissionDate: string
  address: string
  phoneNumber: string
  guardianPhone: string
  email?: string
  bloodGroup?: string
  religion: string
  nationality: string
  previousSchool?: string
  academicYear: string
}
