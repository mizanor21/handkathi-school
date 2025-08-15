import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Notice } from "@/lib/models/notice"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid notice ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<Notice>("notices")

    const notice = await collection.findOne({ _id: new ObjectId(id) })

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 })
    }

    return NextResponse.json({ notice })
  } catch (error) {
    console.error("Error fetching notice:", error)
    return NextResponse.json({ error: "Failed to fetch notice" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid notice ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<Notice>("notices")

    const updateData = {
      ...body,
      publishDate: new Date(body.publishDate),
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
      updatedAt: new Date(),
    }

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Notice updated successfully" })
  } catch (error) {
    console.error("Error updating notice:", error)
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid notice ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection<Notice>("notices")

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Notice deleted successfully" })
  } catch (error) {
    console.error("Error deleting notice:", error)
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 })
  }
}
