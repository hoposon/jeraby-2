<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin - Works Configuration</h1>
        <p class="text-gray-600">Development only - This page is not accessible in production</p>
        <p class="text-sm text-gray-500 mt-2">Edit Czech text values directly. Keys are auto-generated based on work ID.</p>

        <!-- DeepL API Key -->
        <div class="mt-4 p-4 bg-blue-50 rounded-lg">
          <label class="block text-sm font-medium text-gray-700 mb-2">DeepL Translation</label>

          <!-- .env key status -->
          <div v-if="envKeyConfigured" class="flex items-center gap-2 mb-3 p-2 bg-green-100 rounded">
            <span class="text-green-700 text-sm">API key loaded from .env ({{ envKeyPreview }})</span>
          </div>
          <div v-else class="flex items-center gap-2 mb-3 p-2 bg-yellow-100 rounded">
            <span class="text-yellow-700 text-sm">No .env key found. Add DEEPL_API_KEY to .env or enter manually:</span>
          </div>

          <div class="flex gap-2">
            <input
              v-if="!envKeyConfigured"
              v-model="deeplApiKey"
              type="password"
              placeholder="Enter your DeepL API key"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              @click="translateAllWorks"
              :disabled="(!envKeyConfigured && !deeplApiKey) || translating"
              class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-300 text-sm"
            >
              {{ translating ? 'Translating...' : 'Translate All to English' }}
            </button>
          </div>
          <p v-if="!envKeyConfigured" class="text-xs text-gray-500 mt-1">
            Recommended: Add <code class="bg-gray-200 px-1 rounded">DEEPL_API_KEY=xxx</code> to <code class="bg-gray-200 px-1 rounded">.env</code> file.
            Get a free key at <a href="https://www.deepl.com/pro-api" target="_blank" class="text-blue-600 underline">deepl.com/pro-api</a>
          </p>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="bg-white rounded-lg shadow p-6 text-center">
        <p class="text-gray-600">Loading works...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
        <p class="text-red-700">{{ error }}</p>
        <button @click="loadWorks" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Retry
        </button>
      </div>

      <!-- Main content -->
      <div v-else>
        <!-- Actions bar -->
        <div class="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
          <button
            @click="addNewWork"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <span>+ Add New Work</span>
          </button>
          <div class="flex gap-4">
            <button
              @click="saveAllChanges"
              :disabled="saving"
              class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {{ saving ? 'Saving...' : 'Save All Changes' }}
            </button>
          </div>
        </div>

        <!-- Success message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p class="text-green-700">{{ successMessage }}</p>
        </div>

        <!-- Works list -->
        <div class="space-y-6">
          <div
            v-for="(work, index) in works"
            :key="work.id"
            class="bg-white rounded-lg shadow overflow-hidden"
          >
            <!-- Work header -->
            <div
              class="p-4 cursor-pointer flex justify-between items-center"
              :style="{ backgroundColor: getWorkBgColor(work) }"
              @click="toggleWork(index)"
            >
              <div class="flex items-center gap-4">
                <span class="text-white font-bold text-lg">{{ work.id }}</span>
                <span class="text-white/80">{{ work.texts?.title || work.title }}</span>
              </div>
              <div class="flex items-center gap-4">
                <span
                  v-if="translationStatus[work.id]"
                  class="px-2 py-1 bg-green-500 text-white text-xs rounded"
                  title="English translation available"
                >
                  EN
                </span>
                <span
                  v-else
                  class="px-2 py-1 bg-yellow-500 text-white text-xs rounded"
                  title="No English translation"
                >
                  CS only
                </span>
                <button
                  @click.stop="translateWork(index)"
                  :disabled="(!envKeyConfigured && !deeplApiKey) || translatingWork === index"
                  class="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 disabled:bg-purple-300"
                  title="Translate to English"
                >
                  {{ translatingWork === index ? '...' : 'Translate' }}
                </button>
                <button
                  @click.stop="deleteWork(index)"
                  class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <span class="text-white text-2xl">{{ expandedWorks.includes(index) ? '-' : '+' }}</span>
              </div>
            </div>

            <!-- Work details (expanded) -->
            <div v-if="expandedWorks.includes(index)" class="p-6 border-t">
              <!-- Basic info -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Work ID</label>
                  <input
                    v-model="work.id"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., jeraby-30"
                  />
                  <p class="text-xs text-gray-500 mt-1">Used for i18n keys and image paths</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-blue-600">(CS)</span></label>
                  <input
                    v-model="work.texts.title"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., # Jeraby 30"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-green-600">(EN)</span></label>
                  <input
                    v-model="work.textsEn.title"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., # Cranes 30"
                  />
                </div>
              </div>

              <!-- Page Header -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-4">Page Header</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
                    <input
                      v-model="work.pageHeader.bgImage"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Background Color (Tailwind class)</label>
                    <input
                      v-model="bgColorInput[index]"
                      type="text"
                      placeholder="e.g., bg-[#dcd6cc]"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                      @change="updateBgColor(index)"
                    />
                  </div>
                </div>
              </div>

              <!-- Presentation -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-4">Presentation</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Short Description <span class="text-blue-600">(CS)</span></label>
                    <input
                      v-model="work.texts.presentationDescription"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 60x60x32"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Short Description <span class="text-green-600">(EN)</span></label>
                    <input
                      v-model="work.textsEn.presentationDescription"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 60x60x32"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Presentation Type</label>
                    <select
                      v-model="work.presentation.presentationType"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="oneLeft">One Left</option>
                      <option value="oneRight">One Right</option>
                      <option value="twoImages">Two Images</option>
                    </select>
                  </div>
                </div>

                <!-- Presentation Images -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Presentation Images</label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      v-for="(img, imgIndex) in work.presentation.presentationImages"
                      :key="imgIndex"
                      class="relative"
                    >
                      <img :src="img.imgPath" class="w-full h-24 object-cover rounded" />
                      <button
                        @click="removePresentationImage(index, imgIndex)"
                        class="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-sm"
                      >
                        x
                      </button>
                    </div>
                    <div
                      v-if="work.presentation.presentationImages.length < 2"
                      class="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-24 cursor-pointer hover:border-blue-500"
                      @click="showImagePicker(index, 'presentation')"
                    >
                      <span class="text-gray-400">+ Add Image</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Work Details - Text Content -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-4">Work Details - Text Content</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Czech column -->
                  <div class="space-y-4 p-3 bg-blue-50 rounded">
                    <h4 class="text-sm font-medium text-blue-700">Czech (CS)</h4>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Main Text</label>
                      <textarea
                        v-model="work.texts.mainText"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Main description text. Use </br> for line breaks."
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Small Text</label>
                      <textarea
                        v-model="work.texts.smallText"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Additional description text"
                      ></textarea>
                    </div>
                  </div>
                  <!-- English column -->
                  <div class="space-y-4 p-3 bg-green-50 rounded">
                    <h4 class="text-sm font-medium text-green-700">English (EN)</h4>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Main Text</label>
                      <textarea
                        v-model="work.textsEn.mainText"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Main description text (English)"
                      ></textarea>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Small Text</label>
                      <textarea
                        v-model="work.textsEn.smallText"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Additional description text (English)"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Grid Item Details -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-4">Dimensions Info</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Czech -->
                  <div class="p-3 bg-blue-50 rounded">
                    <h4 class="text-sm font-medium text-blue-700 mb-3">Czech (CS)</h4>
                    <div class="grid grid-cols-3 gap-2">
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Title</label>
                        <input
                          v-model="work.texts.gridItemTitle"
                          type="text"
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="# Rozměry"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Size</label>
                        <input
                          v-model="work.texts.gridItemSize"
                          type="text"
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="60x60 cm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Info</label>
                        <input
                          v-model="work.texts.gridItemText"
                          type="text"
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="32 ptáků"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- English -->
                  <div class="p-3 bg-green-50 rounded">
                    <h4 class="text-sm font-medium text-green-700 mb-3">English (EN)</h4>
                    <div class="grid grid-cols-3 gap-2">
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Title</label>
                        <input
                          v-model="work.textsEn.gridItemTitle"
                          type="text"
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="# Dimensions"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Size</label>
                        <input
                          v-model="work.textsEn.gridItemSize"
                          type="text"
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="60x60 cm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">Info</label>
                        <input
                          v-model="work.textsEn.gridItemText"
                          type="text"
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="32 birds"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Grid Items - Images -->
              <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-medium text-gray-900">Gallery Images</h3>
                  <button
                    @click="addGridItem(index)"
                    class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    + Add Image
                  </button>
                </div>
                <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
                  <div
                    v-for="(item, itemIndex) in work.workDetails.gridItems.filter(i => i.type === 'IMAGE')"
                    :key="item.id"
                    class="relative"
                  >
                    <img
                      v-if="item.image"
                      :src="item.image.imgPath"
                      class="w-full h-20 object-cover rounded border"
                    />
                    <button
                      @click="removeGridItem(index, getGridItemIndex(index, item.id))"
                      class="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>

              <!-- Image Upload -->
              <div class="p-4 bg-blue-50 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-4">Upload Images</h3>
                <div class="flex items-center gap-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    @change="(e) => handleFileSelect(e, index)"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
                <div v-if="uploadingFor === index" class="mt-2 text-blue-600">Uploading...</div>

                <!-- Existing images in folder -->
                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Available Images (click to add)</label>
                  <div class="grid grid-cols-6 md:grid-cols-12 gap-2">
                    <div
                      v-for="img in workImages[work.id]"
                      :key="img"
                      class="relative cursor-pointer group"
                      @click="addImageFromFolder(index, img)"
                    >
                      <img :src="img" class="w-full h-12 object-cover rounded border group-hover:border-blue-500" />
                      <div class="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 rounded flex items-center justify-center">
                        <span class="text-white text-xs font-bold">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface GridItem {
  id: string
  type: 'TEXT' | 'IMAGE'
  title?: string
  description?: { size?: string; text?: string }
  image?: { imgPath: string; imgAlt: string }
}

interface WorkTexts {
  title: string
  presentationDescription: string
  mainText: string
  smallText: string
  gridItemTitle: string
  gridItemSize: string
  gridItemText: string
}

interface CollectionWork {
  id: string
  pageHeader: {
    title: string
    bgImage?: string
    classNames?: Record<string, string | string[]>
  }
  title: string
  presentation: {
    presentationDescription: string
    presentationImages: { imgPath: string; imgAlt: string }[]
    presentationType: 'oneLeft' | 'oneRight' | 'twoImages'
    classNames: Record<string, string>
  }
  workDetails: {
    mainText?: string
    smallText?: string
    gridItems: GridItem[]
  }
  texts: WorkTexts
  textsEn: WorkTexts
}

const works = ref<CollectionWork[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const saving = ref(false)
const successMessage = ref<string | null>(null)
const expandedWorks = ref<number[]>([])
const uploadingFor = ref<number | null>(null)
const workImages = ref<Record<string, string[]>>({})
const bgColorInput = ref<Record<number, string>>({})

// Translation state
const deeplApiKey = ref('')
const translating = ref(false)
const translatingWork = ref<number | null>(null)
const translationStatus = ref<Record<string, boolean>>({})
const envKeyConfigured = ref(false)
const envKeyPreview = ref<string | null>(null)

async function loadWorks() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/__admin/api/works')
    if (!response.ok) throw new Error('Failed to load works')
    works.value = await response.json()

    // Initialize bgColorInput for each work
    works.value.forEach((work, index) => {
      const bgClasses = work.pageHeader.classNames?.bg
      if (Array.isArray(bgClasses) && bgClasses.length > 0) {
        bgColorInput.value[index] = bgClasses[0]
      }
    })

    // Load images for all works
    for (const work of works.value) {
      await loadWorkImages(work.id)
    }
  } catch (e) {
    error.value = String(e)
  } finally {
    loading.value = false
  }
}

async function loadWorkImages(workId: string) {
  try {
    const response = await fetch(`/__admin/api/images?workId=${workId}`)
    if (response.ok) {
      const data = await response.json()
      workImages.value[workId] = data.images
    }
  } catch (e) {
    console.error('Failed to load images for', workId, e)
  }
}

async function saveAllChanges() {
  saving.value = true
  successMessage.value = null
  error.value = null

  try {
    const response = await fetch('/__admin/api/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(works.value)
    })

    if (!response.ok) throw new Error('Failed to save works')

    successMessage.value = 'All changes saved successfully! (works config + Czech localizations)'
    setTimeout(() => { successMessage.value = null }, 5000)
  } catch (e) {
    error.value = String(e)
  } finally {
    saving.value = false
  }
}

function toggleWork(index: number) {
  const i = expandedWorks.value.indexOf(index)
  if (i === -1) {
    expandedWorks.value.push(index)
  } else {
    expandedWorks.value.splice(i, 1)
  }
}

function getWorkBgColor(work: CollectionWork): string {
  const bgClasses = work.pageHeader.classNames?.bg
  if (Array.isArray(bgClasses)) {
    for (const cls of bgClasses) {
      const match = cls.match(/bg-\[([^\]]+)\]/)
      if (match) return match[1]
    }
  }
  return '#6b7280'
}

function updateBgColor(index: number) {
  const color = bgColorInput.value[index]
  if (color && works.value[index]) {
    if (!works.value[index].pageHeader.classNames) {
      works.value[index].pageHeader.classNames = {}
    }
    works.value[index].pageHeader.classNames!.bg = [color]
  }
}

function addNewWork() {
  const existingIds = works.value.map(w => {
    const match = w.id.match(/jeraby-(\d+)/)
    return match ? parseInt(match[1]) : 0
  })
  const nextNum = Math.max(...existingIds, 0) + 1
  const newId = `jeraby-${nextNum}`

  const newWork: CollectionWork = {
    id: newId,
    pageHeader: {
      title: `jeraby.collection.works.${newId}.title`,
      bgImage: '/images/crane-icon-white.png',
      classNames: {
        bg: ['bg-[#6b7280]'],
        title: ['mt-[10vh]', 'md:mt-[1vh]', 'text-4xl', 'sm:text-6xl', 'text-white', 'font-semi-bold']
      }
    },
    title: `jeraby.collection.works.${newId}.title`,
    presentation: {
      presentationDescription: `jeraby.collection.works.${newId}.presentationDescription`,
      presentationImages: [],
      presentationType: 'twoImages',
      classNames: {}
    },
    workDetails: {
      mainText: `jeraby.collection.works.${newId}.workDetails.main.text`,
      smallText: `jeraby.collection.works.${newId}.workDetails.small.text`,
      gridItems: [{
        id: '1',
        type: 'TEXT',
        title: `jeraby.collection.works.${newId}.workDetails.gridItems.1.title`,
        description: {
          size: `jeraby.collection.works.${newId}.workDetails.gridItems.1.size`,
          text: `jeraby.collection.works.${newId}.workDetails.gridItems.1.text`
        }
      }]
    },
    texts: {
      title: `# Jeraby ${nextNum}`,
      presentationDescription: '',
      mainText: '',
      smallText: '',
      gridItemTitle: '# Rozměry',
      gridItemSize: '',
      gridItemText: ''
    },
    textsEn: {
      title: `# Cranes ${nextNum}`,
      presentationDescription: '',
      mainText: '',
      smallText: '',
      gridItemTitle: '# Dimensions',
      gridItemSize: '',
      gridItemText: ''
    }
  }

  works.value.unshift(newWork)
  bgColorInput.value[0] = 'bg-[#6b7280]'
  expandedWorks.value = [0]
}

function deleteWork(index: number) {
  if (confirm(`Are you sure you want to delete "${works.value[index].id}"?`)) {
    works.value.splice(index, 1)
    expandedWorks.value = expandedWorks.value
      .filter(i => i !== index)
      .map(i => i > index ? i - 1 : i)
  }
}

function getGridItemIndex(workIndex: number, itemId: string): number {
  return works.value[workIndex].workDetails.gridItems.findIndex(item => item.id === itemId)
}

function addGridItem(workIndex: number) {
  const gridItems = works.value[workIndex].workDetails.gridItems
  const maxId = Math.max(...gridItems.map(item => parseInt(item.id) || 0), 0)
  const newId = String(maxId + 1)
  const workId = works.value[workIndex].id

  gridItems.push({
    id: newId,
    type: 'IMAGE',
    image: {
      imgPath: `/images/collections/jeraby/${workId}/${newId}.jpg`,
      imgAlt: `jeraby.collection.works.${workId}.workDetails.${workId}/${newId}.imgAlt`
    }
  })
}

function removeGridItem(workIndex: number, itemIndex: number) {
  if (itemIndex >= 0) {
    works.value[workIndex].workDetails.gridItems.splice(itemIndex, 1)
  }
}

function removePresentationImage(workIndex: number, imgIndex: number) {
  works.value[workIndex].presentation.presentationImages.splice(imgIndex, 1)
}

function addImageFromFolder(workIndex: number, imgPath: string) {
  const work = works.value[workIndex]
  const gridItems = work.workDetails.gridItems
  const maxId = Math.max(...gridItems.map(item => parseInt(item.id) || 0), 0)
  const newId = String(maxId + 1)

  // Check if this image is already in the grid
  const exists = gridItems.some(item => item.image?.imgPath === imgPath)
  if (exists) {
    successMessage.value = 'This image is already in the gallery'
    setTimeout(() => { successMessage.value = null }, 2000)
    return
  }

  gridItems.push({
    id: newId,
    type: 'IMAGE',
    image: {
      imgPath: imgPath,
      imgAlt: `jeraby.collection.works.${work.id}.workDetails.${work.id}/${newId}.imgAlt`
    }
  })
}

function showImagePicker(workIndex: number, target: 'presentation') {
  const work = works.value[workIndex]
  const images = workImages.value[work.id] || []

  if (images.length === 0) {
    alert('No images available. Upload some images first.')
    return
  }

  // For simplicity, add the first available image not yet used
  const usedImages = work.presentation.presentationImages.map(img => img.imgPath)
  const available = images.find(img => !usedImages.includes(img))

  if (available) {
    work.presentation.presentationImages.push({
      imgPath: available,
      imgAlt: `jeraby.collection.works.${work.id}.presentationImages.${work.presentation.presentationImages.length + 1}.imgAlt`
    })
  } else {
    alert('All images are already used in presentation')
  }
}

async function handleFileSelect(event: Event, workIndex: number) {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0) return

  uploadingFor.value = workIndex
  const workId = works.value[workIndex].id

  try {
    const formData = new FormData()
    formData.append('workId', workId)
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const response = await fetch('/__admin/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Upload failed')

    const data = await response.json()

    // Add uploaded images as grid items
    for (const path of data.paths) {
      const gridItems = works.value[workIndex].workDetails.gridItems
      const maxId = Math.max(...gridItems.map(item => parseInt(item.id) || 0), 0)
      const newId = String(maxId + 1)

      gridItems.push({
        id: newId,
        type: 'IMAGE',
        image: {
          imgPath: path,
          imgAlt: `jeraby.collection.works.${workId}.workDetails.${workId}/${newId}.imgAlt`
        }
      })
    }

    // Reload work images
    await loadWorkImages(workId)

    successMessage.value = `Uploaded ${data.paths.length} image(s)`
    setTimeout(() => { successMessage.value = null }, 3000)
  } catch (e) {
    console.error('Upload error:', e)
    alert('Failed to upload images: ' + String(e))
  } finally {
    uploadingFor.value = null
    input.value = ''
  }
}

async function loadEnvConfig() {
  try {
    const response = await fetch('/__admin/api/env-config')
    if (response.ok) {
      const data = await response.json()
      envKeyConfigured.value = data.hasDeepLKey
      envKeyPreview.value = data.keyPreview
    }
  } catch (e) {
    console.error('Failed to load env config:', e)
  }
}

async function loadTranslationStatus() {
  try {
    const response = await fetch('/__admin/api/translation-status')
    if (response.ok) {
      const data = await response.json()
      translationStatus.value = data.status
    }
  } catch (e) {
    console.error('Failed to load translation status:', e)
  }
}

async function translateWork(workIndex: number) {
  if (!envKeyConfigured.value && !deeplApiKey.value) {
    alert('Please add DEEPL_API_KEY to .env file or enter it manually')
    return
  }

  translatingWork.value = workIndex
  const workId = works.value[workIndex].id

  try {
    const response = await fetch('/__admin/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workIds: [workId],
        apiKey: deeplApiKey.value || undefined
      })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Translation failed')
    }

    const data = await response.json()
    translationStatus.value[workId] = true
    successMessage.value = `Translated ${data.translated} text(s) to English for ${workId}`
    setTimeout(() => { successMessage.value = null }, 3000)
  } catch (e) {
    console.error('Translation error:', e)
    alert('Translation failed: ' + String(e))
  } finally {
    translatingWork.value = null
  }
}

async function translateAllWorks() {
  if (!envKeyConfigured.value && !deeplApiKey.value) {
    alert('Please add DEEPL_API_KEY to .env file or enter it manually')
    return
  }

  translating.value = true

  try {
    const workIds = works.value.map(w => w.id)

    const response = await fetch('/__admin/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workIds,
        apiKey: deeplApiKey.value || undefined
      })
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Translation failed')
    }

    const data = await response.json()

    // Update all translation statuses
    for (const workId of workIds) {
      translationStatus.value[workId] = true
    }

    successMessage.value = `Translated ${data.translated} text(s) to English for ${data.works.length} works`
    setTimeout(() => { successMessage.value = null }, 5000)
  } catch (e) {
    console.error('Translation error:', e)
    alert('Translation failed: ' + String(e))
  } finally {
    translating.value = false
  }
}

onMounted(async () => {
  await loadWorks()
  await loadEnvConfig()
  await loadTranslationStatus()
})
</script>
