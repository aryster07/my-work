// Shared in-memory storage for download counts
// In production, this should be replaced with a database or Redis
class DownloadCountStorage {
  private readonly counts = new Map<string, number>()

  // Get download count for an image
  getCount(imageKey: string): number {
    return this.counts.get(imageKey) || 0
  }

  // Set download count for an image
  setCount(imageKey: string, count: number): void {
    this.counts.set(imageKey, count)
  }

  // Increment download count for an image
  incrementCount(imageKey: string): number {
    const currentCount = this.getCount(imageKey)
    const newCount = currentCount + 1
    this.setCount(imageKey, newCount)
    return newCount
  }

  // Get all counts for a folder
  getFolderCounts(folderName: string): Record<string, number> {
    const folderCounts: Record<string, number> = {}
    
    for (const [key, count] of this.counts.entries()) {
      if (key.startsWith(`${folderName}:`)) {
        folderCounts[key] = count
      }
    }
    
    return folderCounts
  }

  // Generate image key
  createImageKey(folderName: string, publicId: string, imageId: number): string {
    return `${folderName}:${publicId}:${imageId}`
  }

  // Initialize with random counts for demo (remove in production)
  initializeRandomCount(imageKey: string): number {
    if (!this.counts.has(imageKey)) {
      const randomCount = Math.floor(Math.random() * 100) + 1 // 1-100 downloads
      this.setCount(imageKey, randomCount)
      return randomCount
    }
    return this.getCount(imageKey)
  }
}

// Export singleton instance
export const downloadStorage = new DownloadCountStorage()
