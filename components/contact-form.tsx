"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { trackEvent } from "@/lib/analytics"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "" })
        
        // Track successful form submission
        trackEvent.contactFormSubmit('contact-form')
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0A0A0A] p-8 border border-gray-800">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="w-full bg-[#111] border-gray-800 focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
          required
          className="w-full bg-[#111] border-gray-800 focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          required
          className="w-full min-h-[150px] bg-[#111] border-gray-800 focus-visible:ring-primary"
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/80" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {submitSuccess && (
        <div className="p-4 bg-green-900/30 border border-green-500 text-green-400 rounded-md">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
    </form>
  )
}
