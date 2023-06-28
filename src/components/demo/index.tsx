import { useTypewriter } from "react-simple-typewriter";
import { TweetPreview } from "../generation/tweet-preview";

export const Demo = () => {
  const [tweet] = useTypewriter({
    words: [
      `Back in the comfort of my home office, basking in the glorious morning light.
      Working from home has its perks, and this is definitely one of them! 
      #WorkFromHome #MorningLight`,
    ],
    typeSpeed: 10,
    loop: 1,
  });

  const [alt] = useTypewriter({
    words: [
      `A wooden desk topped with a sleek laptop computer, creating an inviting 
      workspace. The morning light gently illuminates the room, enhancing 
      the ambiance for a productive work-from-home day.`,
    ],
    typeSpeed: 10,
    loop: 1,
  });

  return (
    <TweetPreview
      url="https://uploadthing.com/f/882ebe0c-913b-4b61-9c80-d6c03012ed3a_pexels-olena-bohovyk-3794382.jpg"
      tweet={tweet}
      alt={alt}
      aspect_ratio={0.75}
    />
  );
};
