const chars = '!<>-_\\/[]{}—=+*^?#________'

export function useTextScramble(element: HTMLElement, newText: string) {

  const el = element
  const finalText = newText
  let frameRequest = 0
  let frame = 0
  const queue: char[] = []

  const setText = () => {
    const oldText = el.innerText
    const length = Math.max(oldText.length, finalText.length)
    // const promise = new Promise((resolve) => this.resolve = resolve)
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = finalText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      queue.push({ from, to, start, end })
      
    }
    cancelAnimationFrame(frameRequest)
    frame = 0
    update()
  }

  const update = () => {
    let output = ''
    let complete = 0
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i]
      if (frame >= end) {
        complete++
        output += to
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar()
          queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    el.innerHTML = output
    if (complete !== queue.length) {
      
      frameRequest = requestAnimationFrame(update)
      frame++
    }
  }

  const randomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)]
  }

  setText()
}