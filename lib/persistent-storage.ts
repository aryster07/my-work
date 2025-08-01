import fs from 'fs'
import path from 'path'

// File-based persistent storage for download counts
// This will survive server restarts and deployments
class PersistentDownloadStorage {
  private readonly dataFile: string
  private counts: Map<string, number> = new Map()
  private initialized = false

  constructor() {
    // Store data in a JSON file in the project root
    this.dataFile = path.join(process.cwd(), 'download-counts.json')
    this.loadCounts()
  }

  // Load counts from file
  private loadCounts(): void {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf-8')
        const parsed = JSON.parse(data)
        this.counts = new Map(Object.entries(parsed))
        console.log(`📊 Loaded ${this.counts.size} download counts from storage`)
      } else {
        console.log('📊 No existing download counts file found, starting fresh')
      }
    } catch (error) {
      console.error('❌ Error loading download counts:', error)
      this.counts = new Map()
    }
    this.initialized = true
  }

  // Save counts to file
  private saveCounts(): void {
    try {
      const data = Object.fromEntries(this.counts)
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('❌ Error saving download counts:', error)
    }
  }

  // Get download count for an image
  getCount(imageKey: string): number {
    if (!this.initialized) this.loadCounts()
    return this.counts.get(imageKey) || 0
  }

  // Set download count for an image
  setCount(imageKey: string, count: number): void {
    if (!this.initialized) this.loadCounts()
    this.counts.set(imageKey, count)
    this.saveCounts()
  }

  // Increment download count for an image
  incrementCount(imageKey: string): number {
    if (!this.initialized) this.loadCounts()
    const currentCount = this.getCount(imageKey)
    const newCount = currentCount + 1
    this.setCount(imageKey, newCount)
    return newCount
  }

  // Create image key
  createImageKey(folderName: string, publicId: string, imageId: number): string {
    return `${folderName}:${publicId}:${imageId}`
  }

  // Get all counts (for debugging)
  getAllCounts(): Record<string, number> {
    if (!this.initialized) this.loadCounts()
    return Object.fromEntries(this.counts)
  }
}

// Export singleton instance
export const persistentStorage = new PersistentDownloadStorage()
