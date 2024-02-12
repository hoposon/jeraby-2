import type { Directive, DirectiveBinding } from 'vue'

interface NamedEntity {
  name: string;
}
export type CustomDirective = NamedEntity & Directive;

type ElementWithIntersectionObserver = {intersectionObserver?: IntersectionObserver} & HTMLElement

type intersectCallback = (en: IntersectionObserverEntry[]) => void
type isloadedCallback = () => void

const intersect: CustomDirective = {
  name: 'intersect',

  mounted(el: ElementWithIntersectionObserver, binding: DirectiveBinding<intersectCallback>) {
    if (typeof binding.value !== 'function') {
      return
    }

    el.intersectionObserver = new IntersectionObserver((en: IntersectionObserverEntry[]) => {
      binding.value(en)
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    })
    el.intersectionObserver.observe(el)
  },

  beforeUnmount(el) {
    if (!el.intersectionObserver) {
      return
    }

    el.intersectionObserver.disconnect()
    el.intersectionObserver = null
  }
}

const isloaded: CustomDirective = {
  name: 'isloaded',

  mounted(el: HTMLElement, binding: DirectiveBinding<isloadedCallback>) {
    if (typeof binding.value !== 'function') {
      return
    }

    el.addEventListener('load',binding.value)
  },

  beforeUnmount(el, binding) {
    if (typeof binding.value !== 'function') {
      return
    }

    el.removeEventListener('load', binding.value)
  }
}

type ElementWithResizeObserver = {resizeObserver?: ResizeObserver} & HTMLElement

type resizeCallback = (rect: DOMRect) => void

const resize: CustomDirective = {
  name: 'resize',

  mounted(el: ElementWithResizeObserver, binding: DirectiveBinding<resizeCallback>) {
    if (typeof binding.value !== 'function') {
      return
    }
    el.resizeObserver = new ResizeObserver(() => {
      const size = el.getBoundingClientRect()
      binding.value(size)
    })
    el.resizeObserver.observe(el)
  },

  beforeUnmount(el) {
    if (!el.resizeObserver) {
      return
    }

    el.resizeObserver.disconnect()
    el.resizeObserver = null
  }
}


export default [
  intersect,
  isloaded,
  resize
]