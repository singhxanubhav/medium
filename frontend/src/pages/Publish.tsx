"use client"

import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { type ChangeEvent, useState } from "react"

export const Publish = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a new post</h1>

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                type="text"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition duration-150 ease-in-out"
                placeholder="Enter your post title..."
              />
            </div>

            <div>
              <label htmlFor="editor" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <TextEditor
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `${BACKEND_URL}/api/v1/blog`,
                      {
                        title,
                        content: description,
                      },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      },
                    )
                    navigate(`/blog/${response.data.id}`)
                  } catch (error) {
                    console.error("Failed to publish post:", error)
                    // You could add error handling UI here
                  }
                }}
                type="submit"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-150 ease-in-out shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Publish post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-white w-full">
        <textarea
          onChange={onChange}
          id="editor"
          rows={12}
          className="focus:outline-none block w-full p-4 text-gray-800 bg-white border-0 resize-none"
          placeholder="Write your article content here..."
          required
        />
      </div>
    </div>
  )
}

