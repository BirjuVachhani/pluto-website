import getSubmenu from "./getSubmenu"
import normalizeDataCollection from "./normalizeDataCollection"

export default async function getHeader(path: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($path: String) {
        headerCollection(
          where: { 
            path: $path
          } 
        ) {
          items {
            path
            logo {
              url
              title
            }
            menuCollection {
              items {
                __typename
                ... on Link {
                  sys {
                    id
                  }
                  text
                  newTab
                  url
                }
                ... on Submenu {
                  sys {
                    id
                  }
                  title
                  style
                }
              }
            }
            buttonsCollection {
              items {
                text
                url
                newTab
                buttonType
              }
            }
          }
        }
      }
    `,
      variables: {
        path,
      },
   }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)    
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Header data')
  }
  const normalizedData = normalizeDataCollection({...data.data})

  for (let i = 0; i < normalizedData[0]?.menu.length; i++) {
    if (normalizedData[0].menu[i].contentType === "submenu") {
      normalizedData[0].menu[i] = {
        ... normalizedData[0].menu[i],
        ... await getSubmenu(normalizedData[0].menu[i].id)
      }
    }
  }
  // console.log(`HEADER DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}