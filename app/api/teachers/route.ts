import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Teacher, TeacherCreateInput } from "@/lib/models/teacher"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const subject = searchParams.get("subject") || ""

    const db = await getDatabase()
    const collection = db.collection<Teacher>("teachers")

    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameInBengali: { $regex: search, $options: "i" } },
        { teacherId: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
      ]
    }
    if (subject) {
      query.subjects = { $in: [subject] }
    }

    const skip = (page - 1) * limit
    const teachers = await collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await collection.countDocuments(query)

    return NextResponse.json({
      teachers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: TeacherCreateInput = await request.json()

    const db = await getDatabase()
    const collection = db.collection<Teacher>("teachers")

    // Check if teacher ID already exists
    const existingTeacher = await collection.findOne({ teacherId: body.teacherId })
    if (existingTeacher) {
      return NextResponse.json({ error: "Teacher ID already exists" }, { status: 400 })
    }

    const teacher: Omit<Teacher, "_id"> = {
      ...body,
      dateOfBirth: new Date(body.dateOfBirth),
      joiningDate: new Date(body.joiningDate),
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(teacher)

    return NextResponse.json(
      {
        message: "Teacher created successfully",
        teacherId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating teacher:", error)
    return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 })
  }
}
