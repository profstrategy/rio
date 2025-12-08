// Install: npm install yet-another-react-lightbox

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';

export const LightBoxImage = () => {

const [lightboxOpen, setLightboxOpen] = useState(false);

return (
<>
<div 
  className="w-full relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[2/5] lg:block md:flex md:justify-center max-h-[300px] cursor-pointer"
  onClick={() => setLightboxOpen(true)}
>
  <Image
    alt='tokenomics'
    height={300}
    width={450}
    sizes='(max-width: 640px) 95vw, (max-width: 768px) 85vw, 60vw'
    src={'/tokenomics.webp'}
    priority
    quality={100}
    className='object-contain hover:opacity-90 transition-opacity'
  />
</div>

{/* Add the lightbox */}
<Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  slides={[{ src: '/tokenomics.webp' }]}
  plugins={[Zoom]}
/>
</>
)
}
