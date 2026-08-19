import Phaser from 'phaser'
import { useEffect, useRef } from 'react'
import { BootScene } from './scenes/BootScene'
import { InteriorScene } from './scenes/InteriorScene'
import { TownScene } from './scenes/TownScene'
import { Overlay } from './ui/Overlay'
import { Canvas, Stage } from './styles'

export function PortfolioGame() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container.current!,
      pixelArt: true,
      roundPixels: true,
      backgroundColor: '#14102a',
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: { gravity: { x: 0, y: 0 } },
      },
      scene: [BootScene, TownScene, InteriorScene],
    })

    return () => game.destroy(true)
  }, [])

  return (
    <Stage>
      <Canvas ref={container} />
      <Overlay />
    </Stage>
  )
}
