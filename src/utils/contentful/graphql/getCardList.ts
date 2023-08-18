import normalizeDataCollection from "./normalizeDataCollection"

export default async function getCardList(id: string) {
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
        cardListCollection(
          where: {
            sys: {
              id: $id
            }
          } 
        ) {
          items {
            title
            label
            subtitle
            link {
              url
              text
              newTab
            }
            contentCollection (limit: 20) {
              items {
                ... on Article {
                  sys {
                    id
                  }
                  title
                  summary
                  slug
                  tags
                  media {
                    url
                    title
                  }
                }
                ... on Feature {
                  title
                  content {
                    json
                  }
                  media {
                    url
                    title
                  }
                  buttonsCollection {
                    items {
                      sys {
                        id
                      }
                      url
                      text
                    }
                  }            
                }
                ... on Product {
                  title
                  price
                  categories
                  mediaCollection (limit: 1) {
                    items {
                      url
                      title
                    }
                  }
                }
                ... on Service {
                  title
                  subtitle
                  description {
                    json
                  }
                  thumbnailImage {
                    url
                    title
                  }
                }
                ... on Expert {
                  fullName
                  role
                  organization
                  specializationCollection (limit: 3) {
                    items {
                      title
                    }
                  }
                  portrait {
                    url
                    title
                  }
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
    throw new Error("Failed to fetch Card List data. Error: ", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})
  // console.log(`CARD LIST DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]

}