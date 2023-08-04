import HeroC from "@/components/sections/HeroC/HeroC"
import TabPT from "@/components/sections/TabPT/TabPT"
import CarouselPT from "@/components/sections/CarouselPT/CarouselPT"
import Content from "@/components/sections/Content/Content"
import CTA from "@/components/sections/CTA/CTA"
import { ButtonVariant } from "@/components/elements/Button/Button"
import FeatureA from "@/components/sections/FeatureA/FeatureA"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"

const defaultPageData = {
  sections: {
    heroSection: {
      title: "THINK IN ENGLISH | SPEAK IN ENGLISH",
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/head_bg.jpg",
      }
    },
    featureSection: {
      title: "Welcome to BlueBERRY",
      subtitle: "For over 50 years, we at BlueBERRY have been invested in a singular mission: the success of the next generation. We exist to give parents hope for the best possible life for their children and teachers the tools they need to be successful.",
      media: {
        type: "video",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/hero_video.mp4",
      },
    },
    presentationSection1: {
      label: "",
      title: "Our Solutions",
      subtitle: "",
      sections: [
        {
          label: "FOR AGES 4-12",
          title: "BlueBERRY",
          subtitle: "",
          content: "BlueBERRY is a research-aligned curriculum that follows the principles of Natural Language Acquisition to build English oral language and critical listening skills. It helps students gain confidence and English fluency by using the continual language acquisition processes of exposure, comprehension, use, and reinforcement.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/grapeseed.webp",
          },
          button: {
            text: "Learn more",
            url: "/solutions/blueberry",
            type: "alternate" as ButtonVariant
          }
        },
        {
          label: "FOR 36-48 MONTHS",
          title: "LittleBERRY",
          subtitle: "",
          content: "LittleBERRY is an English curriculum program that provides a first exposure for 3-year-olds. LittleSEED gives students an advantage in learning English by teaching them the most important sounds, vocabulary, and communicative expressions.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/littleseed.webp",
          },
          button: {
            text: "Learn more",
            url: "/solutions/blueberry",
            type: "alternate" as ButtonVariant 
          }
        },
        {
          label: "FOR 0-36 MONTHS",
          title: "BlueBERRY Baby",
          subtitle: "",
          content: "BlueBERRY Baby is a series of bilingual picture books for infants and toddlers. BlueBERRY Baby books provide a solid foundation for language learning in both English and the home language.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/grapeseedbaby.webp",
          },
          button: {
            text: "Learn more",
            url: "/solutions/blueberry-baby",
            type: "alternate" as ButtonVariant 
          }
        }

      ]
    },
    presentationSection2: {
      label: "BLUEBERRY CURRICULUM",
      title: "Core Components",
      subtitle: "At BlueBERRY, we know a variety of teaching tools are needed to assist children when learning a language. Every curriculum component has a purpose, and together, they make a rich language learning opportunity. \n Learn how each curriculum component contributes to the BlueBERRY experience.",
      sections: [
        {
          id: "action-activities",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_action-activity.webp",
          },
          content: {
            title: "Action Activities",
            body: "Action Activities teach specific actions with a physical response—the principle behind Total Physical Response (TPR). By requiring this response, Action Activities help students to begin thinking in English, and they can respond physically to English before their verbal abilities have developed.",
          }
        },
        {
          id: "songs",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_songs.webp",
          },
          content: {
            title: "Songs",
            body: "Songs are a fun and effective way to teach vocabulary and expressions. All Songs are designed to introduce vocabulary and language functions within the learning objectives. When combined with pictures and gestures, students` understanding of the new concepts will increase when they hear similar phrases repeated in other contexts.",
          },
        },
        {
          id:"shared-reading",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_big-book.webp",
          },
          content: {
            title: "Shared Reading: Poems & Big Books",
            body: "Shared Reading teaches phonics principles, such as phoneme and phonogram awareness, and the concepts of print. Poems introduce a new letter and teach students to recognize a sound at the beginning, middle, and end of words. Big Books teach proper pronunciation, natural expression, high frequency words, and basic vocabulary.",
          },
        },
        {
          id:"chants",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_chants.webp",
          },
          content: {
            title: "Chants",
            body: "Chants contain most of the critical expressions necessary for communicating in English and provide a natural context for learning most language functions. Chants are designed to be learned in the same style as a regular conversation, helping students from speaking in an awkward monotone.",
          },
        },
        {
          id: "stories",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_stories.webp",
          },
          content: {
            title: "Stories & Story Dictionaries",
            body: "Stories provide an opportunity for daily repetition and expand students` vocabulary and language functions with various sentence structures. Each Unit comes with a Story Dictionary, which reviews words and language functions from the previous Unit. Reading Stories facilitates discussions and allows for comprehension questions that build students` confidence and communicative ability.",
          },
        },
        {
          id: "cards",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_vocabulary-picture-card.webp",
          },
          content: {
            title: "Vocabulary Picture Cards",
            body: "Vocabulary Picture Cards are important for teaching new vocabulary words and make it easy to learn the meaning of nouns, adjectives, and opposites. They also allow for quick assessment of student progress on proper pronunciation and natural intonation.",
          },
        },
      ]
    },
    introSection: {
      title: "Technology for Success",
      content: "How does BlueBERRY utilize digital tools to ensure a fun, convenient, and impactful experience for everyone? Check out our Technology page for more details on some of the tools we offer:",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/top_tech_success.webp",
        altText: "Top tech success"
      }
    },
    contentSection: {
      title: "Learning English Naturally",
      subtitle: "LittleSEED's approach to teaching helps children learn English comprehension much more quickly than traditional approaches because our curriculum draws children into learning through songs, play, and interaction.",
      sections: [
        {
          title: "An opportunity to succeed naturally, not artificially",
          content: "By following a natural language acquisition process, each advancement in the language begins at the right time for aspiring students, creating immediate success and less stress than a grammar-based approach.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_songs.webp",
          },
        },
        {
          title: "A fun and engaging program",
          content: "Because the program features a variety of components and teaching approaches, children enjoy learning and are actively engaged—and when children are engaged, they can't help but learn.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_action-activity.webp",
          },
        },
        {
          title: "Both students and teachers succeed",
          content: "LittleSEED supports the teaching process with clear, comprehensive teacher and classroom materials, full professional training, and in-depth teacher support.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_stories.webp",
          },

        },
      ]
    },
    cta: {
      title: "Ready to Start Your Journey?",
      button: {
        text: "CONTACT US",
        url: "/contact",
        type: "alternate" as ButtonVariant,
      }
    }
  }
}

export default function Home() {
  const { heroSection, featureSection, presentationSection1, presentationSection2, introSection, contentSection, cta } = defaultPageData.sections
  return (
    <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
      <HeroC data={heroSection} />
      {/* <FeatureA data={featureSection} mediaPosition="bottom" /> */}
      <TabPT data={presentationSection1} />
      <CarouselPT data={presentationSection2} />
      <Content data={introSection} mediaAspectRatio="video"/>
      <AccordionPT data={contentSection} />
      <CTA data={cta} />
    </main>
  )
}
