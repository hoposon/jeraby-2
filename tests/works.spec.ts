import { describe, it, expect } from 'vitest'
import jeraby from '../src/configuration/jeraby-works'

describe('Jeraby Works Configuration', () => {
  describe('Works array structure', () => {
    it('has works defined', () => {
      expect(Array.isArray(jeraby)).toBe(true)
      expect(jeraby.length).toBeGreaterThan(0)
    })

    it('each work has required properties', () => {
      jeraby.forEach((work) => {
        expect(work.id, `Work missing id`).toBeDefined()
        expect(work.title, `Work ${work.id} missing title`).toBeDefined()
        expect(work.pageHeader, `Work ${work.id} missing pageHeader`).toBeDefined()
        expect(work.presentation, `Work ${work.id} missing presentation`).toBeDefined()
        expect(work.workDetails, `Work ${work.id} missing workDetails`).toBeDefined()
      })
    })

    it('each work has unique id', () => {
      const ids = jeraby.map((work) => work.id)
      const uniqueIds = new Set(ids)
      expect(ids.length).toBe(uniqueIds.size)
    })
  })

  describe('Page header structure', () => {
    it('each work has valid page header', () => {
      jeraby.forEach((work) => {
        expect(work.pageHeader.title, `Work ${work.id} pageHeader missing title`).toBeDefined()
        expect(work.pageHeader.bgImage, `Work ${work.id} pageHeader missing bgImage`).toBeDefined()
        expect(work.pageHeader.classNames, `Work ${work.id} pageHeader missing classNames`).toBeDefined()
        expect(work.pageHeader.classNames?.bg, `Work ${work.id} pageHeader missing bg classNames`).toBeDefined()
        expect(work.pageHeader.classNames?.title, `Work ${work.id} pageHeader missing title classNames`).toBeDefined()
      })
    })
  })

  describe('Presentation structure', () => {
    it('each work has valid presentation', () => {
      jeraby.forEach((work) => {
        expect(
          work.presentation.presentationDescription,
          `Work ${work.id} presentation missing description`
        ).toBeDefined()
        expect(
          work.presentation.presentationImages,
          `Work ${work.id} presentation missing images`
        ).toBeDefined()
        expect(
          work.presentation.presentationImages.length,
          `Work ${work.id} presentation should have at least one image`
        ).toBeGreaterThan(0)
        expect(
          work.presentation.presentationType,
          `Work ${work.id} presentation missing type`
        ).toBeDefined()
      })
    })

    it('presentation images have valid structure', () => {
      jeraby.forEach((work) => {
        work.presentation.presentationImages.forEach((img, index) => {
          expect(img.imgPath, `Work ${work.id} image ${index} missing imgPath`).toBeDefined()
          expect(img.imgAlt, `Work ${work.id} image ${index} missing imgAlt`).toBeDefined()
          expect(img.imgPath.startsWith('/images/'), `Work ${work.id} image ${index} path should start with /images/`).toBe(true)
        })
      })
    })

    it('presentation types are valid', () => {
      const validTypes = ['oneLeft', 'oneRight', 'twoImages']
      jeraby.forEach((work) => {
        expect(
          validTypes.includes(work.presentation.presentationType),
          `Work ${work.id} has invalid presentation type: ${work.presentation.presentationType}`
        ).toBe(true)
      })
    })
  })

  describe('Work details structure', () => {
    it('each work has valid work details', () => {
      jeraby.forEach((work) => {
        expect(work.workDetails.mainText, `Work ${work.id} workDetails missing mainText`).toBeDefined()
        expect(work.workDetails.smallText, `Work ${work.id} workDetails missing smallText`).toBeDefined()
        expect(work.workDetails.gridItems, `Work ${work.id} workDetails missing gridItems`).toBeDefined()
        expect(
          work.workDetails.gridItems.length,
          `Work ${work.id} workDetails should have at least one gridItem`
        ).toBeGreaterThan(0)
      })
    })

    it('grid items have valid structure', () => {
      jeraby.forEach((work) => {
        work.workDetails.gridItems.forEach((item, index) => {
          expect(item.id, `Work ${work.id} gridItem ${index} missing id`).toBeDefined()
          expect(item.type, `Work ${work.id} gridItem ${index} missing type`).toBeDefined()
          expect(['TEXT', 'IMAGE'].includes(item.type), `Work ${work.id} gridItem ${index} has invalid type`).toBe(
            true
          )

          if (item.type === 'IMAGE') {
            expect(item.image, `Work ${work.id} gridItem ${index} IMAGE type missing image object`).toBeDefined()
            expect(item.image?.imgPath, `Work ${work.id} gridItem ${index} image missing imgPath`).toBeDefined()
          }

          if (item.type === 'TEXT') {
            expect(item.title, `Work ${work.id} gridItem ${index} TEXT type missing title`).toBeDefined()
          }
        })
      })
    })
  })

  describe('I18n key patterns', () => {
    it('title keys follow correct pattern', () => {
      jeraby.forEach((work) => {
        expect(work.title).toMatch(/^jeraby\.collection\.works\.[\w-]+\.title$/)
      })
    })

    it('page header title keys follow correct pattern', () => {
      jeraby.forEach((work) => {
        expect(work.pageHeader.title).toMatch(/^jeraby\.collection\.works\.[\w-]+\.title$/)
      })
    })

    it('presentation description keys follow correct pattern', () => {
      jeraby.forEach((work) => {
        expect(work.presentation.presentationDescription).toMatch(
          /^jeraby\.collection\.works\.[\w-]+\.presentationDescription$/
        )
      })
    })

    it('work details text keys follow correct pattern', () => {
      jeraby.forEach((work) => {
        expect(work.workDetails.mainText).toMatch(/^jeraby\.collection\.works\.[\w-]+\.workDetails\.main\.text$/)
        expect(work.workDetails.smallText).toMatch(/^jeraby\.collection\.works\.[\w-]+\.workDetails\.small\.text$/)
      })
    })
  })

  describe('Image paths', () => {
    it('all image paths follow correct structure', () => {
      jeraby.forEach((work) => {
        // Check presentation images
        work.presentation.presentationImages.forEach((img) => {
          expect(img.imgPath).toMatch(/^\/images\/collections\/jeraby\/[\w-]+\/\d+\.jpg$/)
        })

        // Check grid item images
        work.workDetails.gridItems
          .filter((item) => item.type === 'IMAGE')
          .forEach((item) => {
            expect(item.image?.imgPath).toMatch(/^\/images\/collections\/jeraby\/[\w-]+\/\d+\.jpg$/)
          })
      })
    })

    it('image paths reference the correct work folder', () => {
      jeraby.forEach((work) => {
        const expectedPathPattern = `/images/collections/jeraby/${work.id}/`

        work.presentation.presentationImages.forEach((img) => {
          expect(img.imgPath.includes(expectedPathPattern), `Work ${work.id} presentation image should be in correct folder`).toBe(true)
        })

        work.workDetails.gridItems
          .filter((item) => item.type === 'IMAGE')
          .forEach((item) => {
            expect(
              item.image?.imgPath?.includes(expectedPathPattern),
              `Work ${work.id} grid item image should be in correct folder`
            ).toBe(true)
          })
      })
    })
  })
})
