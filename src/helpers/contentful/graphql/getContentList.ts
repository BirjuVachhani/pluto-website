import getFlexibleContent from "./getFlexibleContent"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getContentList(id: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($id: String) {
        contentListCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            heading {
              json
            }
            eyebrow
            summary {
              json
            }
            buttonsCollection {
              items {
                sys {
                  id
                }
                url
                text
                openNewTab
                buttonVariant
                withArrow
                icon {
                  url
                  title
                  width
                  height
                }
              }
            }
            htmlid
            appearanceVariant
            size
            headingTextAlignment
            contentTextAlignment
            contentOrientation
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            darkMode
            contentCollection (limit: 20) {
              items {
                __typename
                ... on Blog {
                  sys {
                    id
                    firstPublishedAt
                    publishedAt
                  }
                  title
                  slug
                  summary
                  topics
                  media {
                    url
                    title
                    width
                    height
                    contentType
                  }
                }
                ... on Expert {
                  sys {
                    id
                  }
                  fullName
                  role
                  organization
                  specialization
                  summary
                  sns {
                    linkedInUrl
                    facebookUrl
                    twitterUrl
                    youtubeUrl
                    instagramUrl
                  }
                  portrait {
                    url
                    title
                    width
                    height
                    contentType
                  }
                }
                ... on Page {
                  sys {
                    id
                  }
                  title
                  url
                  metaTitle
                  metaDescription
                  metaKeywords
                  metaImage {
                    url
                    title
                    width
                    height
                    contentType
                  }
                }
                ... on Link {
                  sys {
                    id
                  }
                  text
                  image {
                    url
                    title
                    width
                    height
                    contentType
                  }
                  url
                  openNewTab
                }
                ... on Statistics {
                  sys {
                    id
                  }
                  number
                  text
                }
                ... on FlexibleContent {
                  sys {
                    id
                  }
                }
                ... on PricingPlan {
                  sys {
                    id
                  }
                  title
                  pricing
                  pricingSuffix
                  badge
                  description {
                    json
                  }
                  ctaButton {
                    url
                    text
                    openNewTab
                    buttonVariant
                    withArrow
                    icon {
                      url
                      title
                      width
                      height
                    }
                  }
                }
                ... on Testimonial {
                  sys {
                    id
                  }
                  content {
                    json
                  }
                  portrait {
                    url
                    title
                    width
                    height
                    contentType
                  }
                  name
                  role
                  rating
                }
              }
            }
          }
        }
      }
    `, 
      variables: {
        id
      },
    }),
  })
  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Content List data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  async function getSectionData(contentType: string, id: string) {
    if (contentType === "flexiblecontent") {
      return await getFlexibleContent(id)
    }
  }
  for(let i = 0; i < normalizedData[0]?.content.length; i++) {
    normalizedData[0].content[i] = {
      ... normalizedData[0].content[i],
      ... await getSectionData(normalizedData[0].content[i]?.contentType, normalizedData[0].content[i]?.id)
    }
  }
  // console.log(`CONTENT LIST DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}