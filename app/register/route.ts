// app/api/register/route.js (or .ts if using TypeScript)
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: { json: () => any; }) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password, role } = body;

    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check for existing user
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document based on role
    let userData;
    if (role === 'contributor') {
      const { name, skills, experience } = body;
      userData = {
        name,
        email,
        password: hashedPassword,
        role,
        skills: skills ? skills.split(',').map((skill: string) => skill.trim()) : [],
        experience,
        createdAt: new Date(),
      };
    } else if (role === 'hirer') {
      const { companyName, industry, website } = body;
      userData = {
        companyName,
        email,
        password: hashedPassword,
        role,
        industry,
        website: website || null,
        createdAt: new Date(),
      };
    } else {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // Insert user into database
    const result = await usersCollection.insertOne(userData);

    return NextResponse.json({
      message: "User registered successfully",
      userId: result.insertedId,
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}