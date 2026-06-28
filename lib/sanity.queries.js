export const WORK_QUERY = `
*[_type == "work"] | order(mark asc){
  _id,
  title,
  titleMark,
  mark,
  year,
  location,
  size,
  conclusion,
  duration,
  category,
  scope,
  services,
  client,
  credits,
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
