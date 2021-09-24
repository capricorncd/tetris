/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-09-22 22:27 (GMT+0900)
 */
import { ProgressHandler } from '~/types'

export class AudioPlayer {
  private context: AudioContext;
  private readonly buffers: Record<string, AudioBuffer>;
  private readonly sources: Record<string, AudioBufferSourceNode>;
  private readonly gainNode: GainNode;

  constructor() {
    // @ts-ignore
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.context = new AudioContext()
    this.gainNode = this.context.createGain()
    this.gainNode.gain.value = 0.1
    this.gainNode.connect(this.context.destination)
    this.buffers = {}
    this.sources = {}
  }

  /**
   * add audio source
   * @param name
   * @param path
   * @param progress
   */
  addSource(name: string | Record<string, string>, path?: string | ProgressHandler, progress?: ProgressHandler): Promise<void> {
    const input: Record<string, string> = typeof name === 'string'
      ? { [name]: path as string }
      : name
    progress = typeof path === 'function' ? path : progress

    return new Promise<void>((resolve) => {
      const entries = Object.entries(input)
      const len = entries.length
      if (!len) {
        progress && progress(1)
        resolve()
        return
      }
      let count = 0
      for (const [key, value] of entries) {
        fetch(value).then(res => {
          res.arrayBuffer().then(buffer => {
            // Safari doesn't know the promise based decodeAudioData. You will have to use callbacks.
            this.context.decodeAudioData(buffer, (buf) => {
              this.buffers[key] = buf
              count++
              progress && progress(count / len)
              if (count === len) resolve()
            }, (e) => {
              console.error(e)
              count++
              progress && progress(count / len)
              if (count === len) resolve()
            })
          })
        })
      }
    })
  }

  play(name: string, isLoop = false): void {
    if (this.sources[name]) {
      // this.sources[name].connect(this.context.destination)
      this.sources[name].connect(this.gainNode)
    } else {
      if (this.buffers[name]) {
        let source: AudioBufferSourceNode = this.context.createBufferSource()
        // source.connect(this.context.destination)
        source.connect(this.gainNode)
        source.buffer = this.buffers[name]
        source.loop = isLoop
        source.start()
        if (isLoop) {
          this.sources[name] = source
        }
        source.addEventListener('ended', () => {
          // source.disconnect(this.context.destination)
          source.disconnect(this.gainNode)
          // @ts-ignore
          source = null
        })
      } else {
        throw new Error(`"${name}" audio is not registered`)
      }
    }
  }

  pause(name: string): void {
    if (this.sources[name]) {
      // this.sources[name].disconnect(this.context.destination)
      this.sources[name].disconnect(this.gainNode)
    }
  }

  setVolume(value: number): void {
    this.gainNode.gain.value = value
  }
}
