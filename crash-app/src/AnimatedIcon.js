import Lottie from 'react-lottie';
import anim_data from './animation-data/car.json'
import { flatten } from 'lottie-colorify'

function AnimatedIcon() {
    const anim_color = [31, 29, 29]

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: flatten(anim_color, anim_data),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet'
        }
    };

    return (
        <Lottie
            options={defaultOptions}
            height={150}
        // if it's not being hovered, it is stopped
        />
    )
}

export default AnimatedIcon