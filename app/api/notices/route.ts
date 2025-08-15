import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Notice, NoticeCreateInput } from "@/lib/models/notice"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const priority = searchParams.get("priority") || ""

    const db = await getDatabase()
    const collection = db.collection<Notice>("notices")

    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { titleInBengali: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { contentInBengali: { $regex: search, $options: "i" } },
      ]
    }
    if (category) {
      query.category = category
    }
    if (priority) {
      query.priority = priority
    }

    const skip = (page - 1) * limit
    const notices = await collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await collection.countDocuments(query)

    return NextResponse.json({
      notices,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching notices:", error)
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: NoticeCreateInput & { authorId: string; authorName: string } = await request.json()

    const db = await getDatabase()
    const collection = db.collection<Notice>("notices")

    const notice: Omit<Notice, "_id"> = {
      ...body,
      publishDate: new Date(body.publishDate),
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(notice)

    return NextResponse.json(
      {
        message: "Notice created successfully",
        noticeId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating notice:", error)
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 })
  }
}
