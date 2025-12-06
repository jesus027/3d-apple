import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import MacbookModel from './models/Macbook'
import StudioLight from './StudioLight'
import { features, featureSequence } from '../constants'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import { Html } from '@react-three/drei'
import useMacbookStore from '../store'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ModelScroll = () => {
    const groupRef = useRef(null)

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

    const { setTexture } = useMacbookStore()

    useEffect(() => {
        featureSequence.forEach((feature) => {
            const video = document.createElement('video')
            Object.assign(video, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous',
            })
        });
    }, []);

    useGSAP(() => {
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom+=25% top',
                scrub: true,
                pin: true,
            },
        })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom+=25% top',
                scrub: true,
            },
        })
        
        if(groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' }) 
        }

        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, duration: 1 })

            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0, duration: 1 })

            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0, duration: 1 })

            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0, duration: 1 })

            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0, duration: 1 })

    }, [])

    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}

const Features = () => {
  return (
    <section id='features'>
        <h2>See it all in a new light.</h2>

        <Canvas id='f-canvas' camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
            <StudioLight />
            <ambientLight intensity={0.5} />

            <ModelScroll />
        </Canvas>

        <div className='absolute inset-0'>
            {features.map((feature, index) => (
                <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles)}>
                    <img src={feature.icon} alt={feature.highlight} />
                    <p>
                        <span className='text-white'>{feature.highlight}</span>
                        {feature.text}
                    </p>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Features;