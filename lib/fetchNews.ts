import { gql } from 'graphql-request'

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    // GraphQL query
    const query = gql`
        query MyQuery(
            $access_key: String!
            $categories: String!
            $keywords: String
        ) {
            myQuery(
                access_key: $access_key
                categories: $categories
                countries: "fr, gb, us"
                sort: "published_desc"
                keywords: $keywords
            ) {
                data {
                    country
                    author
                    category
                    description
                    image
                    published_at
                    source
                    language
                    title
                    url
                }
                pagination {
                    count
                    limit
                    total
                    offset
                }
            }
        }
    `
    // Fetch function with Next.js 13 caching...
    const res = await fetch(
        'https://saarbrucken.stepzen.net/api/limping-dingo/__graphql',
        {
            method: 'POST',
            cache: isDynamic ? 'no-cache' : 'default',
            next: isDynamic ? { revalidate: 0 } : { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
            },
            body: JSON.stringify({
                query,
                variables: {
                    access_key: process.env.MEDIASTACK_API_KEY,
                    categories: category,
                    keywords: keywords,
                },
            }),
        }
    )

    console.log('Loading new data from API for category >>', category, keywords)

    const newsResponse = await res.json()

    // Sort by images vs not images present
    const news = sortNewsByImage(newsResponse.data.myQuery)

    //return news
    return news
}

export default fetchNews

//example:
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=BLABLABLA&countries=fr%2Cgb&limit=100&offset=0&sort=published_desc"
import sortNewsByImage from './sortNewsByImg'
