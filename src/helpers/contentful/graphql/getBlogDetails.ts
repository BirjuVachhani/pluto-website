import getAsset from "./getAsset";
import getFlexibleContent from "./getFlexibleContent";
import normalizeDataCollection from "./normalizeDataCollection";

export default async function getBlogDetails(slug: string) {
  try {
    const res = await fetch(
      `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
        },
        // send the GraphQL query
        body: JSON.stringify({
          query: `
      query($slug: String) {
        blogCollection (
          where: { 
            slug: $slug
          } 
        ) {
          items {
            sys {
              id
              firstPublishedAt
              publishedAt
            }
            title
            slug
            media {
              title
              url
              width
              height
              contentType
            }
            summary
            content {
              json
            }
            topics
            author {
              sys {
                id
              }
              fullName
              portrait {
                url
                title
                width
                height
                contentType
              }
              role
              specialization
              organization
              summary
            }
            metaTitle
            metaDescription
          }
        }
      }
    `,
          variables: {
            slug,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch BlogPost data: ${
          errorData.errors?.[0]?.message || res.statusText
        }`
      );
    }

    const data = await res.json();
    const richtextContent =
      data.data.blogCollection.items[0]?.content.json.content;
    for (let i = 0; i < richtextContent?.length; i++) {
      if (richtextContent[i].nodeType === "embedded-asset-block") {
        richtextContent[i].data = {
          ...richtextContent[i].data,
          ...(await getAsset(richtextContent[i].data.target.sys.id)),
        };
      }
      if (richtextContent[i].nodeType === "embedded-entry-block") {
        richtextContent[i].data = {
          ...richtextContent[i].data,
          ...(await getFlexibleContent(richtextContent[i].data.target.sys.id)),
        };
      }
    }
    const normalizedData = normalizeDataCollection(data.data);
    // console.log(`BLOG DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
    return normalizedData[0];
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while fetching blogPost data: ${error}`
    );
  }
}
