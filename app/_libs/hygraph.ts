import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!);

export async function getTotalPosts() {
  const query = gql`
    {
      postsConnection {
        edges {
          node {
            content
            createdAt
            date
            description
            hot
            id
            publishedAt
            slug
            tags
            title
            updatedAt
          }
        }
      }
    }
  `;

  const results: any = await graphcms.request(query);
  return results.postsConnection.edges;
}

export async function getSinglePost(id: string) {
  const query = gql`
    query getPost($id: ID) {
      post(where: { id: $id }) {
        id
        content
        createdAt
        date
        hot
        slug
        tags
        title
        updatedAt
        publishedAt
        description
      }
    }
  `;

  const results: any = await graphcms.request(query, { id });
  return results.post;
}

export async function getHotPosts() {
  const query = gql`
    query getHotPosts {
      postsConnection(where: { hot: true }) {
        edges {
          node {
            content
            createdAt
            date
            description
            hot
            id
            publishedAt
            slug
            tags
            title
            updatedAt
          }
        }
      }
    }
  `;

  const results: any = await graphcms.request(query);
  return results.postsConnection.edges;
}

export async function getRecentPosts() {
  const query = gql`
    query getRecentPosts {
      postsConnection(orderBy: date_DESC, last: 5) {
        edges {
          node {
            content
            createdAt
            date
            description
            hot
            id
            publishedAt
            slug
            tags
            title
            updatedAt
          }
        }
      }
    }
  `;

  const results: any = await graphcms.request(query);
  return results.postsConnection.edges;
}

export async function getTotalTags() {
  const query = gql`
    query getTotalTags {
      posts {
        tags
      }
    }
  `;

  const results: any = await graphcms.request(query);
  return results.posts;
}

export async function getPostsByTag(tag: any[]) {
  const query = gql`
    query getPostByTag($tags_contains_some: [Tags!] = Javascript) {
      posts(where: { tags_contains_some: $tags_contains_some }) {
        tags
        content
        createdAt
        date
        description
        publishedAt
        id
        hot
        title
        updatedAt
      }
    }
  `;

  const results: any = await graphcms.request(query, { tags_contains_some: tag });
  return results.posts;
}
