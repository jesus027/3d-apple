import React from 'react'
import { Lightformer } from '@react-three/drei'
import { Environment } from '@react-three/drei'

const StudioLight = () => {
  return (
    <group name="lights">
        <Environment resolution={256}>
            <group>
                <Lightformer
                    form='rect'
                    intensity={10}
                    rotation-y={Math.PI / 2}
                    position={[-10, 5, -5]}
                    scale={10}
                />
                <Lightformer
                    form='rect'
                    intensity={10}
                    rotation-y={Math.PI / 2}
                    position={[1, 0, 1]}
                    scale={10}
                />
            </group>
        </Environment>
        <spotLight
            intensity={Math.PI * 0.1}
            angle={0.15}
            position={[-2, 10, 5]}
            decay={0}
        />
        <spotLight
            intensity={Math.PI * 0.1}
            angle={0.15}
            position={[0, -25, 10]}
            decay={0}
        />
        <spotLight
            intensity={Math.PI * 1}
            angle={0.15}
            position={[0, 15, 5]}
            decay={0.1}
        />
    </group>
  )
}

export default StudioLight