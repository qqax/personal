import Image from 'next/image';
import keyboard from '@/public/keyboard.jpg';

export default function Background() {
    return (
        <Image
            alt="keyboard"
            src={keyboard}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
                objectFit: 'cover',
            }}
        />
    );
}