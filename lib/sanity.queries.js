export const WORK_QUERY = `
*[_type == "work"] | order(mark asc){
  _id,
  title,
  titleMark,
  mark,
  year,
  category,
  status,
  services,
  client,
  credits,
  website,
  featured,
  heroMedia{
  image{
    asset->{
      url,
      metadata { lqip }
      }
    },
  }, 

  sections[]{
  ...,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    }
  }
}
`;
