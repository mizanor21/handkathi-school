import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Student, StudentCreateInput } from "@/lib/models/student"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const classFilter = searchParams.get("class") || ""

    const db = await getDatabase()
    const collection = db.collection<Student>("students")

    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameInBengali: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ]
    }
    if (classFilter) {
      query.class = classFilter
    }

    const skip = (page - 1) * limit
    const students = await collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await collection.countDocuments(query)

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: StudentCreateInput = await request.json()

    const db = await getDatabase()
    const collection = db.collection<Student>("students")

    // Check if student ID already exists
    const existingStudent = await collection.findOne({ studentId: body.studentId })
    if (existingStudent) {
      return NextResponse.json({ error: "Student ID already exists" }, { status: 400 })
    }

    const student: Omit<Student, "_id"> = {
      ...body,
      dateOfBirth: new Date(body.dateOfBirth),
      admissionDate: new Date(body.admissionDate),
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(student)

    return NextResponse.json(
      {
        message: "Student created successfully",
        studentId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
