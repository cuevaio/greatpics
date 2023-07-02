import dog from "~/pics/dog.jpg";
import cat from "~/pics/cat.jpg";
import elon from "~/pics/elon.jpg";
import house from "~/pics/house.jpg";

export const DEMO_EXAMPLES = [
  {
    pic: dog,
    aspect_ratio: 16 / 9,
    input: `draft: """guess why is he so serious now"""
  caption: """a dog laying on the floor next to a chair"""`,
    output: `Entity: Dog
  Tweet: "Guess why is he so serious now? 🤔 #PensivePup #DeepThoughts"
  Description: A cute dog is seen laying on the floor next to a chair, with a serious expression on its face.
  Alt: A small, adorable dog with a serious expression lies on the floor next to a chair. The dog seems to be lost in deep thoughts.`,
  },
  {
    pic: elon,
    aspect_ratio: 5 / 4,
    input: `draft: """cant believe i met elon musk at next.js conf. never thought he was into we dev too."""
    caption: """a man in a tuxedo poses for a picture"""`,
    output: `Entity: Elon Musk
    Tweet: Can't believe I met @elonmusk at the #NextJSConf! Never thought he was into web development too. 🤩 #TechGenius #InspiringEncounter
    
    Description: A picture of Elon Musk, wearing a tuxedo, posing for a picture at the Next.js conference.
    
    Alt: A renowned entrepreneur and tech genius, Elon Musk, stands confidently in a tuxedo, posing for a picture at the Next.js conference, showcasing his interest in web development.`,
  },
  {
    pic: cat,
    aspect_ratio: 16 / 9,
    input: `draft: """Daneel really love that <3""
    caption: """a close up of a person holding a cat"""`,
    output: `Entity: Cat
    Tweet: Daneel really loves that ❤️
    Description: A close-up of someone holding a cat.
    Alt: A person holds a cat close to their chest, showing love and affection.`,
  },
  {
    pic: house,
    aspect_ratio: 5 / 4,
    input: `draft: """it's good to be i an home again""
    caption: """a large house with a lot of grass in front of it"""`,
    output: `Entity: House
    Tweet: "It's good to be home again! Enjoying the view of this large house with a lot of grass in front of it. #HomeSweetHome"
    Description: A beautiful house stands tall, surrounded by lush green grass, creating a serene and welcoming atmosphere.
    Alt: A large house with a well-maintained lawn in front, creating a peaceful and inviting ambiance.`,
  },
];

export function extractAI(response: string) {
  let tweet = "";
  let alt = "";

  let temp = (response + "Description:").split("Tweet:")[1] ?? "";
  temp = temp.split("Description:")[0] ?? "";
  tweet = temp.trim();

  // remove "" from start and end if present
  if (tweet[0] === '"') {
    tweet = tweet.slice(1);
  }
  if (tweet[tweet.length - 1] === '"') {
    tweet = tweet.slice(0, tweet.length - 1);
  }

  temp = response.split("Alt:")[1] ?? "";
  alt = temp.trim();

  // remove "" from start and end if present
  if (alt[0] === '"') {
    alt = alt.slice(1);
  }
  if (alt[alt.length - 1] === '"') {
    alt = alt.slice(0, alt.length - 1);
  }

  return [tweet, alt];
}
