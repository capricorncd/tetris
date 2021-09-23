/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-09-22 22:27 (GMT+0900)
 */
export class AudioPlayer {
  private context: AudioContext;
  private readonly buffers: Record<string, AudioBuffer>;
  private readonly sources: Record<string, AudioBufferSourceNode>;

  constructor() {
    // @ts-ignore
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new AudioContext()
    this.buffers = {}
    this.sources = {}
  }

  async addSource(name: string, path: string): Promise<void> {
    const res = await fetch(path)
    const buffer = await res.arrayBuffer()
    // Safari doesn't know the promise based decodeAudioData. You will have to use callbacks.
    this.context.decodeAudioData(buffer, (buf) => {
      this.buffers[name] = buf
    }, (e) => {
      console.error(e)
    })
  }

  play(name: string, isLoop = false): void {
    if (this.sources[name]) {
      this.sources[name].connect(this.context.destination)
    } else {
      let source: AudioBufferSourceNode | null = this.context.createBufferSource()
      source.connect(this.context.destination)
      if (this.buffers[name]) {
        source.buffer = this.buffers[name]
        source.loop = isLoop
        source.start()
        if (isLoop) {
          this.sources[name] = source
        }
        source.addEventListener('ended', () => {
          source?.disconnect(this.context.destination)
          source = null
        })
      } else {
        throw new Error(`"${name}" audio is not registered`)
      }
    }
  }

  pause(name: string): void {
    if (this.sources[name]) {
      this.sources[name].disconnect(this.context.destination)
    }
  }
}
